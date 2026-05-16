import { ChevronRight, Clock, User, Users, Trophy, Sun, Building, LucideIcon } from 'lucide-react';
import PageHero from '../components/PageHero';
import { Link } from 'react-router';
import { usePrograms } from '../lib/useSiteContent';

const IconMap: Record<string, LucideIcon> = {
  Clock,
  User,
  Users,
  Trophy,
  Sun,
  Building,
};

export default function ProgramsPage() {
  const { programs } = usePrograms(true);

  return (
    <>
      <PageHero title="Programs" subtitle="Find Your Fit" bottomColor="#f3f4f6" />

      {/* Programs Grid */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-wide mb-3">OUR PROGRAMS</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
              From our youngest players to teens, we have a program designed to develop every player's game at the right pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = IconMap[program.icon] || Clock;
              return (
                <div
                  key={program.title}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Card image area */}
                  <div className="relative h-48 bg-gradient-to-br from-[#0A1F44] to-[#021d40] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#f0722b]/20 to-transparent" />
                    <Icon className="w-16 h-16 text-white/20 group-hover:text-white/30 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#f0722b] text-white font-barlow font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-lg">
                        {program.label}
                      </span>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="text-orange-500 font-barlow font-bold text-sm tracking-widest uppercase mb-2">{program.ages}</div>
                    <h3 className="text-2xl font-black mb-3 text-[#0A1F44] group-hover:text-[#f0722b] transition-colors">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm flex-1">{program.description}</p>
              <Link
                to={program.href}
                className="mt-auto w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-3.5 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Kids Strip */}
      <section className="relative bg-white pt-20 pb-28 px-8 md:px-16">
        {/* White wave UP into grey */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,245L480,265L960,248L1440,260L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <img src="/ACTIVE-KIDS.png" alt="Active Kids Provider" className="h-24 md:h-28 w-auto object-contain" />
            <div>
              <p className="font-barlow font-bold text-xl md:text-2xl uppercase tracking-wide text-[#0A1F44]">We Accept Active Kids Vouchers</p>
              <p className="text-gray-600 mt-1">Registered provider — use your voucher towards any program.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <img src="/LOCAL-BUSINESS.png" alt="Best New Business 2024" className="h-24 md:h-28 w-auto object-contain" />
            <p className="font-barlow font-bold text-xl md:text-2xl uppercase tracking-wide text-[#0A1F44]">"Voted Best New Business 2024"</p>
          </div>
        </div>
      </section>
    </>
  );
}
