// Supabase Edge Function: create-checkout
// Deploy with: supabase functions deploy create-checkout
// Set secrets: supabase secrets set STRIPE_SECRET_KEY=sk_live_...
//
// This function creates a Stripe Checkout Session with dynamic line items.

import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });

    const { bookingId, classTitle, classPrice, addon45min, addon60min, customerEmail } = await req.json();

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'aud',
          product_data: { name: classTitle },
          unit_amount: classPrice,
        },
        quantity: 1,
      },
    ];

    if (addon45min) {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: { name: '45-Minute Private Session (Discounted)' },
          unit_amount: 5000, // $50
        },
        quantity: 1,
      });
    }

    if (addon60min) {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: { name: '1-Hour Private Session (Discounted)' },
          unit_amount: 6000, // $60
        },
        quantity: 1,
      });
    }

    // Determine the site URL for redirects
    const origin = req.headers.get('origin') || 'https://technicafootball.com.au';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      allow_promotion_codes: true,
      customer_email: customerEmail,
      metadata: { bookingId },
      success_url: `${origin}/programs/term-program/confirmation?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${origin}/programs/term-program`,
    });

    // Update the booking with the Stripe session ID
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    await supabase.from('bookings').update({ stripe_session_id: session.id }).eq('id', bookingId);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
