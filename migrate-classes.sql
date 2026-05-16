-- ============================================================
-- Migration: Upgrade "classes" table to hold full CMS data
-- ============================================================

-- 1. Add new columns to the existing `classes` table
ALTER TABLE classes 
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS subtitle text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS full_address text,
  ADD COLUMN IF NOT EXISTS age_group text,
  ADD COLUMN IF NOT EXISTS price integer,
  ADD COLUMN IF NOT EXISTS started_date text,
  ADD COLUMN IF NOT EXISTS date_range text,
  ADD COLUMN IF NOT EXISTS session_duration text,
  ADD COLUMN IF NOT EXISTS total_sessions integer,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS sessions jsonb DEFAULT '[]'::jsonb;

-- 2. Seed the existing data into the columns
UPDATE classes SET
  slug = 'foundation-sunday-10am',
  title = 'Foundation Class',
  subtitle = 'Term 2 - Sunday 10:00am',
  location = 'The Ponds / Foundation 4-8',
  address = 'Carindale Street',
  full_address = 'Technica Football, Carindale Street, The Ponds NSW, Australia',
  age_group = '4-8',
  price = 189,
  started_date = '26 Apr',
  date_range = '26 Apr 2026 - 14 June 2026',
  session_duration = '45 Minutes',
  total_sessions = 8,
  description = 'Join our Term 2 Term Program for ages 4-8 years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.

- Age Group: Foundation 4-8 Years
- Duration: 8 Weeks (8 Sessions)
- Dates: 26th of April / 14th of June
- Session Duration: 45 Minutes
- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*

Information regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.

Any questions, please don''t hesitate to contact us!',
  sessions = '[
    {"date": "Sunday 26 Apr", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 3 May", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 10 May", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 17 May", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 24 May", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 31 May", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 7 June", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"},
    {"date": "Sunday 14 June", "time": "10:00 am", "duration": "45 min", "durationLabel": "45 minutes", "coach": "Coach Mackenzie"}
  ]'::jsonb
WHERE id = 'foundation-sun-10am';

UPDATE classes SET
  slug = 'elite-sunday-11am',
  title = 'Elite Class',
  subtitle = 'Term 2 - Sunday 11:00am',
  location = 'The Ponds / Elite 8-12',
  address = 'Carindale Street',
  full_address = 'Technica Football, Carindale Street, The Ponds NSW, Australia',
  age_group = '8-12',
  price = 209,
  started_date = '26 Apr',
  date_range = '26 Apr 2026 - 14 June 2026',
  session_duration = '1 Hour',
  total_sessions = 8,
  description = 'Join our Term 2 Term Program for ages 8-12 years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.

- Age Group: Elite 8-12 Years
- Duration: 8 Weeks (8 Sessions)
- Dates: 26th of April / 14th of June
- Session Duration: 1 Hour
- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*

Information regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.

Any questions, please don''t hesitate to contact us!',
  sessions = '[
    {"date": "Sunday 26 Apr", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 3 May", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 10 May", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 17 May", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 24 May", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 31 May", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 7 June", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Sunday 14 June", "time": "11:00 am", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"}
  ]'::jsonb
WHERE id = 'elite-sun-11am';

UPDATE classes SET
  slug = 'elite-thursday-430pm',
  title = 'Elite Class',
  subtitle = 'Term 2 - Thursday 4:30pm',
  location = 'The Ponds / Elite 8-12',
  address = 'Carindale Street',
  full_address = 'Technica Football, Carindale Street, The Ponds NSW, Australia',
  age_group = '8-12',
  price = 209,
  started_date = '30 Apr',
  date_range = '30 Apr 2026 - 18 June 2026',
  session_duration = '1 Hour',
  total_sessions = 8,
  description = 'Join our Term 2 Term Program for ages 8-12 years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.

- Age Group: Elite 8-12 Years
- Duration: 8 Weeks (8 Sessions)
- Dates: 30 of April / 18th of June
- Session Duration: 1 Hour
- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*

Information regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.

Any questions, please don''t hesitate to contact us!',
  sessions = '[
    {"date": "Thursday 30 Apr", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 7 May", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 14 May", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 21 May", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 28 May", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 4 June", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 11 June", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"},
    {"date": "Thursday 18 June", "time": "4:30 pm", "duration": "1 hr", "durationLabel": "1 hour", "coach": "Coach Mackenzie"}
  ]'::jsonb
WHERE id = 'elite-thu-430pm';
