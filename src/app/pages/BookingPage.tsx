import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';
import { useTermClasses, type TermClass } from '../lib/useSiteContent';
import { getTermStatus } from '../lib/termDates';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}

type Tab = 'register' | 'returning';

interface RegistrationData {
  id?: string;
  player_first_name: string;
  player_last_name: string;
  player_birthday: string;
  player_gender: string;
  gender_other?: string;
  medical_conditions: string;
  player_experience: string;
  photo_permission: boolean;
  emergency_first_name: string;
  emergency_last_name: string;
  emergency_relationship: string;
  parent_email: string;
  parent_phone: string;
  additional_info: string;
}

const emptyRegistration: RegistrationData = {
  player_first_name: '', player_last_name: '', player_birthday: '', player_gender: '',
  medical_conditions: '', player_experience: '', photo_permission: true,
  emergency_first_name: '', emergency_last_name: '', emergency_relationship: '',
  parent_email: '', parent_phone: '', additional_info: '',
};

export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { classes: termClasses, loading } = useTermClasses();
  
  const [classData, setClassData] = useState<TermClass | undefined>(undefined);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>('register');

  // Registration form
  const [reg, setReg] = useState<RegistrationData>(emptyRegistration);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // Returning customer lookup
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookupSuccess, setLookupSuccess] = useState(false);

  // Booking form
  const [parentFirst, setParentFirst] = useState('');
  const [parentLast, setParentLast] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Add-ons
  const [addon45, setAddon45] = useState(false);
  const [addon60, setAddon60] = useState(false);

  // Submission
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Validation
  const [regPhoneError, setRegPhoneError] = useState('');
  const [regEmailError, setRegEmailError] = useState('');
  const [bookPhoneError, setBookPhoneError] = useState('');
  const [bookEmailError, setBookEmailError] = useState('');

  const handleRegPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    const formatted = formatPhone(raw);
    setReg(prev => ({ ...prev, parent_phone: formatted }));
    setRegPhoneError(raw.length > 0 && raw.length < 10 ? 'Please enter a valid 10-digit Australian number' : '');
  };

  const handleRegEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setReg(prev => ({ ...prev, parent_email: val }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setRegEmailError(val && !emailRegex.test(val) ? 'Please enter a valid email address' : '');
  };

  const handleBookPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    const formatted = formatPhone(raw);
    setBookPhone(formatted);
    setBookPhoneError(raw.length > 0 && raw.length < 10 ? 'Please enter a valid 10-digit Australian number' : '');
  };

  const handleBookEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBookEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setBookEmailError(val && !emailRegex.test(val) ? 'Please enter a valid email address' : '');
  };

  useEffect(() => {
    if (slug && termClasses.length > 0) {
      const data = termClasses.find(c => c.slug === slug);
      setClassData(data);
      if (data) {
        supabase.from('classes').select('spots_remaining').eq('id', data.id).single()
          .then(({ data: row }) => { if (row) setSpotsRemaining(row.spots_remaining); });
      }
    }
  }, [slug, termClasses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1F44] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#f0722b] mb-4" />
        <h2 className="text-xl font-barlow tracking-widest uppercase">Loading Booking...</h2>
      </div>
    );
  }

  if (!classData) {
    return (
      <>
        <PageHero title="Class Not Found" subtitle="" bottomColor="#f3f4f6" />
        <section className="bg-[#f3f4f6] py-32 px-8 text-center">
          <Link to="/programs/term-program" className="text-[#f0722b] font-bold">← Back to Term Program</Link>
        </section>
      </>
    );
  }

  const addonTotal = (addon45 ? 50 : 0) + (addon60 ? 60 : 0);
  const grandTotal = classData.price + addonTotal;

  // Handle registration form submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    try {
      // Generate the id client-side: RLS no longer allows anonymous reads of
      // the registrations table, so we can't rely on INSERT ... RETURNING.
      const newRegistrationId = crypto.randomUUID();
      const { error } = await supabase.from('registrations').insert({
        id: newRegistrationId,
        player_first_name: reg.player_first_name,
        player_last_name: reg.player_last_name,
        player_birthday: reg.player_birthday,
        player_gender: reg.player_gender === 'Other' ? `Other: ${reg.gender_other || ''}` : reg.player_gender,
        medical_conditions: reg.medical_conditions,
        player_experience: reg.player_experience,
        photo_permission: reg.photo_permission,
        emergency_first_name: reg.emergency_first_name,
        emergency_last_name: reg.emergency_last_name,
        emergency_relationship: reg.emergency_relationship,
        parent_email: reg.parent_email,
        parent_phone: reg.parent_phone,
        additional_info: reg.additional_info || null,
      });

      if (error) throw error;
      setRegistrationId(newRegistrationId);
      setRegSubmitted(true);
      // Pre-fill booking form
      setBookEmail(reg.parent_email);
      setBookPhone(reg.parent_phone);
      setPlayerName(`${reg.player_first_name} ${reg.player_last_name}`);

      // Notify the club about the new registration (fire-and-forget — a
      // failure here should never block the parent from booking).
      supabase.functions.invoke('notify-registration', {
        body: {
          registrationId: newRegistrationId,
          classTitle: `${classData.title} — ${classData.subtitle}`,
        },
      }).catch(err => console.error('Registration notification failed:', err));
    } catch {
      alert('Registration failed. Please try again.');
    } finally {
      setRegLoading(false);
    }
  };

  // Handle returning customer lookup
  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupLoading(true);
    setLookupError('');
    try {
      // Preferred path: SECURITY DEFINER RPC that returns only the minimal
      // fields needed to pre-fill the form (the table itself is no longer
      // publicly readable). Falls back to a direct select if the RPC hasn't
      // been created yet.
      let record: { id: string; parent_email: string; parent_phone: string; player_first_name: string; player_last_name: string } | null = null;
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('lookup_registration', { p_email: lookupEmail.toLowerCase().trim() });
      if (!rpcError && Array.isArray(rpcData) && rpcData.length > 0) {
        record = rpcData[0];
      } else if (rpcError) {
        const { data } = await supabase.from('registrations')
          .select('id, parent_email, parent_phone, player_first_name, player_last_name')
          .eq('parent_email', lookupEmail.toLowerCase().trim())
          .order('created_at', { ascending: false }).limit(1).single();
        record = data;
      }
      if (!record) {
        setLookupError('No registration found for this email. Please register first.');
        return;
      }
      setRegistrationId(record.id);
      setBookEmail(record.parent_email);
      setBookPhone(record.parent_phone);
      setPlayerName(`${record.player_first_name} ${record.player_last_name}`);
      setLookupSuccess(true);
      setRegSubmitted(true);
    } catch {
      setLookupError('Something went wrong. Please try again.');
    } finally {
      setLookupLoading(false);
    }
  };

  // Handle final booking
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) { setBookingError('You must agree to the Terms & Conditions.'); return; }
    setBookingLoading(true);
    setBookingError('');

    try {
      // 1. Create booking record (id generated client-side — see handleRegister)
      const newBookingId = crypto.randomUUID();
      const { error: bookErr } = await supabase.from('bookings').insert({
        id: newBookingId,
        registration_id: registrationId,
        parent_first_name: parentFirst,
        parent_last_name: parentLast,
        parent_email: bookEmail,
        parent_phone: bookPhone,
        player_name: playerName,
        class_id: classData.id,
        class_label: classData.subtitle,
        class_price: classData.price * 100,
        addon_45min: addon45,
        addon_60min: addon60,
        addon_total: addonTotal * 100,
        total_paid: grandTotal * 100,
        payment_status: 'pending',
        terms_agreed: true,
      });

      if (bookErr) throw bookErr;

      // 2. Call Supabase Edge Function to create Stripe Checkout
      const { data: checkoutData, error: checkoutErr } = await supabase.functions.invoke('create-checkout', {
        body: {
          bookingId: newBookingId,
          classTitle: `${classData.title} — ${classData.subtitle}`,
          classPrice: classData.price * 100,
          addon45min: addon45,
          addon60min: addon60,
          customerEmail: bookEmail,
        },
      });

      if (checkoutErr) throw checkoutErr;

      // 3. Redirect to Stripe
      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        // Fallback: use stripe.js
        const stripe = await stripePromise;
        if (stripe && checkoutData?.sessionId) {
          await stripe.redirectToCheckout({ sessionId: checkoutData.sessionId });
        }
      }
    } catch (err) {
      console.error(err);
      setBookingError('Something went wrong creating your booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const inputClass = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f0722b]/50 focus:border-[#f0722b] transition-colors text-sm';
  const labelClass = 'block font-barlow font-bold tracking-widest uppercase text-xs text-[#0A1F44] mb-2';

  return (
    <>
      <PageHero title="Book Your Spot" subtitle={classData.subtitle} bottomColor="#f3f4f6" />

      <section className="bg-[#f3f4f6] pt-12 pb-32 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Column — Forms */}
          <div className="flex-1 min-w-0">
            {/* Tab Switcher */}
            {!regSubmitted && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2 mb-8">
                <button onClick={() => setTab('register')} className={`flex-1 py-3.5 rounded-xl font-barlow font-bold tracking-widest uppercase text-sm transition-colors ${tab === 'register' ? 'bg-[#0A1F44] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  Register Now
                </button>
                <button onClick={() => setTab('returning')} className={`flex-1 py-3.5 rounded-xl font-barlow font-bold tracking-widest uppercase text-sm transition-colors ${tab === 'returning' ? 'bg-[#0A1F44] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  Returning Customer
                </button>
              </div>
            )}

            {/* REGISTRATION FORM (first-time) */}
            {tab === 'register' && !regSubmitted && (
              <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#0A1F44] mb-1">Player Registration</h3>
                  <p className="text-gray-500 text-sm">Returning players do not need to complete this form.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Player's First Name *</label><input required className={inputClass} value={reg.player_first_name} onChange={e => setReg({...reg, player_first_name: e.target.value})} /></div>
                  <div><label className={labelClass}>Player's Last Name *</label><input required className={inputClass} value={reg.player_last_name} onChange={e => setReg({...reg, player_last_name: e.target.value})} /></div>
                </div>

                <div><label className={labelClass}>Player's Birthday *</label><input type="date" required className={inputClass} value={reg.player_birthday} onChange={e => setReg({...reg, player_birthday: e.target.value})} /></div>

                <div>
                  <label className={labelClass}>Player's Gender *</label>
                  <div className="flex flex-wrap gap-4">
                    {['Male', 'Female', 'Other'].map(g => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" required value={g} checked={reg.player_gender === g} onChange={e => setReg({...reg, player_gender: e.target.value})} className="accent-[#f0722b]" />
                        <span className="text-sm text-[#0A1F44]">{g}{g === 'Other' ? ' (Please Specify)' : ''}</span>
                      </label>
                    ))}
                  </div>
                  {reg.player_gender === 'Other' && (
                    <input placeholder="Please specify" className={`${inputClass} mt-3`} value={reg.gender_other || ''} onChange={e => setReg({...reg, gender_other: e.target.value})} />
                  )}
                </div>

                <div><label className={labelClass}>Medical conditions affecting participation? *</label><textarea required className={`${inputClass} min-h-[80px]`} value={reg.medical_conditions} onChange={e => setReg({...reg, medical_conditions: e.target.value})} placeholder="None, or describe any conditions..." /></div>

                <div><label className={labelClass}>Player's Experience? *</label><input required className={inputClass} value={reg.player_experience} onChange={e => setReg({...reg, player_experience: e.target.value})} placeholder="1 Year, NPL, New, etc." /></div>

                <div>
                  <label className={labelClass}>Permission to publish images/videos? *</label>
                  <div className="flex gap-6">
                    {[true, false].map(v => (
                      <label key={String(v)} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="photo" required checked={reg.photo_permission === v} onChange={() => setReg({...reg, photo_permission: v})} className="accent-[#f0722b]" />
                        <span className="text-sm text-[#0A1F44]">{v ? 'Yes' : 'No'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-black text-[#0A1F44] text-lg mb-4">Emergency Contact</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>First Name *</label><input required className={inputClass} value={reg.emergency_first_name} onChange={e => setReg({...reg, emergency_first_name: e.target.value})} /></div>
                    <div><label className={labelClass}>Last Name *</label><input required className={inputClass} value={reg.emergency_last_name} onChange={e => setReg({...reg, emergency_last_name: e.target.value})} /></div>
                  </div>
                  <div className="mt-4"><label className={labelClass}>Relationship to Player *</label><input required className={inputClass} value={reg.emergency_relationship} onChange={e => setReg({...reg, emergency_relationship: e.target.value})} /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input type="email" required className={`${inputClass} ${regEmailError ? 'border-red-400 focus:border-red-400' : ''}`} value={reg.parent_email} onChange={handleRegEmailChange} placeholder="you@example.com" />
                      {regEmailError && <p className="text-red-500 text-xs mt-1">{regEmailError}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Phone *</label>
                      <input type="tel" required className={`${inputClass} ${regPhoneError ? 'border-red-400 focus:border-red-400' : ''}`} value={reg.parent_phone} onChange={handleRegPhoneChange} placeholder="0400 000 000" maxLength={12} />
                      {regPhoneError && <p className="text-red-500 text-xs mt-1">{regPhoneError}</p>}
                    </div>
                  </div>
                </div>

                <div><label className={labelClass}>Additional Information</label><textarea className={`${inputClass} min-h-[80px]`} value={reg.additional_info} onChange={e => setReg({...reg, additional_info: e.target.value})} placeholder="e.g., my child is competitive/relaxed/requires support etc." /></div>

                <button type="submit" disabled={regLoading} className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {regLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <>Submit Registration <ChevronRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            {/* RETURNING CUSTOMER LOOKUP */}
            {tab === 'returning' && !regSubmitted && (
              <form onSubmit={handleLookup} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#0A1F44] mb-1">Returning Customer</h3>
                  <p className="text-gray-500 text-sm">Enter the email you registered with to look up your details.</p>
                </div>
                <div><label className={labelClass}>Email Address *</label><input type="email" required className={inputClass} value={lookupEmail} onChange={e => setLookupEmail(e.target.value)} placeholder="your@email.com" /></div>
                {lookupError && <div className="flex items-center gap-2 text-red-600 text-sm"><AlertCircle className="w-4 h-4" />{lookupError}</div>}
                <button type="submit" disabled={lookupLoading} className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                  {lookupLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Looking up...</> : <>Find My Registration <ChevronRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}

            {/* BOOKING FORM — shown after registration or lookup */}
            {regSubmitted && (
              <form onSubmit={handleBooking} className="space-y-8">
                {/* Success message */}
                <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-green-800 text-sm font-medium">
                    {lookupSuccess ? 'Welcome back! Your details have been loaded.' : 'Registration complete! Now complete the booking form below.'}
                  </p>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#0A1F44] mb-1">Booking Form</h3>
                    <p className="text-gray-500 text-sm">Complete the information below to proceed to payment.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Parent First Name *</label><input required className={inputClass} value={parentFirst} onChange={e => setParentFirst(e.target.value)} /></div>
                    <div><label className={labelClass}>Parent Last Name *</label><input required className={inputClass} value={parentLast} onChange={e => setParentLast(e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input type="email" required className={`${inputClass} ${bookEmailError ? 'border-red-400 focus:border-red-400' : ''}`} value={bookEmail} onChange={handleBookEmailChange} placeholder="you@example.com" />
                      {bookEmailError && <p className="text-red-500 text-xs mt-1">{bookEmailError}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input type="tel" required className={`${inputClass} ${bookPhoneError ? 'border-red-400 focus:border-red-400' : ''}`} value={bookPhone} onChange={handleBookPhoneChange} placeholder="0400 000 000" maxLength={12} />
                      {bookPhoneError && <p className="text-red-500 text-xs mt-1">{bookPhoneError}</p>}
                    </div>
                  </div>
                  <div><label className={labelClass}>Player's First and Last Name *</label><input required className={inputClass} value={playerName} onChange={e => setPlayerName(e.target.value)} /></div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} className="accent-[#f0722b] mt-1" />
                    <span className="text-sm text-gray-700">I agree to the <Link to="/terms" target="_blank" className="text-[#f0722b] underline hover:text-[#0A1F44]">Terms and Conditions</Link> *</span>
                  </label>
                </div>

                {/* Add-ons */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-lg font-black text-[#0A1F44] mb-1">Add-ons</h3>
                  <p className="text-gray-500 text-sm mb-6">Private Session Deal — Add a private session at a discounted rate ($15 off)</p>
                  <div className="space-y-4">
                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${addon45 ? 'border-[#f0722b] bg-[#f0722b]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addon45} onChange={e => setAddon45(e.target.checked)} className="accent-[#f0722b]" />
                        <span className="text-sm text-[#0A1F44] font-medium">1 x 45-Minute Private Session</span>
                      </div>
                      <span className="text-sm font-bold text-[#f0722b]">+$50</span>
                    </label>
                    <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${addon60 ? 'border-[#f0722b] bg-[#f0722b]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addon60} onChange={e => setAddon60(e.target.checked)} className="accent-[#f0722b]" />
                        <span className="text-sm text-[#0A1F44] font-medium">1 x 1-Hour Private Session</span>
                      </div>
                      <span className="text-sm font-bold text-[#f0722b]">+$60</span>
                    </label>
                  </div>
                </div>

                {bookingError && <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-6 py-4"><AlertCircle className="w-4 h-4 shrink-0" />{bookingError}</div>}

                <button type="submit" disabled={bookingLoading || !termsAgreed} className="w-full bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#0A1F44] transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg">
                  {bookingLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <>Book Now — ${grandTotal} <ChevronRight className="w-5 h-5" /></>}
                </button>
              </form>
            )}
          </div>

          {/* Right Column — Booking Summary (sticky) */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="lg:sticky lg:top-32">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#0A1F44] px-6 py-5">
                  <h3 className="text-white font-barlow font-bold tracking-widest uppercase text-sm">Booking Summary</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <p className="text-xs text-gray-400 font-barlow tracking-widest uppercase mb-1">Program</p>
                    <p className="font-bold text-[#0A1F44]">{classData.title}</p>
                    <p className="text-sm text-gray-500">{classData.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">{getTermStatus(classData.dateRange) === 'started' ? 'Started' : 'Starts'} {classData.startedDate} • {classData.location}</p>
                  </div>
                  <div className="border-t border-gray-100" />
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{classData.title}</span>
                      <span className="font-bold text-[#0A1F44]">${classData.price}</span>
                    </div>
                    {addon45 && <div className="flex justify-between text-sm"><span className="text-gray-600">45-min Private Session</span><span className="font-bold text-[#f0722b]">+$50</span></div>}
                    {addon60 && <div className="flex justify-between text-sm"><span className="text-gray-600">1-hr Private Session</span><span className="font-bold text-[#f0722b]">+$60</span></div>}
                  </div>
                  <div className="border-t border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="font-barlow font-bold tracking-widest uppercase text-sm text-[#0A1F44]">Total</span>
                    <span className="text-2xl font-black text-[#0A1F44]">${grandTotal}</span>
                  </div>
                  {spotsRemaining !== null && (
                    <p className={`text-xs text-center font-bold ${spotsRemaining <= 5 ? 'text-red-500' : 'text-amber-500'}`}>
                      {spotsRemaining} spot{spotsRemaining !== 1 ? 's' : ''} remaining
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
