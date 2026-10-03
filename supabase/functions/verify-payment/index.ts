// Supabase Edge Function: verify-payment
// Verifies a Stripe Checkout session, updates booking status to 'paid', and decrements spots.
// Called by the confirmation page, and by the admin dashboard's "Check with
// Stripe" button for bookings stuck on pending.

// Use the npm: specifier (Supabase's documented pattern) rather than the
// esm.sh ?target=deno build — the latter pulls a deprecated deno.land/std
// polyfill transitively (via object-inspect) that the bundler can no longer
// fetch, which breaks deployment.
import Stripe from 'npm:stripe@14.14.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fulfilBooking } from '../_shared/fulfil-booking.ts';

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


// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
      // Required under the npm: specifier so Stripe uses Deno's fetch for
      // outbound HTTP instead of the Node http client.
      httpClient: Stripe.createFetchHttpClient(),
    });
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { sessionId, bookingId } = await req.json();

    // 1. Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new Response(
        JSON.stringify({ success: false, error: 'Payment not completed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // The session must belong to this booking, otherwise a paid session id
    // could be replayed against someone else's unpaid booking.
    if (session.metadata?.bookingId && session.metadata.bookingId !== bookingId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Session does not match booking' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // 2. Mark paid + spots + emails. Idempotent — the confirmation page can be
    // reloaded and the Stripe webhook may have already done this.
    const fulfilled = await fulfilBooking(supabase, bookingId, sessionId);

    return new Response(
      JSON.stringify({ success: true, alreadyProcessed: !fulfilled }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
