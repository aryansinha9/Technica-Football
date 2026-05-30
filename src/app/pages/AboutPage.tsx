import { ShieldCheck, Camera } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useCoaches } from '../lib/useSiteContent';

export default function AboutPage() {
  const { coaches } = useCoaches();
  return (
    <>
      <PageHero title="About Us" subtitle="Our Story & Team" bottomColor="#f3f4f6" />

      {/* Mission Section */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-8 md:pt-12 pb-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-wide mb-3">ABOUT TECHNICA FOOTBALL</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-3/4 mx-auto" />
          </div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-light">
            Technica Football was developed to create an opportunity for player development, both technically and mentally, through structured football programs for youth players.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light">
            At Technica Football, we offer a diverse range of programs tailored to each player's needs. Our goal is to provide the highest level of coaching through carefully designed technical programs. Each program is built to develop all aspects of a player's game, including technical skills, game awareness, growth mindset, and physical development.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            We focus on producing technical players, with emphasis on touch, passing, communication, and accuracy.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="relative bg-[#21211f] text-white pt-4 md:pt-12 pb-28 px-8 md:px-16">
        {/* Charcoal wave jutting UP into grey */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#21211f" fillOpacity="1" d="M0,260L480,240L960,265L1440,245L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-wider mb-3 text-white">MEET THE TEAM</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 justify-items-center">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group flex flex-col"
              >
                {/* Photo area */}
                <div className="w-full aspect-square bg-white/5 flex flex-col items-center justify-center border-b border-white/10 group-hover:bg-white/10 transition-colors overflow-hidden shrink-0">
                  {coach.image_url ? (
                    <img src={coach.image_url} alt={coach.name} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera className="w-14 h-14 text-white/20 mb-3" />
                      <span className="font-barlow text-xs tracking-widest uppercase text-white/25">Photo Coming Soon</span>
                    </>
                  )}
                </div>
                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="text-orange-500 font-barlow font-bold text-sm tracking-widest uppercase mb-1">{coach.role}</div>
                  <h3 className="text-2xl font-black mb-3 text-white">{coach.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-5 flex-1 tracking-normal">{coach.bio}</p>
                  {coach.team && (
                    <div className="flex items-center gap-2 text-sm mt-auto pt-4 border-t border-white/10">
                      <span className="text-white/40 font-barlow tracking-widest uppercase text-xs">Favourite Team:</span>
                      <span className="text-white/80 font-semibold">{coach.team}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative bg-[#0A1F44] text-white pt-4 md:pt-12 pb-32 px-8 md:px-16">
        {/* Navy wave jutting UP into charcoal */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#0A1F44" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-wide mb-3">OUR VALUES &amp; PROMISE</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-3/4 mx-auto" />
          </div>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-light">
            Technica Football takes pride in how we deliver our programs, ensuring the highest level of learning for every player. Each program is carefully designed for specific age groups to maximise skill development and overall player growth.
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-light">
            We focus on the core technical foundations of football — first touch, dribbling, and passing — making these a key emphasis in all training sessions. Our programs are tailored to be age-appropriate, with suitable equipment and structured activities that support each player’s development based on their size and ability.
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-light">
            All training activities are purposeful and aligned with the needs of each age group, helping players perform and improve both in training and in matches.
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
            Above all, we place a strong emphasis on respect. We believe that without respect, there is no football. We actively demonstrate respect, patience, and active listening, encouraging players to reflect these values both on and off the field. We maintain zero tolerance for any form of disrespectful behaviour, actions, or language.
          </p>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="relative bg-[#f0722b] text-white pt-0 pb-8 px-8 md:px-16">
        {/* Orange wave jutting UP into navy */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f0722b" fillOpacity="1" d="M0,200L450,280L900,220L1440,300L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-2 text-center -mt-2 md:-mt-6 relative z-20">
          <ShieldCheck className="w-10 h-10 shrink-0 mb-1" />
          <p className="font-barlow font-bold text-lg md:text-xl lg:text-2xl tracking-wide uppercase leading-tight">
            All coaches hold WWCC, First Aid, CPR, Anaphylaxis, and Child Protection certifications.
          </p>
        </div>
      </section>

      {/* Footer wave prep — orange to footer dark navy */}
      <div className="bg-[#f0722b] h-14" />
    </>
  );
}
