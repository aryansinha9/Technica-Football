import PageHero from '../components/PageHero';
import { useState } from 'react';
import { ChevronRight, Send, Clock, MapPin, DollarSign, CalendarCheck, Users, Award, Loader2 } from 'lucide-react';
import { useProgramPage } from '../lib/useSiteContent';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] bg-white text-sm';
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase';

function formatPhone(value: string) {
  // Strip non-digits
  const digits = value.replace(/\D/g, '');
  // Format as 04XX XXX XXX
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}

const enrollSteps = [
  'Submit an expression of interest via the enquiry form below.',
  'Players may be invited for assessment and trials.',
  'Successful players will receive academy program information and procedures.',
];

export default function AcademyDevelopmentPage() {
  const { page } = useProgramPage('academy-development-squad');

  const [formData, setFormData] = useState({
    playerName: '',
    playerAge: '',
    parentName: '',
    email: '',
    phone: '',
    currentClub: '',
    experience: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          subject: 'Academy Development Squad Enquiry — Technica Football',
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
      <PageHero title="Academy Development Squad" subtitle="Elite Pathway Program" bottomColor="#f3f4f6" />

      {/* ─── About the Program ─── */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-16 pb-28 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">ABOUT THE PROGRAM</h2>
          <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
            {page?.about_text || `Our Academy Development Squad is our advanced development pathway designed for committed players looking to take their football development to the next level in a high-performance training environment. This part-time academy program provides players with weekly training sessions focused on technical mastery, game understanding and long-term growth. Players selected for the Academy Development Squad will train in sessions designed to challenge them technically, mentally and physically in all aspects of the game. Players will have opportunities to represent the academy in Academy specific tournaments and leagues.`}
          </p>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section className="relative bg-white text-[#0A1F44] pt-5 pb-40 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">{page?.card1_title || 'Long-Term Development'}</h3>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                {page?.card1_text || 'A structured, year-long program focused on progressive player development — building technical ability, tactical awareness and physical resilience over time.'}
              </p>
            </div>
          </div>
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">{page?.card2_title || 'Advanced Learning Environment'}</h3>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                {page?.card2_text || 'A high-performance training environment designed to challenge players technically, mentally and physically — pushing them beyond their comfort zone.'}
              </p>
            </div>
          </div>
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">Pathway Opportunities</h3>
              <p className="text-white/85 leading-relaxed">
                Opportunities to represent the academy in high tier tournaments, cups and leagues — providing players with real competitive exposure and experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Program Information ─── */}
      <section className="relative bg-[#0A1F44] text-white pt-10 pb-38 px-8 md:px-16">
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
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Program Duration</p>
                  <p className="text-white/80">Year long</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Training Frequency</p>
                  <p className="text-white/80">2 sessions per week</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Selection Process</p>
                  <p className="text-white/80">Invitation, Trial or Assessment</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Program Cost</p>
                  <p className="text-white/80">Provided to successful applicants</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Locations</p>
                  <p className="text-white/80">TBA</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Additional Opportunities</p>
                  <p className="text-white/80">Academy Leagues, Tours and Tournaments</p>
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

      {/* ─── Expression of Interest Form ─── */}
      <section className="relative bg-[#f3f4f6] px-8 md:px-16 pt-10 pb-32">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,255L480,240L960,260L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-2 text-[#0A1F44]">EXPRESS YOUR INTEREST</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mx-auto mb-4" />
            <p className="text-gray-600">Fill in the form below and we'll be in touch.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-10 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-[#0A1F44]">Enquiry Sent!</h3>
              <p className="text-gray-600">Thank you for your interest in the Academy Development Squad. We'll be in touch soon.</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ playerName: '', playerAge: '', parentName: '', email: '', phone: '', currentClub: '', experience: '', message: '' });
                  setPhoneRaw('');
                }}
                className="mt-6 text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-sm hover:underline"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Player's Name *</label>
                  <input
                    name="playerName"
                    type="text"
                    required
                    value={formData.playerName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Player's Age *</label>
                  <input
                    name="playerAge"
                    type="number"
                    required
                    min="8"
                    max="18"
                    value={formData.playerAge}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. 12"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Parent / Guardian Name *</label>
                <input
                  name="parentName"
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Full name"
                />
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
                <label className={labelClass}>Current Club / Team <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                <input
                  name="currentClub"
                  type="text"
                  value={formData.currentClub}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. The Ponds FC"
                />
              </div>

              <div>
                <label className={labelClass}>Playing Experience *</label>
                <input
                  name="experience"
                  type="text"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 3 years, NPL, representative, etc."
                />
              </div>

              <div>
                <label className={labelClass}>Message <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your player's goals or any questions you have..."
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={isLoading || !!phoneError || !!emailError}
                className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending…' : <><span>Submit Enquiry</span><ChevronRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
