// Supabase Edge Function: create-checkout
// Deploy with: supabase functions deploy create-checkout
// Set secrets: supabase secrets set STRIPE_SECRET_KEY=sk_live_...
//
// This function creates a Stripe Checkout Session with dynamic line items.

// Use the npm: specifier (Supabase's documented pattern) rather than the
// esm.sh ?target=deno build — the latter pulls a deprecated deno.land/std
// polyfill transitively (via object-inspect) that the bundler can no longer
// fetch, which breaks deployment.
import Stripe from 'npm:stripe@14.14.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ALLOWED_ORIGINS = [
  'https://technicafootball.com.au',
  'https://www.technicafootball.com.au',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });

    // ── Server-side input validation ──────────────────────────────────────────
    const body = await req.json();
    const { bookingId, classTitle, addon45min, addon60min, customerEmail } = body;

    // Validate required fields are present and correctly typed
    if (!bookingId || typeof bookingId !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid bookingId' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      });
    }
    if (!customerEmail || typeof customerEmail !== 'string' || !customerEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid customerEmail' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      });
    }

    // ── Authoritative pricing from DB (never trust client-supplied price) ─────
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Verify the booking exists and fetch its linked class for authoritative pricing
    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .select('class_id, class_price')
      .eq('id', bookingId)
      .single();

    if (bookingErr || !booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404,
      });
    }

    // Use the class_price stored in the booking record (set at booking creation time)
    // This was set from classData.price on the client, but now we validate it matches
    const { data: classRow, error: classErr } = await supabase
      .from('classes')
      .select('price')
      .eq('id', booking.class_id)
      .single();

    // Use authoritative DB price (in cents). Fall back to booking record if class not found.
    const authorizedPrice: number = classRow?.price
      ? classRow.price * 100
      : booking.class_price;

    // Build line items using the authoritative server-side price
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'aud',
          product_data: { name: classTitle || 'Term Program' },
          unit_amount: authorizedPrice,
        },
        quantity: 1,
      },
    ];

    if (addon45min === true) {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: { name: '45-Minute Private Session (Discounted)' },
          unit_amount: 5000, // $50 — hardcoded server-side, not client-supplied
        },
        quantity: 1,
      });
    }

    if (addon60min === true) {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: { name: '1-Hour Private Session (Discounted)' },
          unit_amount: 6000, // $60 — hardcoded server-side, not client-supplied
        },
        quantity: 1,
      });
    }

    // Determine the site URL for redirects — only allow known origins
    const redirectOrigin = ALLOWED_ORIGINS.includes(req.headers.get('origin') || '')
      ? req.headers.get('origin')!
      : 'https://technicafootball.com.au';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      customer_email: customerEmail,
      metadata: { bookingId },
      success_url: `${redirectOrigin}/programs/term-program/confirmation?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${redirectOrigin}/programs/term-program`,
    });

    await supabase.from('bookings').update({ stripe_session_id: session.id }).eq('id', bookingId);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    // Return generic error message — do not leak internal error details
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
