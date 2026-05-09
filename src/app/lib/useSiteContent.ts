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
  { id: 'club-technica-training', icon: 'Users', label: 'Community', title: 'Club Technica Training', ages: 'Ages 5–15', href: '/programs/club-technica-training', description: 'Train with the Technica Football community. Group sessions focused on technical development, teamwork, and building the club culture that drives players to excel.', visible: true, sort_order: 3 },
  { id: 'academy-development-squad', icon: 'Trophy', label: 'Elite Pathway', title: 'Academy Development Squad', ages: 'Ages 8–16', href: '/programs/academy-development-squad', description: 'An elite development pathway for players who are serious about reaching the next level. High-performance sessions covering advanced technique, tactical intelligence, and physical conditioning.', visible: true, sort_order: 4 },
  { id: 'holiday-clinic', icon: 'Sun', label: 'Holiday', title: 'Holiday Clinic', ages: 'Ages 5–15', href: '/programs/holiday-clinic', description: 'Intensive multi-day camps during school holidays. A fantastic opportunity for players to develop skills, build new friendships, and keep active throughout the break.', visible: true, sort_order: 5 },
  { id: 'vacation-care', icon: 'Building', label: 'Care Programs', title: 'OSH/Vacation Care', ages: 'Ages 5–12', href: '/programs/vacation-care', description: 'Quality football coaching delivered through before-school care, after-school care, and vacation care programs. We come to you — bringing the game directly to your community.', visible: true, sort_order: 6 },
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

// ─── Image Upload Helper ──────────────────────────────────

export async function uploadImage(file: File, folder: 'coaches' | 'sponsors'): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('site-assets').upload(filename, file, { upsert: true });
  if (error) { console.error('Upload error:', error); return null; }
  const { data } = supabase.storage.from('site-assets').getPublicUrl(filename);
  return data.publicUrl;
}
