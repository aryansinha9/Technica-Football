import { ChevronRight, Clock, MapPin, DollarSign, Target, Zap, CalendarCheck, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import { Link } from 'react-router';
import { termClasses } from '../data/termClasses';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const enrollSteps = [
  'Choose a class/day from the schedule below.',
  'Complete the player registration form (for new players only).',
  'Complete the payment process.',
  'View the confirmation email and session information sheet explaining program and session expectations.',
];

export default function TermProgramPage() {
  const [spots, setSpots] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.from('classes').select('id, spots_remaining').then(({ data }) => {
      if (data) {
        const map: Record<string, number> = {};
        data.forEach(r => { map[r.id] = r.spots_remaining; });
        setSpots(map);
      }
    });
  }, []);
  return (
    <>
      <PageHero title="Term Program" subtitle="Weekly Training Sessions" bottomColor="#f3f4f6" />

      {/* Intro */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-35 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">ABOUT THE PROGRAM</h2>
          <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            Our Term Program offers weekly training sessions in an 8-week program designed for ages 4–12 years. This program is designed to develop players' technical abilities, game sense and overall fitness. We aim for players to develop key skills of dribbling, first touch and passing through various individual, group and game-realistic scenarios. It follows a similar structure to the NSW school timetable dates. Available for all ages and abilities with no prior experience required.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative bg-white text-[#0A1F44] pt-20 pb-50 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-48 bg-gradient-to-br from-[#e8621e] to-[#c95315] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent" />
              <Target className="w-20 h-20 text-white/25 group-hover:text-white/40 transition-colors duration-300" />
            </div>
            <div className="p-8">
              <div className="text-white/70 font-barlow font-bold text-sm tracking-widest uppercase mb-2">Ages 4–8</div>
              <h3 className="text-2xl font-black mb-3 text-white">Foundation Class</h3>
              <p className="text-white/85 leading-relaxed">Our foundation classes are designed for players aged 4–8 years. Developing gross motor skills and the fundamental skills of football in a non-competitive, supportive environment.</p>
            </div>
          </div>
          <div className="bg-[#f0722b] rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-48 bg-gradient-to-br from-[#e8621e] to-[#c95315] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent" />
              <Zap className="w-20 h-20 text-white/25 group-hover:text-white/40 transition-colors duration-300" />
            </div>
            <div className="p-8">
              <div className="text-white/70 font-barlow font-bold text-sm tracking-widest uppercase mb-2">Ages 8–12</div>
              <h3 className="text-2xl font-black mb-3 text-white">Elite Class</h3>
              <p className="text-white/85 leading-relaxed">Our elite classes are designed for players aged 8–12 years. Focused on progressing fundamental skills in game-realistic scenarios with more advanced technical and tactical drills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Information */}
      <section className="relative bg-[#0A1F44] text-white pt-10 pb-50 px-8 md:px-16">
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
                  <p className="text-white/80">8 weeks per term.</p>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Session Length</p>
                  <ul className="text-white/80 space-y-1"><li>Foundation — 45 minutes</li><li>Elite — 1 hour</li></ul>
                </div>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-1">Locations</p>
                  <ul className="text-white/80 space-y-1">
                    <li>The Ponds (Fyfe Rd &amp; Carindale St)</li>
                    <li className="text-white/40 text-sm italic">*Sessions will NOT be at Peel Reserve</li>
                    <li>Marsden Park (Term 3)</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-[#f0722b] shrink-0 mt-0.5" />
                <div className="w-full">
                  <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mb-3">Cost</p>
                  <ul className="text-white/80 space-y-2">
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#f0722b] shrink-0" /><span><span className="font-bold text-white">$189</span> — Foundation <span className="text-white/50 text-sm">(Active Kids Accepted)</span></span></li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#f0722b] shrink-0" /><span><span className="font-bold text-white">$209</span> — Elite <span className="text-white/50 text-sm">(Active Kids Accepted)</span></span></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-white/10" />
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

      {/* Term 2 Schedule */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-14 pb-50 px-8 md:px-16">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,255L480,240L960,260L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-3">TERM 2 PROGRAM SCHEDULE</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {termClasses.map((tc) => {
              const s = spots[tc.id] ?? null;
              const spotsColor = s !== null && s <= 5 ? 'text-red-500' : s !== null && s <= 8 ? 'text-amber-500' : 'text-green-500';
              return (
                <div key={tc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300">
                  <div className="bg-[#0A1F44] px-6 py-5">
                    <p className="font-barlow font-bold tracking-widest uppercase text-white text-sm">{tc.subtitle}</p>
                    <p className="text-white/60 text-sm mt-1">{tc.location}</p>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Started {tc.startedDate}</span>
                      {s !== null && (
                        <span className={`text-sm font-bold flex items-center gap-1 ${spotsColor}`}>
                          <Users className="w-3.5 h-3.5" />{s} spot{s !== 1 ? 's' : ''} left
                        </span>
                      )}
                    </div>
                    <div className="text-3xl font-black text-[#0A1F44]">${tc.price}</div>
                    <div className="mt-auto pt-3">
                      <Link
                        to={`/programs/term-program/class/${tc.slug}`}
                        className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-3.5 rounded-xl hover:bg-[#f0722b] transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        Book Now <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
