import { ChevronRight, Clock, MapPin, DollarSign, CalendarCheck, CalendarX } from 'lucide-react';
import PageHero from '../components/PageHero';

const enrollSteps = [
  'Choose a class/day from the selection below.',
  'Complete the player registration form. If a returning player, no re-application needed.',
  'Complete the payment process.',
  'View the confirmation email and session information sheet explaining program and session expectations.',
];

export default function HolidayClinicPage() {
  return (
    <>
      <PageHero title="Holiday Clinic" subtitle="School Holiday Programs" bottomColor="#f3f4f6" />

      {/* Intro */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-16 pb-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">ABOUT THE PROGRAM</h2>
          <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            Our holiday clinic is the perfect way to keep your kids active during the school holidays. Our clinic includes individual and group activities that focus on developing the core skills of football (dribbling, passing and touch). We prioritise creating a safe and supportive sporting environment where children can develop physically, socially and mentally. Available for all ages and abilities with no prior experience required. Don't miss out — spots are limited.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative bg-white text-[#0A1F44] pt-0 pb-35 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">Technical Development</h3>
              <p className="text-white/85 leading-relaxed">We focus on developing the key football skills that create a technical player — passing, dribbling, touch, defending and shooting through individual and group activities.</p>
            </div>
          </div>
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-black mb-3 text-white">Supportive Environment</h3>
              <p className="text-white/85 leading-relaxed">Experienced coaches trained to provide positive reinforcement and encouragement — ensuring everyone is comfortable and having fun throughout every session.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Information */}
      <section className="relative bg-[#0A1F44] text-white pt-0 pb-34 px-8 md:px-16">
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
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Program Duration</p>
                  <p className="text-white/80">2 days each school holidays.</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Session Length</p>
                  <p className="text-white/80">Each day runs for 3 hours.</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Location</p>
                  <p className="text-white/80">Russell Reserve</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Cost</p>
                  <p className="text-white/80"><span className="font-bold text-white">$110</span> per program. Active Kids vouchers accepted.</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-4">
                <CalendarCheck className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
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
        </div>
      </section>

      {/* April Holidays Schedule */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-0 pb-24 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,255L480,240L960,260L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">APRIL HOLIDAYS</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto" />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 md:p-14 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <CalendarX className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-black text-[#0A1F44] mb-3">Nothing to book right now</h3>
            <p className="text-gray-500 leading-relaxed">Check back soon — upcoming holiday clinic dates will appear here when bookings open.</p>
          </div>
        </div>
      </section>
    </>
  );
}
