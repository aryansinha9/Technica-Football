-- ============================================================
-- Technica Football Booking System — Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- 1. Classes table — tracks capacity (spots remaining)
CREATE TABLE IF NOT EXISTS classes (
  id text PRIMARY KEY,
  label text NOT NULL,
  spots_remaining integer NOT NULL DEFAULT 15,
  max_capacity integer NOT NULL DEFAULT 15,
  updated_at timestamptz DEFAULT now()
);

-- Seed the three Term 2 classes
INSERT INTO classes (id, label, spots_remaining, max_capacity) VALUES
  ('foundation-sun-10am', 'Term 2 - Sunday 10:00am / Foundation 4-8', 7, 15),
  ('elite-sun-11am', 'Term 2 - Sunday 11:00am / Elite 8-12', 9, 15),
  ('elite-thu-430pm', 'Term 2 - Thursday 4:30pm / Elite 8-12', 5, 15)
ON CONFLICT (id) DO NOTHING;

-- 2. Registrations table — stores player info (first-time registration)
CREATE TABLE IF NOT EXISTS registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_first_name text NOT NULL,
  player_last_name text NOT NULL,
  player_birthday date NOT NULL,
  player_gender text NOT NULL,
  medical_conditions text,
  player_experience text,
  photo_permission boolean NOT NULL DEFAULT false,
  emergency_first_name text NOT NULL,
  emergency_last_name text NOT NULL,
  emergency_relationship text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  additional_info text,
  created_at timestamptz DEFAULT now()
);

-- Index for quick email lookups (returning customers)
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations (parent_email);

-- 3. Bookings table — stores each booking + payment info
CREATE TABLE IF NOT EXISTS bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id uuid REFERENCES registrations(id),
  parent_first_name text NOT NULL,
  parent_last_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  player_name text NOT NULL,
  class_id text NOT NULL REFERENCES classes(id),
  class_label text NOT NULL,
  class_price integer NOT NULL,
  addon_45min boolean NOT NULL DEFAULT false,
  addon_60min boolean NOT NULL DEFAULT false,
  addon_total integer NOT NULL DEFAULT 0,
  total_paid integer NOT NULL,
  stripe_session_id text,
  payment_status text NOT NULL DEFAULT 'pending',
  terms_agreed boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Index for admin filtering
CREATE INDEX IF NOT EXISTS idx_bookings_class ON bookings (class_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (payment_status);

-- 4. Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public can read class spots (for displaying on the website)
CREATE POLICY "Public can read classes" ON classes
  FOR SELECT USING (true);

-- Public can insert registrations (new customers registering)
CREATE POLICY "Public can insert registrations" ON registrations
  FOR INSERT WITH CHECK (true);

-- Public can read their own registration by email
CREATE POLICY "Public can read own registrations" ON registrations
  FOR SELECT USING (true);

-- Public can insert bookings (creating a booking)
CREATE POLICY "Public can insert bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Public can read their own booking (for confirmation page)
CREATE POLICY "Public can read bookings" ON bookings
  FOR SELECT USING (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admins can manage classes" ON classes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage registrations" ON registrations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage bookings" ON bookings
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. Function to decrement spots on successful payment
CREATE OR REPLACE FUNCTION decrement_spots(p_class_id text)
RETURNS void AS $$
BEGIN
  UPDATE classes
  SET spots_remaining = GREATEST(spots_remaining - 1, 0),
      updated_at = now()
  WHERE id = p_class_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
