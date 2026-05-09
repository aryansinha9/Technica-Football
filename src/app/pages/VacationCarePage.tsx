import { useState } from 'react';
import { ChevronRight, Send, Target, Shield, Clock, MapPin, Users, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useProgramPage } from '../lib/useSiteContent';

const sessionStructure = [
  'Introduction + Warm-Up Games',
  'Session 1 — Skills + Game Based Activities',
  'Session 2 — Skills + Game Based Activities',
  'Mini Tournament',
  'Closing Ceremony + Awards',
];

export default function VacationCarePage() {
  const { page, loading } = useProgramPage('vacation-care');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    centreName: '',
    centreEmail: '',
    centrePhone: '',
    participants: '',
    datePreference: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ad2c357f-8850-4467-815d-a15aea89f373',
          subject: 'Vacation Care Interest Form — Technica Football',
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
      <PageHero title="Vacation Care" subtitle="OSH & Holiday Programs" bottomColor="#f3f4f6" />

      {/* ─── Intro ─── */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-40 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">ABOUT THE PROGRAM</h2>
          <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
            {page?.about_text || `Our Vacation Care program offers a structured, high-energy incursion for K–6. This program is an excellent opportunity for students to keep active, develop their skills and have fun. Our program includes individual and group activities that focus on developing the core skills of football (dribbling, passing and touch). Delivered in a safe and supportive sporting environment where children can develop physically, socially and mentally. Available for all ages and abilities with no prior experience required.`}
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
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Development */}
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-48 bg-gradient-to-br from-[#e8621e] to-[#c95315] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent" />
              <Target className="w-20 h-20 text-white/25 group-hover:text-white/40 transition-colors duration-300" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">{page?.card1_title || 'Technical Development'}</h3>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                {page?.card1_text || 'We focus on developing the key football skills that create a technical player — passing, dribbling, touch, defending and shooting through individual and group activities.'}
              </p>
            </div>
          </div>

          {/* Supportive Environment */}
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-48 bg-gradient-to-br from-[#e8621e] to-[#c95315] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent" />
              <Shield className="w-20 h-20 text-white/25 group-hover:text-white/40 transition-colors duration-300" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">{page?.card2_title || 'Supportive Environment'}</h3>
              <p className="text-white/85 leading-relaxed whitespace-pre-wrap">
                {page?.card2_text || 'Experienced coaches trained to provide positive reinforcement and encouragement — ensuring everyone is comfortable and having fun throughout every session.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Program Information ─── */}
      <section className="relative bg-[#0A1F44] text-white pt-15 pb-50 px-8 md:px-16">
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

            {/* Left: Logistics */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">{page?.info_sections?.[0]?.label || 'Program Duration'}</p>
                  <p className="text-white/80 whitespace-pre-wrap">{page?.info_sections?.[0]?.value || 'Once-off incursions for Vacation Care centres during school holidays.'}</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">{page?.info_sections?.[1]?.label || 'Session Length'}</p>
                  <p className="text-white/80 whitespace-pre-wrap">{page?.info_sections?.[1]?.value || '1.5 – 2 hours.'}</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">{page?.info_sections?.[2]?.label || 'Location'}</p>
                  <div className="text-white/80 space-y-1 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: page?.info_sections?.[2]?.value.replace(/\n/g, '<br/>') || 'On school / centre grounds.' }} />
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">{page?.info_sections?.[3]?.label || 'Cost'}</p>
                  <p className="text-white/80 whitespace-pre-wrap">{page?.info_sections?.[3]?.value || 'Determined based on number of participants and program type.'}</p>
                </div>
              </div>
            </div>

            {/* Right: Session Structure */}
            <div>
              <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-6">Session Structure</p>
              <ol className="space-y-4">
                {sessionStructure.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#f0722b] text-white text-sm font-black flex items-center justify-center">{i + 1}</span>
                    <span className="text-white/80 leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-2">Enrolling Procedure</p>
                <p className="text-white/80 leading-relaxed">Complete the interest form below and we'll respond within 24–48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interest Form ─── */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-36 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,255L480,240L960,260L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">VACATION CARE INTEREST FORM</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-4" />
            <p className="text-gray-600">Please complete the interest form to secure a spot for our Vacation Care Program.</p>
          </div>

          {/* Program type info strip */}
          <div className="bg-[#0A1F44] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="shrink-0">
              <span className="bg-[#f0722b] text-white font-barlow font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-lg">Type of Program</span>
            </div>
            <div className="text-white/80 text-sm">
              <span className="font-bold text-white">Vacation Care</span> — 1.5 hour session &nbsp;·&nbsp; <span className="font-bold text-white">Duration:</span> Once-Off
            </div>
          </div>

          {submitted ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-[#0A1F44]">Interest Submitted!</h3>
              <p className="text-gray-600">Thank you — we'll be in touch within 24–48 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', centreName: '', centreEmail: '', centrePhone: '', participants: '', datePreference: '' }); }}
                className="mt-6 text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-sm hover:underline"
              >
                Submit Another Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Applicant First Name *</label>
                  <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} placeholder="First name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Applicant Last Name *</label>
                  <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} placeholder="Last name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
              </div>

              {/* Centre Name */}
              <div>
                <label htmlFor="centreName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Centre Name *</label>
                <input id="centreName" name="centreName" type="text" required value={formData.centreName} onChange={handleChange} placeholder="Name and location of centre" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
              </div>

              {/* Centre Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="centreEmail" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Centre Email *</label>
                  <input id="centreEmail" name="centreEmail" type="email" required value={formData.centreEmail} onChange={handleChange} placeholder="centre@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
                <div>
                  <label htmlFor="centrePhone" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Centre Contact Number *</label>
                  <input id="centrePhone" name="centrePhone" type="tel" required value={formData.centrePhone} onChange={handleChange} placeholder="02xx xxxx xxxx" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
              </div>

              {/* Participants */}
              <div>
                <label htmlFor="participants" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Number of Participants *</label>
                <input id="participants" name="participants" type="number" min="1" required value={formData.participants} onChange={handleChange} placeholder="e.g. 25" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
              </div>

              {/* Date Preference */}
              <div>
                <label htmlFor="datePreference" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Date / Time Preference *</label>
                <input id="datePreference" name="datePreference" type="text" required value={formData.datePreference} onChange={handleChange} placeholder="e.g. Thursday 2PM" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button type="submit" disabled={isLoading} className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                {isLoading ? 'Submitting…' : <><span>Submit Interest</span><ChevronRight className="w-5 h-5" /></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
