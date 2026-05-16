import PageHero from '../components/PageHero';
import { useState } from 'react';
import { ChevronRight, Send, Loader2 } from 'lucide-react';
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

      {/* About Section */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] px-8 md:px-16 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block bg-[#f0722b] text-white font-barlow font-bold text-sm tracking-[0.3em] uppercase px-6 py-3 rounded-xl mb-8 shadow-lg">
            ⚠ Not Yet Available
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-wide mb-3 text-[#0A1F44]">COMING SOON</h2>
          <p className="text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-base mb-8">
            Academy Development Squad
          </p>
          <div className="h-1 bg-[#f0722b] rounded-full w-24 mx-auto mb-10" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mb-4 whitespace-pre-wrap">
            {page?.about_text || `The Academy Development Squad is an elite pathway program for serious players aged 8–16 who are committed to reaching the next level of the game.`}
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            High-performance session details, selection criteria, and booking information will be available soon. Express your interest below and we'll be in touch.
          </p>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="relative bg-[#f3f4f6] px-8 md:px-16 pb-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-2 text-[#0A1F44]">EXPRESS YOUR INTEREST</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mx-auto" />
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
