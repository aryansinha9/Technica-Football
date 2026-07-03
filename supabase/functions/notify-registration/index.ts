// Supabase Edge Function: notify-registration
// Sends the club an email whenever a new player registration form is
// submitted — before payment, so no registration goes unnoticed even if the
// parent never completes the booking/checkout.
//
// Deploy with: supabase functions deploy notify-registration
// Uses the same RESEND_API_KEY secret as verify-payment. The recipient can be
// overridden with the ADMIN_NOTIFICATION_EMAIL secret.

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

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { registrationId, classTitle } = await req.json();

    if (!registrationId || typeof registrationId !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid registrationId' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // The registration must actually exist — this also stops the endpoint
    // being used to send arbitrary spam to the admin inbox.
    const { data: registration, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (error || !registration) {
      return new Response(JSON.stringify({ error: 'Registration not found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404,
      });
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set — registration notification not sent.');
      return new Response(JSON.stringify({ success: false, error: 'Email not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
      });
    }

    const adminEmail = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') || 'info@technicafootball.com.au';

    const row = (label: string, value: unknown) => `
      <tr>
        <td style="padding: 6px 0; color: #6b7280; font-size: 14px; width: 180px; vertical-align: top;">${label}</td>
        <td style="padding: 6px 0; color: #0A1F44; font-weight: bold; font-size: 14px;">${value ?? '—'}</td>
      </tr>`;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #0A1F44; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0A1F44; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 3px; font-weight: 900;">TECHNICA FOOTBALL</h1>
          <p style="color: #f0722b; margin: 6px 0 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">New Player Registration</p>
        </div>
        <div style="padding: 28px;">
          <p style="color: #374151; margin-top: 0;">A new player registration form has just been submitted on the website.</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${row('Player', `${registration.player_first_name} ${registration.player_last_name}`)}
            ${row('Date of Birth', registration.player_birthday)}
            ${row('Gender', registration.player_gender)}
            ${row('Experience', registration.player_experience)}
            ${row('Medical Conditions', registration.medical_conditions || 'None')}
            ${row('Photo Permission', registration.photo_permission ? 'Yes' : 'No')}
            ${row('Parent Email', registration.parent_email)}
            ${row('Parent Phone', registration.parent_phone)}
            ${row('Emergency Contact', `${registration.emergency_first_name} ${registration.emergency_last_name} (${registration.emergency_relationship})`)}
            ${classTitle ? row('Registering For', classTitle) : ''}
            ${registration.additional_info ? row('Additional Info', registration.additional_info) : ''}
          </table>
          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
            Note: payment may not have been completed yet — a separate "New Paid Registration" email is sent once payment is confirmed.
          </p>
        </div>
      </div>
    `;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Technica Football <info@technicafootball.com.au>',
        to: adminEmail,
        subject: `New Registration Form — ${registration.player_first_name} ${registration.player_last_name}`,
        html,
      }),
    });

    if (!emailRes.ok) {
      console.error('Failed to send registration notification:', await emailRes.text());
      return new Response(JSON.stringify({ success: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
      });
    }

    console.log('Registration notification sent to:', adminEmail);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    });
  } catch (error) {
    console.error('notify-registration error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
    });
  }
});
