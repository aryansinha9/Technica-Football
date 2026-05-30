import PageHero from '../components/PageHero';
import { useState } from 'react';
import { ChevronRight, Send, Clock, MapPin, DollarSign, CalendarCheck, Loader2 } from 'lucide-react';
import { useProgramPage } from '../lib/useSiteContent';
import { Link } from 'react-router';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] bg-white text-sm';
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase';

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}

const enrollSteps = [
  'View available Club Technical Training sessions for your age group and select the appropriate program.',
  'Complete registration form and payment.',
  'View confirmation and session information document.',
];

export default function ClubTechnikaTrainingPage() {
  const { page } = useProgramPage('club-technica-training');

  const [formData, setFormData] = useState({
    playerName: '',
    playerAge: '',
    parentName: '',
    email: '',
    phone: '',
    currentClub: '',
    message: '',
  });
  const [phoneRaw, setPhoneRaw] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneRaw(raw);
    const formatted = formatPhone(raw);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (raw.length > 0 && raw.length < 10) {
      setPhoneError('Please enter a valid 10-digit Australian mobile number (e.g. 0400 123 456)');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, email: val }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !emailRegex.test(val)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneError || emailError) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ad2c357f-8850-4467-815d-a15aea89f373',
          subject: 'Club Technical Training Enquiry — Technica Football',
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) setSubmitted(true);
      else setError('Something went wrong. Please try again.');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHero title="Club Technical Training" subtitle="Technical Development Sessions" bottomColor="#f3f4f6" />

      {/* ─── About the Program ─── */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-35 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">ABOUT THE PROGRAM</h2>
          <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
            {page?.about_text || `Our Club Technical Training program is designed for players looking for additional technical training throughout the winter season. This program provides players an extra opportunity alongside their regular club training to further develop their individual skills in a professional, high-intensity/repetition-focused environment. Sessions will center on improving core technical areas required in the modern game such as first touch, dribbling and passing.`}
          </p>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section className="relative bg-white text-[#0A1F44] pt-20 pb-50 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">{page?.card1_title || 'Technical Development'}</h3>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                {page?.card1_text || 'Sessions focused on improving core technical areas required in the modern game — first touch, dribbling and passing in high-intensity, repetition-based drills.'}
              </p>
            </div>
          </div>
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">{page?.card2_title || 'Professional Learning Environment'}</h3>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                {page?.card2_text || 'A structured, professional training environment that complements your regular club sessions — providing the extra edge to develop your individual skills.'}
              </p>
            </div>
          </div>
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">Long-Term Development</h3>
              <p className="text-white/85 leading-relaxed">
                Consistent technical training throughout the winter season builds a stronger foundation — helping players carry improved skills into their club matches each week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Program Information ─── */}
      <section className="relative bg-[#0A1F44] text-white pt-24 pb-50 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#0A1F44" fillOpacity="1" d="M0,260L480,240L960,265L1440,245L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-wide mb-3">PROGRAM INFORMATION</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <CalendarCheck className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Duration</p>
                  <p className="text-white/80">Throughout the winter football season</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Session Length</p>
                  <p className="text-white/80">45 min – 1 hour</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Location</p>
                  <p className="text-white/80">Club's grounds</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Cost</p>
                  <p className="text-white/80">TBA</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div>
                <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-4">Enrolling Procedure</p>
                <ol className="text-white/80 space-y-3">
                  {enrollSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-[#f0722b] text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Enquiry Form ─── */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-36 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,255L480,240L960,260L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">CLUB TRAINING ENQUIRY</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-4" />
            <p className="text-gray-600">Interested in Club Technical Training? Fill in the form and we'll be in touch.</p>
          </div>
          {submitted ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-[#0A1F44]">Enquiry Sent!</h3>
              <p className="text-gray-600">Thank you — we'll get back to you with session availability soon.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ playerName: '', playerAge: '', parentName: '', email: '', phone: '', currentClub: '', message: '' }); setPhoneRaw(''); }}
                className="mt-6 text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-sm hover:underline"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Player's Name *</label>
                  <input name="playerName" type="text" required value={formData.playerName} onChange={handleChange} placeholder="Full name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Player's Age *</label>
                  <input name="playerAge" type="number" required min="4" max="18" value={formData.playerAge} onChange={handleChange} placeholder="e.g. 10" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Parent / Guardian Name *</label>
                <input name="parentName" type="text" required value={formData.parentName} onChange={handleChange} placeholder="Full name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleEmailChange}
                  className={`${inputClass} ${emailError ? 'border-red-400 focus:border-red-400' : ''}`}
                  placeholder="you@example.com"
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`${inputClass} ${phoneError ? 'border-red-400 focus:border-red-400' : ''}`}
                  placeholder="0400 000 000"
                  maxLength={12}
                />
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
              </div>
              <div>
                <label className={labelClass}>Current Club / Team *</label>
                <input name="currentClub" type="text" required value={formData.currentClub} onChange={handleChange} placeholder="e.g. The Ponds FC" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Message <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Any specific sessions or age groups you're interested in..." />
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={isLoading || !!phoneError || !!emailError}
                className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting…' : <><span>Submit Enquiry</span><ChevronRight className="w-5 h-5" /></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
