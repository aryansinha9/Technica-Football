// Supabase Edge Function: verify-payment
// Verifies a Stripe Checkout session, updates booking status to 'paid', and decrements spots.

import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno';
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

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract the weekday from a session date string like "Sunday 26 Apr" → "Sunday"
 * Falls back to parsing the class subtitle like "Term 2 - Sunday 10:00am" → "Sunday"
 */
function extractDay(sessions: Record<string, string>[], subtitle: string): string {
  // Primary: use the first session's date field
  if (sessions.length > 0 && sessions[0].date) {
    return sessions[0].date.split(' ')[0]; // "Sunday 26 Apr" → "Sunday"
  }
  // Fallback: parse subtitle "Term 2 - Sunday 10:00am"
  const match = subtitle?.match(/[-–]\s*([A-Za-z]+)\s+\d/);
  if (match) return match[1];
  return '';
}

/**
 * Extract the time from session data.
 * Falls back to parsing the class subtitle like "Term 2 - Sunday 10:00am" → "10:00am"
 */
function extractTime(sessions: Record<string, string>[], subtitle: string): string {
  // Primary: use the first session's time field
  if (sessions.length > 0 && sessions[0].time) {
    return sessions[0].time; // e.g. "10:00 am"
  }
  // Fallback: parse subtitle "Term 2 - Sunday 10:00am"
  const match = subtitle?.match(/(\d{1,2}:\d{2}\s*(?:am|pm))/i);
  if (match) return match[1];
  return '';
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

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

    // 2. Idempotency guard — the confirmation page can be reloaded/revisited,
    // which re-invokes this function. Only the first successful call may
    // decrement spots and send emails.
    const { data: existing } = await supabase
      .from('bookings')
      .select('payment_status')
      .eq('id', bookingId)
      .single();

    if (existing?.payment_status === 'paid') {
      return new Response(
        JSON.stringify({ success: true, alreadyProcessed: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 3. Update the booking status
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .update({ payment_status: 'paid', stripe_session_id: sessionId })
      .eq('id', bookingId)
      .select('*, classes(*)')
      .single();

    if (bookingError) {
      console.error('Error updating booking:', bookingError);
    }

    // 3. Decrement spots and send confirmation email
    if (booking) {
      await supabase.rpc('decrement_spots', { p_class_id: booking.class_id });

      // 4. Send Confirmation Email via Resend
      try {
        const resendApiKey = Deno.env.get('RESEND_API_KEY');
        if (resendApiKey) {
          // ── Extract class & session details ──────────────────────────────
          const classData = booking.classes ?? {};
          const sessions: Record<string, string>[] = Array.isArray(classData.sessions)
            ? classData.sessions
            : [];
          const firstSession = sessions[0] ?? {};

          const coachName    = firstSession.coach        || 'Your Coach';
          const sessionDay   = extractDay(sessions, classData.subtitle  || '');
          const sessionTime  = extractTime(sessions, classData.subtitle || '');
          const sessionDuration = firstSession.durationLabel
            || classData.session_duration
            || '';
          const className    = classData.title       || booking.class_label || 'Term Program';
          const startDate    = classData.started_date || 'Check Website';
          const dateRange    = classData.date_range   || '';
          const fullAddress  = classData.full_address || classData.location || 'The Ponds';

          // Google Maps deep-link
          const mapsQuery = encodeURIComponent(fullAddress);
          const mapsLink  = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

          // ── Build attachments array (add public PDF URLs here when ready) ─
          // Format: { filename: "Info Sheet.pdf", path: "https://..." }
          // Documents should be uploaded to Supabase Storage → site-assets/documents/
          const attachments: { filename: string; path: string }[] = [];

          // Example (uncomment and populate when client provides documents):
          // const docBase = 'https://dbidrdfaaznhomyeobnj.supabase.co/storage/v1/object/public/site-assets/documents';
          // attachments.push({ filename: 'Session Information Sheet.pdf', path: `${docBase}/session-info.pdf` });

          // ── Email HTML ──────────────────────────────────────────────────
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; color: #0A1F44; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">

              <!-- Header -->
              <div style="background-color: #0A1F44; padding: 28px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 3px; font-weight: 900;">TECHNICA FOOTBALL</h1>
                <p style="color: #f0722b; margin: 6px 0 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Registration Confirmed</p>
              </div>

              <!-- Body -->
              <div style="padding: 32px;">
                <h2 style="margin-top: 0; font-size: 22px; color: #0A1F44;">Welcome to the Program! ⚽</h2>
                <p style="color: #374151;">Hi <strong>${booking.parent_first_name}</strong>,</p>
                <p style="color: #374151;">
                  Your payment has been successfully received, and
                  <strong>${booking.player_name}</strong> is officially registered for the upcoming term.
                  We're excited to have them join us!
                </p>

                <!-- Program Details Box -->
                <div style="background-color: #f9fafb; border-left: 4px solid #f0722b; padding: 20px 24px; border-radius: 6px; margin: 24px 0;">
                  <h3 style="margin: 0 0 16px; font-size: 13px; color: #f0722b; letter-spacing: 2px; text-transform: uppercase;">Program Details</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px; width: 140px; vertical-align: top;">Class</td>
                      <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${className}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Coach</td>
                      <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${coachName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Day</td>
                      <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${sessionDay}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Session Time</td>
                      <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${sessionTime}${sessionDuration ? ' (' + sessionDuration + ')' : ''}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Program Dates</td>
                      <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${dateRange || startDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Location</td>
                      <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${fullAddress}</td>
                    </tr>
                  </table>

                  <!-- Maps Button -->
                  <div style="margin-top: 20px;">
                    <a href="${mapsLink}"
                       style="display: inline-block; background-color: #f0722b; color: #ffffff; padding: 12px 24px;
                              border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">
                      &#128205; View Location on Google Maps
                    </a>
                  </div>
                </div>

                <!-- What to Bring -->
                <h3 style="font-size: 15px; color: #0A1F44; margin-bottom: 8px;">What to Bring</h3>
                <ul style="padding-left: 20px; color: #374151; line-height: 1.8;">
                  <li>Football boots &amp; shin guards <strong>(mandatory)</strong></li>
                  <li>Water bottle</li>
                  <li>Comfortable training attire</li>
                </ul>

                <p style="margin-top: 24px; color: #374151;">
                  If you have any questions before the first session, please don't hesitate to reply to this email or
                  contact us at <a href="mailto:info@technicafootball.com.au" style="color: #f0722b;">info@technicafootball.com.au</a>.
                </p>
                <p style="color: #374151;">See you on the pitch!</p>
                <p style="color: #0A1F44;"><strong>— The Technica Football Team</strong></p>
              </div>

              <!-- Footer -->
              <div style="background-color: #f3f4f6; padding: 16px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">Technica Football | The Ponds, NSW 2769 | ABN: 93 433 558 169</p>
              </div>
            </div>
          `;

          // ── Send via Resend ─────────────────────────────────────────────
          const emailPayload: Record<string, unknown> = {
            from: 'Technica Football <info@technicafootball.com.au>',
            to: booking.parent_email,
            subject: `Registration Confirmed — ${className}`,
            html: emailHtml,
          };

          // Only include attachments array if there are documents to send
          if (attachments.length > 0) {
            emailPayload.attachments = attachments;
          }

          const emailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailPayload),
          });

          if (!emailRes.ok) {
            console.error('Failed to send email:', await emailRes.text());
          } else {
            console.log('Confirmation email sent to:', booking.parent_email);
          }

          // ── Admin notification email ────────────────────────────────────
          try {
            const adminEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') || 'info@technicafootball.com.au';

            // Pull the linked registration for player details (may be null
            // for legacy bookings).
            let registration: Record<string, unknown> | null = null;
            if (booking.registration_id) {
              const { data: regData } = await supabase
                .from('registrations')
                .select('*')
                .eq('id', booking.registration_id)
                .single();
              registration = regData;
            }

            const row = (label: string, value: unknown) => `
              <tr>
                <td style="padding: 6px 0; color: #6b7280; font-size: 14px; width: 180px; vertical-align: top;">${label}</td>
                <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${value ?? '—'}</td>
              </tr>`;

            const adminHtml = `
              <div style="font-family: Arial, sans-serif; color: #0A1F44; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #0A1F44; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 3px; font-weight: 900;">TECHNICA FOOTBALL</h1>
                  <p style="color: #f0722b; margin: 6px 0 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">New Paid Registration</p>
                </div>
                <div style="padding: 28px;">
                  <p style="color: #374151; margin-top: 0;">A new registration has been paid and confirmed.</p>
                  <table style="width: 100%; border-collapse: collapse;">
                    ${row('Player', booking.player_name)}
                    ${row('Class', classData.subtitle || booking.class_label)}
                    ${row('Parent', `${booking.parent_first_name} ${booking.parent_last_name}`)}
                    ${row('Email', booking.parent_email)}
                    ${row('Phone', booking.parent_phone)}
                    ${row('Add-ons', [booking.addon_45min ? '45-min private session' : null, booking.addon_60min ? '1-hr private session' : null].filter(Boolean).join(', ') || 'None')}
                    ${row('Total Paid', `$${(booking.total_paid / 100).toFixed(0)} AUD`)}
                    ${registration ? row('Player DOB', registration.player_birthday) : ''}
                    ${registration ? row('Medical', registration.medical_conditions || 'None') : ''}
                    ${registration ? row('Experience', registration.player_experience) : ''}
                    ${registration ? row('Emergency Contact', `${registration.emergency_first_name} ${registration.emergency_last_name} (${registration.emergency_relationship})`) : ''}
                  </table>
                  <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">Full details are available in the admin dashboard.</p>
                </div>
              </div>
            `;

            const adminRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Technica Football <info@technicafootball.com.au>',
                to: adminEmail,
                subject: `New Registration — ${booking.player_name} (${classData.subtitle || booking.class_label})`,
                html: adminHtml,
              }),
            });

            if (!adminRes.ok) {
              console.error('Failed to send admin notification:', await adminRes.text());
            } else {
              console.log('Admin notification sent to:', adminEmail);
            }
          } catch (adminErr) {
            console.error('Error sending admin notification:', adminErr);
          }
        } else {
          console.error('RESEND_API_KEY is not set — no confirmation or admin emails were sent.');
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
