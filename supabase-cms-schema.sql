-- ============================================================
-- Technica Football CMS Schema
-- Run this in Supabase SQL Editor AFTER the main schema
-- ============================================================

-- 1. Coaches table
CREATE TABLE IF NOT EXISTS coaches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  team text NOT NULL DEFAULT '',
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

INSERT INTO coaches (name, role, bio, team, sort_order) VALUES
  ('Mackenzie Dunn', 'Director & Head Coach', 'Started Technica Football in 2022 with the vision of developing respectful, technical, and resilient players. 7+ years coaching experience. Represented U18 AC Milan Academy and played competitive football.', 'Manchester United', 1),
  ('Najeeb Farooqi', 'Co-Director & Coach', 'Primary school PE teacher with a passion for youth development through sport. Brings structured, engaging training methods that make football both fun and purposeful.', 'Liverpool', 2),
  ('Daniel Walsh', 'Coach', 'Part of the Technica family since 2023. Works in before and after school care, specialising in primary school and holiday programs. Passionate about creating positive early experiences with the game.', 'Chelsea', 3)
ON CONFLICT DO NOTHING;

-- 2. Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo_url text NOT NULL,
  link text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

INSERT INTO sponsors (name, logo_url, link, sort_order) VALUES
  ('Greg the Jeweller', '/greg-the-jeweller.png', 'https://www.facebook.com/profile.php?id=100057316867195', 1),
  ('Fresh Promotions', '/freshpromotions.png', 'https://www.freshpromotions.com.au/', 2),
  ('Grill''d', '/grilld.png', 'https://grilld.com.au/', 3)
ON CONFLICT DO NOTHING;

-- 3. Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote text NOT NULL,
  name text NOT NULL,
  location text NOT NULL DEFAULT 'NSW',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

INSERT INTO testimonials (quote, name, location, sort_order) VALUES
  ('Thanks Mckenzie you are the best. When we first came to him my son (who is Autistic) can''t even reciprocate anything and even didn''t have any concept of soccer. With Mckenzie''s amazing patience and commendable coaching after 1 year now he knows dribble, pass, touch, kick and goal. Mckenzie is great.', 'Attrayee', 'NSW', 1),
  ('Great investment in the lives of these young lives! Technica Football what you are doing in a world that is challenging ALL of us! Feel proud.', 'Vera', 'NSW', 2)
ON CONFLICT DO NOTHING;

-- 4. Programs table
CREATE TABLE IF NOT EXISTS programs (
  id text PRIMARY KEY,
  icon text NOT NULL DEFAULT 'Clock',
  label text NOT NULL,
  title text NOT NULL,
  ages text NOT NULL,
  href text NOT NULL,
  description text NOT NULL,
  visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0
);

INSERT INTO programs (id, icon, label, title, ages, href, description, visible, sort_order) VALUES
  ('term-program', 'Clock', 'Seasonal', 'Term Program', 'Ages 5–15', '/programs/term-program', 'Our flagship structured seasonal program runs throughout the school term, providing consistent weekly sessions built around technical skill development, game intelligence, and teamwork.', true, 1),
  ('individual-sessions', 'User', 'Personalised', 'Individual Sessions', 'All Ages', '/programs/individual-sessions', 'One-on-one coaching tailored specifically to your player''s unique needs and goals. Perfect for targeted skill development, confidence building, and rapid improvement.', true, 2),
  ('academy-development-squad', 'Trophy', 'Elite Pathway', 'Academy Development Squad', 'Ages 8–16', '/programs/academy-development-squad', 'An elite development pathway for players who are serious about reaching the next level. High-performance sessions covering advanced technique, tactical intelligence, and physical conditioning.', true, 3),
  ('holiday-clinic', 'Sun', 'Holiday', 'Holiday Clinic', 'Ages 5–15', '/programs/holiday-clinic', 'Intensive multi-day camps during school holidays. A fantastic opportunity for players to develop skills, build new friendships, and keep active throughout the break.', true, 4),
  ('club-technica-training', 'Users', 'Community', 'Club Technica Training', 'Ages 5–15', '/programs/club-technica-training', 'Train with the Technica Football community. Group sessions focused on technical development, teamwork, and building the club culture that drives players to excel.', true, 5),
  ('vacation-care', 'Building', 'Care Programs', 'OSH/Vacation Care', 'Ages 5–12', '/programs/vacation-care', 'Quality football coaching delivered through before-school care, after-school care, and vacation care programs. We come to you — bringing the game directly to your community.', true, 6)
ON CONFLICT DO NOTHING;

-- 5. Program pages content table
CREATE TABLE IF NOT EXISTS program_pages (
  id text PRIMARY KEY,
  about_text text NOT NULL,
  card1_title text NOT NULL DEFAULT 'Technical Development',
  card1_text text NOT NULL,
  card2_title text NOT NULL DEFAULT 'Tailored Sessions',
  card2_text text NOT NULL,
  info_sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO program_pages (id, about_text, card1_title, card1_text, card2_title, card2_text, info_sections) VALUES
  ('term-program',
   'Our Term Program offers weekly training sessions in an 8-week program designed for ages 4–12 years. This program is designed to develop players'' technical abilities, game sense and overall fitness. We aim for players to develop key skills of dribbling, first touch and passing through various individual, group and game-realistic scenarios. It follows a similar structure to the NSW school timetable dates. Available for all ages and abilities with no prior experience required.',
   'Foundation Class', 'Our Foundation Class is designed for younger players aged 4–8, focusing on the fundamentals of football — first touch, dribbling, and ball mastery in a fun, structured environment.',
   'Elite Class', 'The Elite Class is built for players aged 8–12 who are ready to be challenged. Sessions are more technically demanding, with a focus on applying skills in game-realistic scenarios.',
   '[{"label":"Program Duration","value":"8 weeks per term, following the NSW school term calendar.","icon":"CalendarCheck"},{"label":"Session Length","value":"60 minutes per session.","icon":"Clock"},{"label":"Location","value":"The Ponds High School Oval, The Ponds NSW 2769.","icon":"MapPin"},{"label":"Foundation Class Cost","value":"$189 per player for the full term.","icon":"DollarSign"},{"label":"Elite Class Cost","value":"$209 per player for the full term.","icon":"DollarSign"}]'::jsonb),
  ('individual-sessions',
   'Our individual sessions are primarily focused on the player — we work directly on what the player wants to achieve. We discuss areas that challenge the player and where they want to improve in the game. All our sessions involve ball mastery, perfecting the fundamental skills of the game (first touch, dribbling and passing) assisted with strength and conditioning training. Specialised training for all positions including wingers, strikers, defenders and mid-fielders, with drills and activities to accompany their position.',
   'Technical Development', 'Sessions focused on developing the key football skills that create a technical player — passing, dribbling and first touch used in game-realistic scenarios.',
   'Tailored Sessions', 'Each session is tailored towards the player — aimed to focus on what they want to achieve, areas of struggle and position-specific drills that replicate real game scenarios.',
   '[{"label":"Program Duration","value":"Sessions can be scheduled on a weekly basis.","icon":"Clock"},{"label":"Session Length","value":"45 minutes or 1 hour per session.","icon":"Clock"},{"label":"Locations","value":"The Ponds (Fyfe Rd), Russell Reserve, Hills Centenary","icon":"MapPin"},{"label":"Cost","value":"$60 — 45-minute session | $75 — 1-hour session | Bundles for 3 or 5 sessions with discounts available","icon":"DollarSign"}]'::jsonb),
  ('holiday-clinic',
   'Our Holiday Clinic provides players with an intensive training experience during school holidays. Sessions are designed to be high-energy and engaging, covering all aspects of technical development in a fun environment. Players will work on core skills, participate in small-sided games, and receive individual feedback throughout the clinic.',
   'Technical Development', 'Intensive skill-building sessions covering first touch, dribbling, passing, and shooting — all in game-realistic scenarios designed to fast-track player development.',
   'Supportive Environment', 'A positive, inclusive environment where players of all abilities are welcomed and encouraged. Our coaches ensure every player feels confident and motivated throughout the clinic.',
   '[{"label":"Program Duration","value":"Multi-day clinics held during school holiday periods.","icon":"CalendarCheck"},{"label":"Session Length","value":"3–4 hours per day.","icon":"Clock"},{"label":"Location","value":"The Ponds, NSW.","icon":"MapPin"},{"label":"Cost","value":"Contact us for current holiday clinic pricing.","icon":"DollarSign"}]'::jsonb),
  ('vacation-care',
   'Our Vacation Care program brings structured, high-energy football coaching directly to your centre. We design each incursion to be age-appropriate, fun, and technically enriching — giving children a positive experience with the game regardless of their skill level.',
   'Technical Development', 'Age-appropriate football activities focused on first touch, dribbling, passing, and movement — structured for maximum engagement and skill development.',
   'Supportive Environment', 'A fun and inclusive environment designed for all abilities. Our coaches are experienced working with primary-school-aged children and tailor the session energy to the group.',
   '[{"label":"Session Format","value":"We come to your centre — no travel required for participants.","icon":"MapPin"},{"label":"Session Length","value":"Flexible session lengths available to suit your program schedule.","icon":"Clock"},{"label":"Age Group","value":"Kindergarten to Year 6 (Ages 5–12).","icon":"Users"},{"label":"Cost","value":"Contact us for vacation care pricing and availability.","icon":"DollarSign"}]'::jsonb),
  ('club-technica-training',
   'Club Technica Training brings the Technica Football methodology to group team settings. Sessions are structured to develop technical skills within a team environment, focusing on individual development alongside teamwork and game intelligence.',
   'Technical Development', 'Sessions built around the core Technica Football pillars — touch, dribbling, passing, communication, and scanning — applied in team training scenarios.',
   'Team Environment', 'Training within a team setting allows players to develop technical skills alongside communication, movement, and tactical understanding in realistic game situations.',
   '[{"label":"Format","value":"Group sessions for teams and clubs.","icon":"Users"},{"label":"Session Length","value":"Flexible — contact us to discuss options.","icon":"Clock"},{"label":"Location","value":"TBC — we can come to your training ground.","icon":"MapPin"},{"label":"Cost","value":"Contact us for group and club pricing.","icon":"DollarSign"}]'::jsonb),
  ('academy-development-squad',
   'The Academy Development Squad is an elite pathway for players serious about reaching the next level. Sessions are high-performance and technically demanding, designed for players looking to develop advanced technical skills, tactical intelligence, and physical conditioning.',
   'Elite Training', 'High-performance sessions covering advanced technique, tactical intelligence, and conditioning — designed to push players to the next level of their development.',
   'Elite Pathway', 'A structured development pathway for serious players who want to maximise their potential. Focus on all aspects of elite player development including mentality and game understanding.',
   '[{"label":"Format","value":"Elite group sessions for advanced players.","icon":"Trophy"},{"label":"Session Length","value":"To be confirmed — contact us for details.","icon":"Clock"},{"label":"Location","value":"The Ponds, NSW.","icon":"MapPin"},{"label":"Cost","value":"Contact us for Academy Development Squad pricing.","icon":"DollarSign"}]'::jsonb)
ON CONFLICT DO NOTHING;

-- RLS for new tables
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read coaches" ON coaches FOR SELECT USING (true);
CREATE POLICY "Admins can manage coaches" ON coaches FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read sponsors" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Admins can manage sponsors" ON sponsors FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Admins can manage programs" ON programs FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read program_pages" ON program_pages FOR SELECT USING (true);
CREATE POLICY "Admins can manage program_pages" ON program_pages FOR ALL USING (auth.role() = 'authenticated');
