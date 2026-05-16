import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// ─── Types ─────────────────────────────────────────────────

export interface Coach {
  id: string;
  name: string;
  role: string;
  bio: string;
  team: string;
  image_url: string | null;
  sort_order: number;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  link: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  sort_order: number;
}

export interface Program {
  id: string;
  icon: string;
  label: string;
  title: string;
  ages: string;
  href: string;
  description: string;
  visible: boolean;
  sort_order: number;
}

export interface ProgramPage {
  id: string;
  about_text: string;
  card1_title: string;
  card1_text: string;
  card2_title: string;
  card2_text: string;
  info_sections: Array<{ label: string; value: string; icon: string }>;
}

export interface TermSession {
  date: string;
  time: string;
  duration: string;
  durationLabel: string;
  coach: string;
}

export interface TermClass {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  address: string;
  fullAddress: string;
  ageGroup: string;
  price: number;
  startedDate: string;
  dateRange: string;
  sessionDuration: string;
  totalSessions: number;
  description: string;
  sessions: TermSession[];
  spots_remaining?: number;
  max_capacity?: number;
}

// ─── Fallback Data (current hardcoded content) ────────────

export const FALLBACK_COACHES: Coach[] = [
  { id: '1', name: 'Mackenzie Dunn', role: 'Director & Head Coach', bio: 'Started Technica Football in 2022 with the vision of developing respectful, technical, and resilient players. 7+ years coaching experience. Represented U18 AC Milan Academy and played competitive football.', team: 'Manchester United', image_url: null, sort_order: 1 },
  { id: '2', name: 'Najeeb Farooqi', role: 'Co-Director & Coach', bio: 'Primary school PE teacher with a passion for youth development through sport. Brings structured, engaging training methods that make football both fun and purposeful.', team: 'Liverpool', image_url: null, sort_order: 2 },
  { id: '3', name: 'Daniel Walsh', role: 'Coach', bio: 'Part of the Technica family since 2023. Works in before and after school care, specialising in primary school and holiday programs. Passionate about creating positive early experiences with the game.', team: 'Chelsea', image_url: null, sort_order: 3 },
];

export const FALLBACK_SPONSORS: Sponsor[] = [
  { id: '1', name: 'Greg the Jeweller', logo_url: '/greg-the-jeweller.png', link: 'https://www.facebook.com/profile.php?id=100057316867195', sort_order: 1 },
  { id: '2', name: 'Fresh Promotions', logo_url: '/freshpromotions.png', link: 'https://www.freshpromotions.com.au/', sort_order: 2 },
  { id: '3', name: "Grill'd", logo_url: '/grilld.png', link: 'https://grilld.com.au/', sort_order: 3 },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: '1', quote: "Thanks Mckenzie you are the best. When we first came to him my son (who is Autistic) can't even reciprocate anything and even didn't have any concept of soccer. With Mckenzie's amazing patience and commendable coaching after 1 year now he knows dribble, pass, touch, kick and goal. Mckenzie is great.", name: 'Attrayee', location: 'NSW', sort_order: 1 },
  { id: '2', quote: 'Great investment in the lives of these young lives! Technica Football what you are doing in a world that is challenging ALL of us! Feel proud.', name: 'Vera', location: 'NSW', sort_order: 2 },
];

export const FALLBACK_PROGRAMS: Program[] = [
  { id: 'term-program', icon: 'Clock', label: 'Seasonal', title: 'Term Program', ages: 'Ages 5–15', href: '/programs/term-program', description: 'Our flagship structured seasonal program runs throughout the school term, providing consistent weekly sessions built around technical skill development, game intelligence, and teamwork.', visible: true, sort_order: 1 },
  { id: 'individual-sessions', icon: 'User', label: 'Personalised', title: 'Individual Sessions', ages: 'All Ages', href: '/programs/individual-sessions', description: "One-on-one coaching tailored specifically to your player's unique needs and goals. Perfect for targeted skill development, confidence building, and rapid improvement.", visible: true, sort_order: 2 },
  { id: 'academy-development-squad', icon: 'Trophy', label: 'Elite Pathway', title: 'Academy Development Squad', ages: 'Ages 8–16', href: '/programs/academy-development-squad', description: 'An elite development pathway for players who are serious about reaching the next level. High-performance sessions covering advanced technique, tactical intelligence, and physical conditioning.', visible: true, sort_order: 3 },
  { id: 'holiday-clinic', icon: 'Sun', label: 'Holiday', title: 'Holiday Clinic', ages: 'Ages 5–15', href: '/programs/holiday-clinic', description: 'Intensive multi-day camps during school holidays. A fantastic opportunity for players to develop skills, build new friendships, and keep active throughout the break.', visible: true, sort_order: 4 },
  { id: 'club-technica-training', icon: 'Users', label: 'Community', title: 'Club Technica Training', ages: 'Ages 5–15', href: '/programs/club-technica-training', description: 'Train with the Technica Football community. Group sessions focused on technical development, teamwork, and building the club culture that drives players to excel.', visible: true, sort_order: 5 },
  { id: 'vacation-care', icon: 'Building', label: 'Care Programs', title: 'OSH/Vacation Care', ages: 'Ages 5–12', href: '/programs/vacation-care', description: 'Quality football coaching delivered through before-school care, after-school care, and vacation care programs. We come to you — bringing the game directly to your community.', visible: true, sort_order: 6 },
];

export const FALLBACK_TERM_CLASSES: TermClass[] = [
  {
    id: 'foundation-sun-10am',
    slug: 'foundation-sunday-10am',
    title: 'Foundation Class',
    subtitle: 'Term 2 - Sunday 10:00am',
    location: 'The Ponds / Foundation 4-8',
    address: 'Carindale Street',
    fullAddress: 'Technica Football, Carindale Street, The Ponds NSW, Australia',
    ageGroup: '4-8',
    price: 189,
    startedDate: '26 Apr',
    dateRange: '26 Apr 2026 - 14 June 2026',
    sessionDuration: '45 Minutes',
    totalSessions: 8,
    description: 'Join our Term 2 Term Program for ages 4-8 years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.\n\n- Age Group: Foundation 4-8 Years\n- Duration: 8 Weeks (8 Sessions)\n- Dates: 26th of April / 14th of June\n- Session Duration: 45 Minutes\n- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*\n\nInformation regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.\n\nAny questions, please don\'t hesitate to contact us!',
    sessions: [
      { date: 'Sunday 26 Apr', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 3 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 10 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 17 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 24 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 31 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 7 June', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 14 June', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
    ]
  },
  {
    id: 'elite-sun-11am',
    slug: 'elite-sunday-11am',
    title: 'Elite Class',
    subtitle: 'Term 2 - Sunday 11:00am',
    location: 'The Ponds / Elite 8-12',
    address: 'Carindale Street',
    fullAddress: 'Technica Football, Carindale Street, The Ponds NSW, Australia',
    ageGroup: '8-12',
    price: 209,
    startedDate: '26 Apr',
    dateRange: '26 Apr 2026 - 14 June 2026',
    sessionDuration: '1 Hour',
    totalSessions: 8,
    description: 'Join our Term 2 Term Program for ages 8-12 years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.\n\n- Age Group: Elite 8-12 Years\n- Duration: 8 Weeks (8 Sessions)\n- Dates: 26th of April / 14th of June\n- Session Duration: 1 Hour\n- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*\n\nInformation regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.\n\nAny questions, please don\'t hesitate to contact us!',
    sessions: [
      { date: 'Sunday 26 Apr', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 3 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 10 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 17 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 24 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 31 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 7 June', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 14 June', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
    ]
  },
  {
    id: 'elite-thu-430pm',
    slug: 'elite-thursday-430pm',
    title: 'Elite Class',
    subtitle: 'Term 2 - Thursday 4:30pm',
    location: 'The Ponds / Elite 8-12',
    address: 'Carindale Street',
    fullAddress: 'Technica Football, Carindale Street, The Ponds NSW, Australia',
    ageGroup: '8-12',
    price: 209,
    startedDate: '30 Apr',
    dateRange: '30 Apr 2026 - 18 June 2026',
    sessionDuration: '1 Hour',
    totalSessions: 8,
    description: 'Join our Term 2 Term Program for ages 8-12 years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.\n\n- Age Group: Elite 8-12 Years\n- Duration: 8 Weeks (8 Sessions)\n- Dates: 30 of April / 18th of June\n- Session Duration: 1 Hour\n- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*\n\nInformation regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.\n\nAny questions, please don\'t hesitate to contact us!',
    sessions: [
      { date: 'Thursday 30 Apr', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 7 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 14 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 21 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 28 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 4 June', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 11 June', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 18 June', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
    ]
  }
];

// ─── Hooks ────────────────────────────────────────────────

export function useCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>(FALLBACK_COACHES);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('coaches').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setCoaches(data);
      setLoading(false);
    });
  }, []);
  return { coaches, loading, setCoaches };
}

export function useSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(FALLBACK_SPONSORS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('sponsors').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setSponsors(data);
      setLoading(false);
    });
  }, []);
  return { sponsors, loading, setSponsors };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('testimonials').select('*').order('sort_order').then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data);
      setLoading(false);
    });
  }, []);
  return { testimonials, loading, setTestimonials };
}

export function usePrograms(visibleOnly = true) {
  const [programs, setPrograms] = useState<Program[]>(
    visibleOnly ? FALLBACK_PROGRAMS.filter(p => p.visible) : FALLBACK_PROGRAMS
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let query = supabase.from('programs').select('*').order('sort_order');
    if (visibleOnly) query = query.eq('visible', true);
    query.then(({ data }) => {
      if (data && data.length > 0) setPrograms(data);
      setLoading(false);
    });
  }, [visibleOnly]);
  return { programs, loading, setPrograms };
}

export function useProgramPage(slug: string) {
  const [page, setPage] = useState<ProgramPage | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) return;
    supabase.from('program_pages').select('*').eq('id', slug).single().then(({ data }) => {
      if (data) setPage(data);
      setLoading(false);
    });
  }, [slug]);
  return { page, loading };
}

export function useTermClasses() {
  const [classes, setClasses] = useState<TermClass[]>(FALLBACK_TERM_CLASSES);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('classes').select('*').then(({ data }) => {
      if (data && data.length > 0) {
        // Map database camelCase/snake_case to the camelCase frontend interface
        // Provide fallback values if not present
        const mapped = data.map(c => ({
          id: c.id,
          slug: c.slug || '',
          title: c.title || '',
          subtitle: c.subtitle || '',
          location: c.location || '',
          address: c.address || '',
          fullAddress: c.full_address || '',
          ageGroup: c.age_group || '',
          price: c.price || 0,
          startedDate: c.started_date || '',
          dateRange: c.date_range || '',
          sessionDuration: c.session_duration || '',
          totalSessions: c.total_sessions || 0,
          description: c.description || '',
          sessions: c.sessions || [],
          spots_remaining: c.spots_remaining,
          max_capacity: c.max_capacity
        }));

        // Sort: Foundation classes first, then alphabetically by ID
        mapped.sort((a, b) => {
          const aIsFoundation = a.id.toLowerCase().includes('foundation');
          const bIsFoundation = b.id.toLowerCase().includes('foundation');
          if (aIsFoundation && !bIsFoundation) return -1;
          if (!aIsFoundation && bIsFoundation) return 1;
          return a.id.localeCompare(b.id);
        });

        setClasses(mapped);
      }
      setLoading(false);
    });
  }, []);
  return { classes, loading, setClasses };
}

// ─── Image Upload Helper ──────────────────────────────────

export async function uploadImage(file: File, folder: 'coaches' | 'sponsors'): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('site-assets').upload(filename, file, { upsert: true });
  if (error) { console.error('Upload error:', error); return null; }
  const { data } = supabase.storage.from('site-assets').getPublicUrl(filename);
  return data.publicUrl;
}
