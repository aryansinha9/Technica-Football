// Supabase Edge Function: stripe-webhook
// Receives Stripe's checkout.session.completed event and fulfils the booking
// (mark paid, decrement spots, send emails) even if the parent never reaches
// the confirmation page after paying.
//
// Deploy with: supabase functions deploy stripe-webhook --no-verify-jwt
// (Stripe can't send a Supabase JWT; the Stripe signature is the auth.)
// Set secret:  supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
// Stripe endpoint URL: https://<project-ref>.supabase.co/functions/v1/stripe-webhook

import Stripe from 'npm:stripe@14.14.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fulfilBooking } from '../_shared/fulfil-booking.ts';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  });

  // Verify the event really came from Stripe. Needs the raw body, and the
  // async variant because Deno's crypto is async-only.
  const signature = req.headers.get('stripe-signature');
  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Invalid signature', { status: 400 });
  }

  // async_payment_succeeded covers delayed payment methods; card payments
  // arrive already paid on checkout.session.completed.
  if (
    event.type !== 'checkout.session.completed' &&
    event.type !== 'checkout.session.async_payment_succeeded'
  ) {
    return new Response(JSON.stringify({ received: true, ignored: event.type }), { status: 200 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const bookingId = session.metadata?.bookingId;

  if (session.payment_status !== 'paid' || !bookingId) {
    console.log(`Skipping session ${session.id}: status=${session.payment_status} bookingId=${bookingId}`);
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const fulfilled = await fulfilBooking(supabase, bookingId, session.id);
    console.log(`Booking ${bookingId} ${fulfilled ? 'fulfilled by webhook' : 'already paid'}`);
    return new Response(JSON.stringify({ received: true, fulfilled }), { status: 200 });
  } catch (err) {
    // Non-2xx makes Stripe retry with backoff.
    console.error(`Failed to fulfil booking ${bookingId}:`, err);
    return new Response('Fulfilment failed', { status: 500 });
  }
});
