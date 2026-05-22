// Supabase Edge Function: verify-payment
// Verifies a Stripe Checkout session, updates booking status to 'paid', and decrements spots.

import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });
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

    // 2. Update the booking status
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .update({ payment_status: 'paid', stripe_session_id: sessionId })
      .eq('id', bookingId)
      .select('*, classes(*)')
      .single();

    if (bookingError) {
      console.error('Error updating booking:', bookingError);
    }

    // 3. Decrement spots if booking was just marked paid and send email
    if (booking) {
      await supabase.rpc('decrement_spots', { p_class_id: booking.class_id });

      // 4. Send Confirmation Email via Resend
      try {
        const resendApiKey = Deno.env.get('RESEND_API_KEY');
        if (resendApiKey) {
          // Extract class + session details for email
          const classData = booking.classes;
          const sessions = Array.isArray(classData?.sessions) ? classData.sessions : [];
          const firstSession = sessions[0] ?? null;
          const coachName = firstSession?.coach || 'Your Coach';
          const sessionDay = firstSession?.date?.split(' ')[0] || '';
          const sessionTime = firstSession?.time || '';
          const mapsQuery = encodeURIComponent(classData?.full_address || classData?.location || 'Technica Football, The Ponds NSW');
          const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

          const emailHtml = `
            <div style="font-family: Arial, sans-serif; color: #0A1F44; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0A1F44; padding: 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">TECHNICA FOOTBALL</h1>
              </div>
              <div style="padding: 32px;">
                <h2 style="margin-top: 0; font-size: 20px;">Welcome to the Program!</h2>
                <p>Hi ${booking.parent_first_name},</p>
                <p>Your payment has been successfully received, and <strong>${booking.player_name}</strong> is officially registered for the upcoming term.</p>

                <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 24px 0;">
                  <h3 style="margin-top: 0; font-size: 16px; color: #f0722b;">PROGRAM DETAILS</h3>
                  <p style="margin: 8px 0;"><strong>Class:</strong> ${classData?.title || booking.class_label}</p>
                  <p style="margin: 8px 0;"><strong>Coach:</strong> ${coachName}</p>
                  <p style="margin: 8px 0;"><strong>Day:</strong> ${sessionDay}</p>
                  <p style="margin: 8px 0;"><strong>Session Time:</strong> ${sessionTime}</p>
                  <p style="margin: 8px 0;"><strong>Start Date:</strong> ${classData?.started_date || 'Check Website'}</p>
                  <p style="margin: 8px 0;"><strong>Location:</strong> ${classData?.full_address || classData?.location || 'The Ponds'}</p>
                  <p style="margin: 16px 0 4px 0;">
                    <a href="${mapsLink}" style="display: inline-block; background-color: #0A1F44; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">&#128205; View Location on Google Maps</a>
                  </p>
                </div>

                <h3 style="font-size: 16px;">What to Bring:</h3>
                <ul style="padding-left: 20px;">
                  <li>Football boots &amp; shin guards (Mandatory)</li>
                  <li>Water bottle</li>
                  <li>Comfortable training attire</li>
                </ul>

                <p style="margin-top: 24px;">If you have any questions before the first session, feel free to reply to this email.</p>
                <p>See you on the pitch!</p>
                <p><strong>- The Technica Football Team</strong></p>
              </div>
            </div>
          `;

          const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Technica Football <onboarding@resend.dev>',
              to: booking.parent_email,
              subject: `Registration Confirmed: ${classData?.title || booking.class_label}`,
              html: emailHtml
            })
          });

          if (!emailRes.ok) {
            console.error('Failed to send email:', await emailRes.text());
          }
        }
      } catch (err) {
        console.error('Error in Resend block:', err);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
