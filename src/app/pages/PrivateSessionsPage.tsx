import { useState } from 'react';
import { ChevronRight, Send, Target, Sliders, Clock, MapPin, DollarSign } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function PrivateSessionsPage() {
  const [formData, setFormData] = useState({
    playerFirstName: '',
    playerLastName: '',
    playerAge: '',
    location: '',
    experience: '',
    trainingFocus: '',
    availability: '',
    parentName: '',
    phone: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero title="Private Sessions" subtitle="Individual Coaching" bottomColor="#f3f4f6" />

      {/* ─── Intro ─── */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">ABOUT THE PROGRAM</h2>
          <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            Our individual sessions are primarily focused on the player — we work directly on what the player wants to
            achieve. We discuss areas that challenge the player and where they want to improve in the game. All our
            sessions involve ball mastery, perfecting the fundamental skills of the game (first touch, dribbling and
            passing) assisted with strength and conditioning training. Specialised training for all positions including
            wingers, strikers, defenders and mid-fielders, with drills and activities to accompany their position.
          </p>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section className="relative bg-white text-[#0A1F44] pt-20 pb-28 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0A1F44] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-48 bg-gradient-to-br from-[#0d2a5e] to-[#021d40] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f0722b]/20 to-transparent" />
              <Target className="w-20 h-20 text-white/15 group-hover:text-white/25 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#f0722b] text-white font-barlow font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-lg">Technical Development</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">Technical Development</h3>
              <p className="text-white/70 leading-relaxed">
                Sessions focused on developing the key football skills that create a technical player — passing,
                dribbling and first touch used in game-realistic scenarios.
              </p>
            </div>
          </div>
          <div className="bg-[#0A1F44] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-48 bg-gradient-to-br from-[#0d2a5e] to-[#021d40] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f0722b]/20 to-transparent" />
              <Sliders className="w-20 h-20 text-white/15 group-hover:text-white/25 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#f0722b] text-white font-barlow font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-lg">Tailored Sessions</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">Tailored Sessions</h3>
              <p className="text-white/70 leading-relaxed">
                Each session is tailored towards the player — aimed to focus on what they want to achieve, areas of
                struggle and position-specific drills that replicate real game scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Program Information ─── */}
      <section className="relative bg-[#0A1F44] text-white pt-24 pb-32 px-8 md:px-16">
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
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#f0722b]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#f0722b]" />
                </div>
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Program Duration</p>
                  <p className="text-white/80">Sessions can be scheduled on a weekly basis.</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#f0722b]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#f0722b]" />
                </div>
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Session Length</p>
                  <p className="text-white/80">45 minutes or 1 hour per session.</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#f0722b]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#f0722b]" />
                </div>
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Locations</p>
                  <ul className="text-white/80 space-y-1">
                    <li>The Ponds (Fyfe Rd)</li>
                    <li>Russell Reserve</li>
                    <li>Hills Centenary</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#f0722b]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#f0722b]" />
                </div>
                <div className="w-full">
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-3">Cost</p>
                  <ul className="text-white/80 space-y-2">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#f0722b] shrink-0" />
                      <span><span className="font-bold text-white">$60</span> — 45-minute session (1 player)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#f0722b] shrink-0" />
                      <span><span className="font-bold text-white">$75</span> — 1-hour session (1 player)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#f0722b] shrink-0" />
                      <span>Bundles for <span className="font-bold text-white">3 or 5 sessions</span> with discounts available</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div>
                <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-4">Enrolling Procedure</p>
                <ol className="text-white/80 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#f0722b] text-white text-xs font-black flex items-center justify-center">1</span>
                    <span>Complete the enquiry form below.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#f0722b] text-white text-xs font-black flex items-center justify-center">2</span>
                    <span>You will be contacted within 24–48 hours with a response to your form details.</span>
                  </li>
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
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">INDIVIDUAL SESSIONS ENQUIRY</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-4" />
            <p className="text-gray-600">Fill in the form and we'll be in touch within 24–48 hours.</p>
          </div>
          {submitted ? (
            <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-[#0A1F44]">Enquiry Sent!</h3>
              <p className="text-gray-600">Thank you — we'll get back to you within 24–48 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ playerFirstName: '', playerLastName: '', playerAge: '', location: '', experience: '', trainingFocus: '', availability: '', parentName: '', phone: '', email: '' }); }}
                className="mt-6 text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-sm hover:underline"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="playerFirstName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Player's First Name *</label>
                  <input id="playerFirstName" name="playerFirstName" type="text" required value={formData.playerFirstName} onChange={handleChange} placeholder="First name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
                <div>
                  <label htmlFor="playerLastName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Player's Last Name *</label>
                  <input id="playerLastName" name="playerLastName" type="text" required value={formData.playerLastName} onChange={handleChange} placeholder="Last name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
              </div>
              <div>
                <label htmlFor="playerAge" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Player's Age *</label>
                <input id="playerAge" name="playerAge" type="text" required value={formData.playerAge} onChange={handleChange} placeholder="e.g. 10" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 font-barlow tracking-wide uppercase">Preferred Location *</label>
                <div className="space-y-3">
                  {[
                    { value: 'the-ponds', label: 'The Ponds – Cardinal St' },
                    { value: 'rouse-hill', label: 'Rouse Hill – Russell Reserve' },
                    { value: 'other', label: 'Other' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="location" value={opt.value} required checked={formData.location === opt.value} onChange={handleChange} className="w-4 h-4 accent-[#f0722b]" />
                      <span className="text-gray-700 group-hover:text-[#0A1F44] transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Player's Experience *</label>
                <textarea id="experience" name="experience" required rows={3} value={formData.experience} onChange={handleChange} placeholder="E.g. 2 years at Blank FC, NPL, or new to the sport" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] resize-none" />
              </div>
              <div>
                <label htmlFor="trainingFocus" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Training Focus *</label>
                <textarea id="trainingFocus" name="trainingFocus" required rows={3} value={formData.trainingFocus} onChange={handleChange} placeholder="E.g. Position Specific (Attacking, Defending), Shooting, Overall Fitness, General Training etc." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] resize-none" />
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Session Availability (Day/s & Time/s) *</label>
                <textarea id="availability" name="availability" required rows={2} value={formData.availability} onChange={handleChange} placeholder="E.g. Tuesday 4:00pm" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] resize-none" />
              </div>
              <div>
                <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Parent's First & Last Name *</label>
                <input id="parentName" name="parentName" type="text" required value={formData.parentName} onChange={handleChange} placeholder="Full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Phone *</label>
                  <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="04xx xxx xxx" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Email *</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 flex items-center justify-center gap-2 text-base">
                Submit Enquiry <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
