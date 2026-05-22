import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import TiltedCard from '../../components/TiltedCard';
import ExploreButton from '../components/ExploreButton';
import FillSweepButton from '../components/FillSweepButton';
import { useTestimonials, usePrograms, useSponsors } from '../lib/useSiteContent';

export default function HomePage() {
  const { testimonials } = useTestimonials();
  const { programs } = usePrograms(true);
  const { sponsors } = useSponsors();
  const [_activeSlide, setActiveSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [activeProgramIndex, setActiveProgramIndex] = useState(0);
  const programsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const fadeEnd = window.innerHeight * 0.6;
      setButtonOpacity(Math.max(0, 1 - window.scrollY / fadeEnd));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchTo = (next: number) => {
    setFading(true);
    setTimeout(() => {
      setTestimonialIndex(next);
      setFading(false);
    }, 250);
  };

  const prevTestimonial = () => switchTo((testimonialIndex - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => switchTo((testimonialIndex + 1) % testimonials.length);

  const scrollPrograms = (direction: 'left' | 'right') => {
    if (programsScrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      programsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleProgramScroll = () => {
    if (!programsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = programsScrollRef.current;
    if (scrollLeft === 0) {
      setActiveProgramIndex(0);
      return;
    }
    const maxScroll = scrollWidth - clientWidth;
    const progress = Math.min(1, Math.max(0, scrollLeft / maxScroll));
    const index = Math.round(progress * 5);
    setActiveProgramIndex(index);
  };

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative h-[85vh] overflow-hidden">
        {/* Session photo background */}
        <div className="absolute inset-0 z-0">
          <img src="/Term-Program.JPG" alt="Training session" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#010f22]/85 via-[#021d40]/75 to-[#0d2a55]/60" />
        </div>

        {/* Charcoal Top Bar */}
        <div className="absolute top-0 inset-x-0 h-[140px] md:h-[180px] bg-[#21211f] z-20">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[99%] pointer-events-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1440 70" preserveAspectRatio="none" className="block w-full h-[25px] md:h-[40px] lg:h-[55px]">
              <path fill="#21211f" fillOpacity="1" d="M0,224L480,288L960,224L1440,288L1440,0L0,0Z" />
            </svg>
          </div>
        </div>

        {/* Full TECHNICA text — centred, no split trick */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <h1 className="text-[13vw] sm:text-[110px] md:text-[200px] lg:text-[290px] font-black leading-none tracking-tighter text-white/90 whitespace-nowrap select-none -mt-16 md:-mt-24">
            TECHNICA
          </h1>
        </div>

        {/* Orange accent gradient bottom-right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#f38221]/40 to-transparent z-10 pointer-events-none" />

        {/* Explore Programs CTA — bottom-left, fades on scroll */}
        <div
          className="absolute z-[60] hidden sm:block"
          style={{
            bottom: '140px',
            left: '60px',
            opacity: buttonOpacity,
            pointerEvents: buttonOpacity < 0.05 ? 'none' : 'auto',
            transition: 'opacity 0.1s linear',
          }}
        >
          <ExploreButton href="/programs" label="Explore Programs" isExternal={false} />
        </div>

        {/* Gray bottom band + wave */}
        <div className="absolute bottom-0 left-0 w-full h-[60px] md:h-[100px] bg-[#f3f4f6] z-[45] pointer-events-none" />
        <div className="absolute bottom-[59px] md:bottom-[99px] left-0 w-full z-[45] pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 130 1440 190" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[65px] lg:h-[90px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,160L470,130L960,160L1440,224L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
      </section>

      {/* ─── 1. Leading the Development Section ─── */}
      <section className="relative z-[45] bg-[#f3f4f6] pt-0 pb-20 px-8 md:px-16 text-center text-[#0A1F44]">
        <div className="max-w-4xl mx-auto transform -translate-y-[10px] md:-translate-y-[20px]">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-wide text-[#0A1F44]">
            LEADING THE DEVELOPMENT IN FORMING TECHNICAL FOOTBALL PLAYERS
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            We build players on a foundation of technical mastery, developing them to excel on the pitch in all areas of skill, intelligence, and discipline. Each session is designed to challenge, inspire, and prepare players for the next level of their game.
          </p>
        </div>
      </section>

      {/* ─── 2. Slim Highlight Bar ─── */}
      <section className="relative z-[45] bg-white text-black pt-10 pb-10 px-8 md:px-16">
        {/* White wave jutting UP into Gray */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 transform translate-y-4">
          <div className="flex items-center gap-6">
            <img src="/LOCAL-BUSINESS.png" alt="Local Business Award" className="h-24 md:h-28 w-auto object-contain" />
            <p className="font-bold text-xl md:text-2xl font-barlow uppercase tracking-wider">"Voted 'Best New Business 2024'"</p>
          </div>
          <div className="flex items-center gap-6">
            <img src="/ACTIVE-KIDS.png" alt="Active Kids Vouchers" className="h-24 md:h-28 w-auto object-contain" />
            <p className="font-semibold text-gray-600 font-barlow uppercase text-xl md:text-2xl tracking-wide">We accept Active Kids vouchers</p>
          </div>
        </div>
      </section>

      {/* ─── 3. Our Programs ─── */}
      <section className="relative z-30 bg-[#21211f] text-white pt-20 pb-24 px-8 md:px-16">
        {/* Top Wave (White dripping into Charcoal) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 320 1440 110" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,430L300,360L750,400L1440,340L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>

        {/* Scroll Buttons (Desktop only) positioned relative to the full-width section */}
        <button
          onClick={() => scrollPrograms('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm text-white rounded-full items-center justify-center hover:bg-white/20 transition-colors shadow-lg z-30 border border-white/10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={() => scrollPrograms('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm text-white rounded-full items-center justify-center hover:bg-white/20 transition-colors shadow-lg z-30 border border-white/10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="max-w-7xl mx-auto relative">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-white">OUR PROGRAMS</h2>

          <div
            ref={programsScrollRef}
            onScroll={handleProgramScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {programs.map(program => {
              const programImages: Record<string, string> = {
                'term-program': '/Term-Program.JPG',
                'holiday-clinic': '/Holiday.JPG',
                'individual-sessions': '/INdividual.JPG',
                'academy-development-squad': '/AcademyDev.JPG',
                'club-technica-training': '/ClubTech.JPG',
              };
              const imgSrc = programImages[program.id];
              return (
              <div key={program.id} className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer border border-gray-100">
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  {imgSrc ? (
                    <img src={imgSrc} alt={program.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-base tracking-widest uppercase font-barlow">Photo Coming Soon</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300" />
                </div>
                <div className="p-8">
                  <div className="text-sm uppercase text-orange-500 font-bold mb-1 tracking-widest font-barlow">{program.label}</div>
                  <div className="text-xs uppercase text-gray-400 font-barlow tracking-widest mb-3">{program.ages}</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#0A1F44]">{program.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{program.description}</p>
                  <Link to={program.href} className="text-orange-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all font-barlow tracking-widest text-lg">
                    LEARN MORE <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center gap-3 mt-8">
            {programs.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === activeProgramIndex ? 'w-10 bg-orange-500' : 'w-4 bg-gray-500/50'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Testimonials ─── */}
      {/* Section itself uses fixed padding — content area has min-h to prevent height shifts */}
      <section className="relative z-40 bg-[#f0722b] text-white pt-20 pb-24 px-16 md:px-24 lg:px-32 text-center">
        {/* Orange wave jutting UP into Charcoal (Zigzag) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f0722b" fillOpacity="1" d="M0,260L350,220L750,280L1100,210L1440,270L1440,320L0,320Z" />
          </svg>
        </div>

        {/* Prev button — far left edge */}
        <button
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white text-[#f0722b] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-xl z-30"
        >
          <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        {/* Next button — far right edge */}
        <button
          onClick={nextTestimonial}
          aria-label="Next testimonial"
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white text-[#f0722b] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-xl z-30"
        >
          <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-wide">TESTIMONIALS</h2>

          {/*
            Fixed-height content area — tall enough for the longest quote (Attrayee).
            Switching to the shorter quote (Vera) won't collapse this space, so the
            section never resizes on navigation.
          */}
          <div className="min-h-[260px] md:min-h-[200px] flex flex-col justify-center items-center">
            <div
              className="transition-opacity duration-[250ms] ease-in-out w-full"
              style={{ opacity: fading ? 0 : 1 }}
            >
              {testimonials.length > 0 && (
                <>
                  <p className="text-lg md:text-xl text-white/95 leading-relaxed font-light mb-8 max-w-3xl mx-auto">
                    "{testimonials[testimonialIndex]?.quote}"
                  </p>
                  <div>
                    <p className="font-black text-2xl md:text-3xl tracking-wide text-white mb-1">
                      {testimonials[testimonialIndex]?.name}
                    </p>
                    <p className="font-barlow font-bold tracking-widest uppercase text-white/70 text-sm">
                      {testimonials[testimonialIndex]?.location}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === testimonialIndex ? 'w-10 h-2 bg-white' : 'w-4 h-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Core Focus ─── */}
      <section className="relative z-50 bg-[#0A1F44] text-white pt-16 pb-20">
        {/* Grey wave jutting UP into Navy */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#0A1F44" fillOpacity="1" d="M0,260L350,220L750,280L1100,210L1440,270L1440,320L0,320Z" />
          </svg>
        </div>

        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
          }
          .tactical-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
            background-size: 40px 40px;
          }
          .pitch-line {
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
            height: 1px;
            width: 100%;
          }
          .focus-card {
            transition: all 400ms ease;
            cursor: pointer;
          }
          .focus-card:hover {
            transform: scale(1.03);
            border-color: rgba(240,114,43,0.5) !important;
            background-color: rgba(255,255,255,0.1) !important;
          }
        `}</style>
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 tactical-bg opacity-30"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <svg className="w-full h-full" fill="none" viewBox="0 0 400 800" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100L400 300M400 500L100 750M50 50L350 50" stroke="#3b6cb5" strokeWidth="0.8"></path>
              <circle cx="200" cy="400" r="150" stroke="#3b6cb5" strokeWidth="0.8"></circle>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
          <div>
            {/* CORE FOCUS SECTION */}
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl md:text-3xl font-barlow font-black tracking-widest uppercase text-[#f0722b] whitespace-nowrap">OUR CORE FOCUS</h2>
                <div className="pitch-line"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Touch */}
                <div className="focus-card bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center group hover:border-[#f0722b]/50 hover:bg-white/10 transition-all duration-300 rounded-lg">
                  <div className="mb-6 flex justify-center items-center h-[100px]">
                    <span className="material-symbols-outlined text-[#f0722b] leading-none" style={{ fontSize: '100px' }}>sports_soccer</span>
                  </div>
                  <h3 className="font-barlow text-2xl md:text-3xl font-black uppercase mb-4 tracking-widest">TOUCH</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Mastering the initial contact to kill momentum and prepare the next tactical move instantly.</p>
                </div>
                {/* Dribbling */}
                <div className="focus-card bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center group hover:border-[#f0722b]/50 hover:bg-white/10 transition-all duration-300 rounded-lg">
                  <div className="mb-6 flex justify-center items-center h-[100px]">
                    <span className="material-symbols-outlined text-[#f0722b] leading-none" style={{ fontSize: '100px' }}>conversion_path</span>
                  </div>
                  <h3 className="font-barlow text-2xl md:text-3xl font-black uppercase mb-4 tracking-widest">DRIBBLING</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Technical ball mastery combined with explosive changes of direction to bypass defensive lines.</p>
                </div>
                {/* Passing */}
                <div className="focus-card bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center group hover:border-[#f0722b]/50 hover:bg-white/10 transition-all duration-300 rounded-lg">
                  <div className="mb-6 flex justify-center items-center h-[100px]">
                    <span className="material-symbols-outlined text-[#f0722b] leading-none" style={{ fontSize: '100px' }}>trending_flat</span>
                  </div>
                  <h3 className="font-barlow text-2xl md:text-3xl font-black uppercase mb-4 tracking-widest">PASSING</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Weight, timing, and trajectory. Developing the ability to break lines with surgical precision.</p>
                </div>
              </div>
            </div>

            {/* SUPPORTING FACTORS SECTION */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl md:text-3xl font-barlow font-black tracking-widest uppercase text-[#f0722b] whitespace-nowrap">SUPPORTING FACTORS</h2>
                <div className="pitch-line"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Communication */}
                <div className="focus-card border border-white/5 bg-transparent p-8 hover:bg-white/5 transition-all duration-300 rounded-lg">
                  <div className="mb-4 flex justify-center items-center h-[70px]">
                    <span className="material-symbols-outlined text-white/50 leading-none" style={{ fontSize: '70px' }}>record_voice_over</span>
                  </div>
                  <h4 className="font-barlow text-xl font-bold uppercase mb-3 tracking-wider">COMMUNICATION</h4>
                  <p className="text-white/70 text-sm leading-relaxed">Verbal and non-verbal cues that sync the unit during high-intensity transition phases.</p>
                </div>
                {/* Scanning */}
                <div className="focus-card border border-white/5 bg-transparent p-8 hover:bg-white/5 transition-all duration-300 rounded-lg">
                  <div className="mb-4 flex justify-center items-center h-[70px]">
                    <span className="material-symbols-outlined text-white/50 leading-none" style={{ fontSize: '70px' }}>visibility</span>
                  </div>
                  <h4 className="font-barlow text-xl font-bold uppercase mb-3 tracking-wider">SCANNING</h4>
                  <p className="text-white/70 text-sm leading-relaxed">Constant environmental awareness to build a mental map of the pitch before the ball arrives.</p>
                </div>
                {/* Movement */}
                <div className="focus-card border border-white/5 bg-transparent p-8 hover:bg-white/5 transition-all duration-300 rounded-lg">
                  <div className="mb-4 flex justify-center items-center h-[70px]">
                    <span className="material-symbols-outlined text-white/50 leading-none" style={{ fontSize: '70px' }}>directions_run</span>
                  </div>
                  <h4 className="font-barlow text-xl font-bold uppercase mb-3 tracking-wider">MOVEMENT</h4>
                  <p className="text-white/70 text-sm leading-relaxed">Intelligent spacing and decoy runs designed to manipulate opponent structure and create gaps.</p>
                </div>
                {/* Effort */}
                <div className="focus-card border border-white/5 bg-transparent p-8 hover:bg-white/5 transition-all duration-300 rounded-lg">
                  <div className="mb-4 flex justify-center items-center h-[70px]">
                    <span className="material-symbols-outlined text-white/50 leading-none" style={{ fontSize: '70px' }}>bolt</span>
                  </div>
                  <h4 className="font-barlow text-xl font-bold uppercase mb-3 tracking-wider">EFFORT</h4>
                  <p className="text-white/70 text-sm leading-relaxed">The non-negotiable standard of work rate required to execute high-press and recovery tactics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Official Training Kit ─── */}
      <section className="relative z-[60] bg-[#21211f] w-full pt-16 pb-20 px-8 md:px-16 flex flex-col items-center">
        {/* Charcoal wave jutting UP into Blue */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#21211f" fillOpacity="1" d="M0,260L350,220L750,280L1100,210L1440,270L1440,320L0,320Z" />
          </svg>
        </div>
        {/* Heading — now at top */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-barlow font-bold uppercase tracking-widest text-center mb-16">
          <span className="text-white">Official</span>{' '}
          <span className="text-[#f0722b]">Training Kit</span>
        </h2>
        {/* Product image grid — unchanged */}
        <div className="relative w-full max-w-[1800px] mx-auto text-center transition-colors duration-500 rounded-xl overflow-hidden shadow-2xl group border-[8px] border-[#f0722b]">
          <img src="/hf_20260326_025351_984450de-0fd3-4c6d-aa27-e0f859f76c78.jpeg" alt="Official Training Kit" className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 px-4 md:px-12 w-full h-full">
            {[
              { src: '/JEARSY.webp', alt: 'Jersey', href: 'https://deployfootball.com/products/technica-football-training-jersey-youth-unisex-1' },
              { src: '/SHORTS (1).webp', alt: 'Shorts', href: 'https://deployfootball.com/products/technica-football-playing-shorts-youth-unisex' },
              { src: '/LONGSLEEVE (1).webp', alt: 'Long Sleeve', href: 'https://deployfootball.com/products/technica-football-drill-top-unisex-1' },
              { src: '/PANTS.png', alt: 'Pants', href: 'https://deployfootball.com/products/technica-football-drill-pant-unisex' },
            ].map(item => (
              <a
                key={item.alt}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-1/4 max-w-[280px] aspect-[4/5] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-pointer"
                aria-label={`Shop ${item.alt}`}
              >
                <TiltedCard
                  imageSrc={item.src}
                  altText={item.alt}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={false}
                />
              </a>
            ))}
          </div>
        </div>
        {/* Logo — now at bottom */}
        <a
          href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-30 mt-16"
        >
          <img src="/Kit.png" alt="Training Kit Logo" className="h-32 md:h-48 lg:h-64 w-auto object-contain drop-shadow-lg hover:opacity-80 transition-opacity duration-300" />
        </a>
        <a
          href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-10 py-4 rounded-xl hover:bg-white hover:text-[#f0722b] transition-colors duration-300 text-base shadow-lg"
        >
          See All Options <ChevronRight className="w-5 h-5" />
        </a>
      </section>

      {/* ─── 7. Our Partners ─── */}
      <section className="relative z-[70] bg-[#f9fafb] text-[#0A1F44] pt-16 pb-20 px-8 md:px-16 text-center">
        {/* Light Grey wave jutting UP into Charcoal */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f9fafb" fillOpacity="1" d="M0,220L400,290L850,230L1250,280L1440,240L1440,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-24 tracking-wider">OUR PARTNERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-20 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {sponsors.map(sponsor => (
              <a
                key={sponsor.id}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                className="flex items-center justify-center w-72 h-36 hover:scale-105 transition-transform duration-300"
              >
                <img src={sponsor.logo_url} alt={sponsor.name} className="max-h-28 max-w-[260px] w-auto h-auto object-contain" />
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-[#0A1F44]/40 mt-14 font-barlow tracking-wide">
            Want to work with us?{' '}
            <a href="mailto:info@technicafootball.com.au" className="underline hover:text-[#0A1F44]/70 transition-colors">Send us an email</a>{' '}
            to express your interest.
          </p>
        </div>
      </section>
    </>
  );
}
