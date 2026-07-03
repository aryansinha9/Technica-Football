-- ============================================================
-- Technica Football — Migration July 2026
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor).
-- Safe to run more than once.
--
-- What this does:
--   1. Creates the site_content table (editable homepage/page text)
--   2. Lets new classes be created from the admin dashboard
--   3. PRIVACY FIX: stops the public anon key from reading all
--      registrations & bookings (children's personal/medical data)
--   4. Adds two SECURITY DEFINER functions so the public booking
--      flows keep working with only minimal data exposed
-- ============================================================

-- ── 1. Editable site content ────────────────────────────────
-- One row per site section: { id, value: { field: text } }.
-- The frontend falls back to the built-in copy when a row is missing,
-- so this table starts empty and fills up as admins save sections.

CREATE TABLE IF NOT EXISTS site_content (
  id text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read site_content" ON site_content;
CREATE POLICY "Public can read site_content" ON site_content
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage site_content" ON site_content;
CREATE POLICY "Admins can manage site_content" ON site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- ── 2. Allow creating classes from the admin dashboard ──────
-- `label` is a legacy column from the original schema; new classes are
-- described by title/subtitle instead. The dashboard still writes a label,
-- but the column should no longer be able to block an insert.

ALTER TABLE classes ALTER COLUMN label DROP NOT NULL;

-- ── 3. Privacy fix: lock down personal data ─────────────────
-- The original policies let ANYONE with the public anon key read every
-- registration and booking (player names, birthdays, medical conditions,
-- parent emails/phones). Admins keep full access via the existing
-- "Admins can manage ..." policies (authenticated role).
--
-- NOTE: deploy the updated website code BEFORE (or together with) running
-- this section — the new code uses the functions below instead of reading
-- these tables directly.

DROP POLICY IF EXISTS "Public can read own registrations" ON registrations;
DROP POLICY IF EXISTS "Public can read bookings" ON bookings;

-- ── 4. Minimal-exposure lookup functions ────────────────────

-- Returning-customer lookup: returns only the fields needed to pre-fill
-- the booking form, for the most recent registration with that email.
CREATE OR REPLACE FUNCTION lookup_registration(p_email text)
RETURNS TABLE (
  id uuid,
  parent_email text,
  parent_phone text,
  player_first_name text,
  player_last_name text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.id, r.parent_email, r.parent_phone, r.player_first_name, r.player_last_name
  FROM registrations r
  WHERE lower(r.parent_email) = lower(trim(p_email))
  ORDER BY r.created_at DESC
  LIMIT 1;
$$;

-- Confirmation page: returns booking summary only when the caller knows the
-- matching Stripe checkout session id (which only the payer receives).
CREATE OR REPLACE FUNCTION get_booking_confirmation(p_session_id text, p_booking_id uuid DEFAULT NULL)
RETURNS TABLE (
  class_label text,
  player_name text,
  total_paid integer,
  addon_45min boolean,
  addon_60min boolean,
  parent_email text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.class_label, b.player_name, b.total_paid, b.addon_45min, b.addon_60min, b.parent_email
  FROM bookings b
  WHERE b.stripe_session_id = p_session_id
    AND (p_booking_id IS NULL OR b.id = p_booking_id)
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION lookup_registration(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_booking_confirmation(text, uuid) TO anon, authenticated;
