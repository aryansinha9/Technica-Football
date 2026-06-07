import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import TiltedCard from '../../components/TiltedCard';
import ExploreButton from '../components/ExploreButton';
import AnimatedCTA from '../components/AnimatedCTA';
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
      <section className="relative h-[90vh] overflow-hidden">
        {/* Session photo background */}
        <div className="absolute inset-0 z-0">
          <img src="/Term-Program.JPG" alt="Training session" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#010f22]/85 via-[#021d40]/75 to-[#0d2a55]/60" />
        </div>

        {/* Charcoal Top Bar */}
        <div className="absolute top-0 inset-x-0 h-[50px] md:h-[0px] bg-[#21211f] z-20">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[99%] pointer-events-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1440 70" preserveAspectRatio="none" className="block w-full h-[25px] md:h-[40px] lg:h-[55px]">
              <path fill="#21211f" fillOpacity="1" d="M0,240L480,265L960,240L1440,265L1440,0L0,0Z" />
            </svg>
          </div>
        </div>

        {/* Full TECHNICA text — centred, even letter spacing */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <h1
            className="text-[12vw] sm:text-[100px] md:text-[14vw] lg:text-[250px] font-black leading-none text-white/90 whitespace-nowrap select-none -mt-32 md:-mt-44"
            style={{ letterSpacing: '0.001em', fontKerning: 'none' }}
          >
            TECHNICA
          </h1>
        </div>

        {/* Blue accent gradient bottom-right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#0A1F44]/50 to-transparent z-10 pointer-events-none" />

        {/* Explore Programs CTA — positioned under TECHNICA */}
        <div
          className="absolute z-[60] w-full flex justify-center sm:w-auto sm:block left-0 sm:left-[7%] bottom-[20%] sm:bottom-[25%]"
          style={{
            opacity: buttonOpacity,
            pointerEvents: buttonOpacity < 0.05 ? 'none' : 'auto',
            transition: 'opacity 0.1s linear',
          }}
        >
          <AnimatedCTA href="/programs" label="Explore Programs" />
        </div>

        {/* Gray bottom band + wave */}
        <div className="absolute bottom-0 left-0 w-full h-[0px] md:h-[0px] bg-[#f3f4f6] z-[45] pointer-events-none" />
        <div className="absolute bottom-[0px] md:bottom-[0px] left-0 w-full z-[45] pointer-events-none">
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
      <section className="relative z-[45] bg-white text-black pt-0 pb-0 px-8 md:px-16">
        {/* White wave jutting UP into Gray */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 pb-6 pt-2">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
            <img src="/LOCAL-BUSINESS.png" alt="Local Business Award" className="h-16 md:h-20 w-auto object-contain" />
            <p className="font-bold text-lg md:text-xl font-barlow uppercase tracking-wider">"Awarded 'Best New Business 2024'"</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
            <img src="/ACTIVE-KIDS.png" alt="Active Kids Vouchers" className="h-16 md:h-20 w-auto object-contain" />
            <p className="font-bold text-black font-barlow uppercase text-lg md:text-xl tracking-wide">We accept Active Kids vouchers</p>
          </div>
        </div>
      </section>

      {/* ─── 3. Our Programs ─── */}
      <section className="relative z-30 bg-[#21211f] text-white pt-27 pb-24 px-8 md:px-16">
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
                'vacation-care': '/vacationCare.JPG'
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

      {/* ─── 3b. Player Progression Pathway ─── */}
      <section className="relative z-[35] bg-[#f9fafb] text-[#0A1F44] pt-11 pb-24 px-8 md:px-16" aria-labelledby="pw-title">
        {/* Wave transition from charcoal programs section */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f9fafb" fillOpacity="1" d="M0,260L350,220L750,280L1100,210L1440,270L1440,320L0,320Z" />
          </svg>
        </div>

        <style>{`
          .pw-card-tf {
            transition: transform 0.35s cubic-bezier(0.2,0.7,0.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
          }
          .pw-card-tf:hover {
            transform: translateY(-6px);
            box-shadow: 0 26px 50px -28px rgba(0,0,0,0.15);
          }
          .pw-list-tf li {
            transition: transform 0.2s ease;
          }
          .pw-list-tf li:hover {
            transform: translateX(3px);
          }
          .pw-goal-tf {
            transition: transform 0.35s ease, box-shadow 0.35s ease;
          }
          .pw-goal-tf:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 40px -26px rgba(0,0,0,0.15);
          }
          .pw-anim-tf {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2,0.7,0.2,1);
          }
          .pw-anim-tf.pw-in-tf {
            opacity: 1;
            transform: none;
          }
          @media (prefers-reduced-motion: reduce) {
            .pw-anim-tf { opacity: 1; transform: none; }
          }
        `}</style>

        <div className="max-w-[1320px] mx-auto" ref={(el) => {
          if (!el || el.dataset.pwInit) return;
          el.dataset.pwInit = 'true';
          const items = el.querySelectorAll('.pw-anim-tf');
          if (!('IntersectionObserver' in window)) {
            items.forEach(e => e.classList.add('pw-in-tf'));
            return;
          }
          const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
              if (e.isIntersecting) {
                const el = e.target as HTMLElement;
                const idx = Array.from(items).indexOf(el);
                el.style.transitionDelay = `${Math.min(idx, 8) * 70}ms`;
                el.classList.add('pw-in-tf');
                io.unobserve(el);
              }
            });
          }, { threshold: 0.15 });
          items.forEach(e => io.observe(e));
        }}>

          {/* Header */}
          <div className="flex items-center justify-center gap-[clamp(12px,2vw,24px)] mb-1.5 pw-anim-tf">
            <span className="h-[2px] flex-[0_1_150px] min-w-[24px] bg-[#f0722b] opacity-85" />
            <span className="font-barlow font-semibold text-[#f0722b] text-[clamp(15px,2.3vw,28px)] tracking-[0.4em] uppercase pl-[0.4em] whitespace-nowrap text-center">
              Technica Football
            </span>
            <span className="h-[2px] flex-[0_1_150px] min-w-[24px] bg-[#f0722b] opacity-85" />
          </div>
          <h2 id="pw-title" className="font-barlow font-bold text-[clamp(42px,8.5vw,92px)] leading-[0.98] tracking-[0.02em] text-center uppercase text-[#0A1F44] m-0 pw-anim-tf">
            Player Pathway
          </h2>
          <p className="font-barlow font-medium text-[clamp(14px,2.1vw,25px)] tracking-[0.1em] uppercase text-center text-[#0A1F44]/70 mt-2.5 pw-anim-tf" style={{ textWrap: 'balance' }}>
            A Clear Path. Purposeful Development. Higher Standards.
          </p>

          {/* Card Row */}
          <div className="flex items-stretch justify-center mt-[clamp(38px,5vw,60px)] max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-12">

            {/* Card 1 — Term Program */}
            <article className="pw-card-tf pw-anim-tf relative flex-[1_1_0] min-w-0 bg-[#0A1F44] border-[1.5px] border-[#f0722b] rounded-[18px] p-[clamp(40px,3.4vw,52px)_clamp(22px,2vw,32px)_clamp(24px,2vw,30px)] flex flex-col items-center max-[900px]:pt-12 hover:border-[#f0722b]">
              {/* Badge */}
              <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-16 h-[70px] flex items-start justify-center pt-2.5 font-barlow font-bold text-[38px] text-white shadow-[0_8px_18px_-8px_rgba(0,0,0,0.3)]" style={{ background: 'linear-gradient(180deg, #f0722b, #c85a1a)', clipPath: 'polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)' }}>
                1
              </div>
              {/* Icon */}
              <div className="h-[74px] flex items-center justify-center mb-1.5">
                <svg width="74" height="74" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="44" fill="#fff" />
                  <polygon points="50,35 64,45.5 58.5,62 41.5,62 36,45.5" fill="#0A1F44" />
                  <g stroke="#0A1F44" strokeWidth="3.4" fill="none" strokeLinejoin="round">
                    <line x1="50" y1="35" x2="50" y2="13" /><line x1="64" y1="45.5" x2="85" y2="40" />
                    <line x1="58.5" y1="62" x2="72" y2="83" /><line x1="41.5" y1="62" x2="28" y2="83" /><line x1="36" y1="45.5" x2="15" y2="40" />
                  </g>
                  <g fill="#0A1F44">
                    <path d="M50 9 L61 17 L57 30 L43 30 L39 17 Z" /><path d="M90 35 L96 47 L86 56 L75 49 L78 36 Z" />
                    <path d="M77 86 L66 94 L56 86 L61 74 L74 76 Z" /><path d="M44 86 L34 94 L23 86 L26 76 L39 74 Z" /><path d="M10 35 L22 36 L25 49 L14 56 L4 47 Z" />
                  </g>
                </svg>
              </div>
              <h3 className="font-barlow font-bold text-[clamp(22px,2vw,29px)] tracking-[0.02em] uppercase text-center text-white mt-1 mb-1.5 leading-[1.05]">Term Program</h3>
              <div className="font-barlow font-semibold text-[clamp(14px,1.3vw,18px)] tracking-[0.12em] uppercase text-[#f0722b] text-center mb-3.5">Foundation Stage</div>
              <div className="h-[1.5px] w-full bg-[#f0722b] opacity-60 mb-4" />
              <p className="self-stretch text-[clamp(15px,1.15vw,16.5px)] leading-relaxed text-white/80 mb-3.5">The entry point into Technica Football. Players develop core skills, confidence and a love for the game.</p>
              <ul className="pw-list-tf self-stretch flex flex-col gap-2.5 list-none m-0 p-0">
                {['Ball mastery & technique', 'Game confidence', 'Decision making', 'Love for the game', 'Weekly term-based training', 'Coaches observe and support ongoing development'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[clamp(14px,1.1vw,16px)] leading-[1.35] text-white/80">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0722b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-px"><circle cx="12" cy="12" r="9" /><path d="M8 12.3 l2.6 2.6 L16 9" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            {/* Arrow 1 */}
            <div className="flex-[0_0_clamp(40px,4vw,68px)] flex items-center justify-center self-center max-[900px]:rotate-90 max-[900px]:flex-[0_0_auto] pw-anim-tf">
              <svg width="48" height="40" viewBox="0 0 48 40" aria-hidden="true">
                <defs><linearGradient id="pwArrowG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f0722b" /><stop offset="1" stopColor="#c85a1a" /></linearGradient></defs>
                <path d="M0 13 H26 V4 L48 20 L26 36 V27 H0 Z" fill="url(#pwArrowG)" />
              </svg>
            </div>

            {/* Card 2 — Selection Process */}
            <article className="pw-card-tf pw-anim-tf relative flex-[1_1_0] min-w-0 bg-[#0A1F44] border-[1.5px] border-white/50 rounded-[18px] p-[clamp(40px,3.4vw,52px)_clamp(22px,2vw,32px)_clamp(24px,2vw,30px)] flex flex-col items-center max-[900px]:pt-12 hover:border-white">
              <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-16 h-[70px] flex items-start justify-center pt-2.5 font-barlow font-bold text-[38px] text-[#0A1F44] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.3)]" style={{ background: 'linear-gradient(180deg, #fff, #d7d9dc)', clipPath: 'polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)' }}>
                2
              </div>
              <div className="h-[74px] flex items-center justify-center mb-1.5">
                <svg width="78" height="84" viewBox="0 0 86 92" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="12" y="12" width="50" height="64" rx="6" />
                  <rect x="29" y="6" width="16" height="11" rx="3" fill="#0A1F44" />
                  <path d="M23 30 l4 4 l7 -8" strokeWidth="3" /><line x1="40" y1="32" x2="54" y2="32" strokeWidth="2.8" />
                  <path d="M23 45 l4 4 l7 -8" strokeWidth="3" /><line x1="40" y1="47" x2="54" y2="47" strokeWidth="2.8" />
                  <path d="M23 60 l4 4 l7 -8" strokeWidth="3" />
                  <circle cx="60" cy="62" r="15" fill="#0A1F44" /><circle cx="60" cy="62" r="13" /><line x1="70" y1="72" x2="80" y2="83" />
                </svg>
              </div>
              <h3 className="font-barlow font-bold text-[clamp(22px,2vw,29px)] tracking-[0.02em] uppercase text-center text-white mt-1 mb-1.5 leading-[1.05]">Selection Process</h3>
              <div className="font-barlow font-semibold text-[clamp(14px,1.3vw,18px)] tracking-[0.12em] uppercase text-[#f0722b] text-center mb-3.5">Talent Identification Stage</div>
              <div className="h-[1.5px] w-full bg-white/45 mb-4" />
              <p className="self-stretch text-[clamp(15px,1.15vw,16.5px)] leading-relaxed text-white/80 mb-3.5">Coaches identify players who demonstrate strong potential, attitude and commitment.</p>
              <p className="self-stretch font-barlow font-semibold text-[#f0722b] text-[clamp(16px,1.4vw,19px)] mb-3">Players may be invited to:</p>
              <ul className="pw-list-tf self-stretch flex flex-col gap-2.5 list-none m-0 p-0">
                {[
                  { icon: <><rect x="3" y="5" width="18" height="16" rx="2.5" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /></>, label: 'Assessment Sessions' },
                  { icon: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19 a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9" r="2.6" /><path d="M16 14.4 a4.6 4.6 0 0 1 5 4.6" /></>, label: 'Trial Nights' },
                  { icon: <><circle cx="12" cy="7" r="3" /><path d="M6.5 18 a5.5 5.5 0 0 1 11 0" /><circle cx="5" cy="10" r="2.2" /><circle cx="19" cy="10" r="2.2" /><path d="M2 19 a3.6 3.6 0 0 1 4.5-3.4" /><path d="M22 19 a3.6 3.6 0 0 0 -4.5-3.4" /></>, label: 'Small Group Evaluations' },
                  { icon: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20 a7 7 0 0 1 14 0" /></>, label: 'Individual Recommendation' },
                ].map(item => (
                  <li key={item.label} className="flex items-start gap-3 text-[clamp(14px,1.1vw,16px)] leading-[1.35] text-white/80">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f0722b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-px">{item.icon}</svg>
                    {item.label}
                  </li>
                ))}
              </ul>
            </article>

            {/* Arrow 2 */}
            <div className="flex-[0_0_clamp(40px,4vw,68px)] flex items-center justify-center self-center max-[900px]:rotate-90 max-[900px]:flex-[0_0_auto] pw-anim-tf">
              <svg width="48" height="40" viewBox="0 0 48 40" aria-hidden="true"><path d="M0 13 H26 V4 L48 20 L26 36 V27 H0 Z" fill="url(#pwArrowG)" /></svg>
            </div>

            {/* Card 3 — Academy Development Squad */}
            <article className="pw-card-tf pw-anim-tf relative flex-[1_1_0] min-w-0 bg-[#0A1F44] border-[1.5px] border-[#f0722b] rounded-[18px] p-[clamp(40px,3.4vw,52px)_clamp(22px,2vw,32px)_clamp(24px,2vw,30px)] flex flex-col items-center max-[900px]:pt-12 hover:border-[#f0722b]">
              <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-16 h-[70px] flex items-start justify-center pt-2.5 font-barlow font-bold text-[38px] text-white shadow-[0_8px_18px_-8px_rgba(0,0,0,0.3)]" style={{ background: 'linear-gradient(180deg, #f0722b, #c85a1a)', clipPath: 'polygon(0 0, 100% 0, 100% 72%, 50% 100%, 0 72%)' }}>
                3
              </div>
              <div className="h-[74px] flex items-center justify-center mb-1.5">
                <svg width="72" height="82" viewBox="0 0 84 96" fill="none" aria-hidden="true">
                  <path d="M42 6 L74 16 V44 C74 68 60 82 42 90 C24 82 10 68 10 44 V16 Z" fill="#0A1F44" stroke="#e9e9ea" strokeWidth="3" />
                  <path d="M42 22 l2.6 5.6 6 .7 -4.5 4.2 1.2 6 -5.3-3 -5.3 3 1.2-6 -4.5-4.2 6-.7 Z" fill="#f0722b" />
                  <path d="M26 42 H58 V50 H47 V72 H37 V50 H26 Z" fill="#fff" />
                </svg>
              </div>
              <h3 className="font-barlow font-bold text-[clamp(22px,2vw,29px)] tracking-[0.02em] uppercase text-center text-white mt-1 mb-1.5 leading-[1.05]">Academy Development Squad</h3>
              <div className="font-barlow font-semibold text-[clamp(14px,1.3vw,18px)] tracking-[0.12em] uppercase text-[#f0722b] text-center mb-3.5">Performance Stage</div>
              <div className="h-[1.5px] w-full bg-[#f0722b] opacity-60 mb-4" />
              <p className="self-stretch text-[clamp(15px,1.15vw,16.5px)] leading-relaxed text-white/80 mb-3.5">Invitation or selection based. A higher-performance environment for dedicated players.</p>
              <ul className="pw-list-tf self-stretch flex flex-col gap-2.5 list-none m-0 p-0">
                {['Advanced technical training', 'Position-specific development', 'Game understanding & scenarios', 'Performance reviews', 'Squad culture & standards', 'Long-term player development'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[clamp(14px,1.1vw,16px)] leading-[1.35] text-white/80">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0722b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-px"><circle cx="12" cy="12" r="9" /><path d="M8 12.3 l2.6 2.6 L16 9" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

          </div>

          {/* Goal Bar */}
          <div className="pw-goal-tf pw-anim-tf mt-[clamp(26px,3vw,40px)] border-[1.5px] border-[#f0722b] rounded-2xl p-[clamp(18px,2vw,26px)_clamp(24px,3vw,40px)] flex items-center gap-[clamp(18px,2.5vw,32px)] bg-[#0A1F44] max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-3.5">
            <svg width="56" height="56" viewBox="0 0 58 58" fill="none" stroke="#f0722b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
              <circle cx="27" cy="31" r="20" /><circle cx="27" cy="31" r="12" /><circle cx="27" cy="31" r="4" fill="#f0722b" />
              <line x1="33" y1="25" x2="50" y2="8" /><path d="M44 8 L50 8 L50 14" />
            </svg>
            <div className="font-barlow font-bold text-[clamp(24px,2.6vw,34px)] tracking-[0.04em] uppercase whitespace-nowrap text-white">Our Goal</div>
            <div className="w-[2px] self-stretch min-h-[46px] bg-white/14 max-[620px]:hidden" />
            <div className="text-[clamp(15px,1.5vw,21px)] leading-relaxed text-white/80 max-[620px]:text-base">To develop confident, skilled and resilient players who love the game and strive for excellence.</div>
          </div>

        </div>
      </section>

      {/* ─── 4. Testimonials ─── */}
      {/* Section itself uses fixed padding — content area has min-h to prevent height shifts */}
      <section className="relative z-40 bg-[#f0722b] text-white pt-20 pb-24 px-16 md:px-24 lg:px-32 text-center">
        {/* Orange wave jutting UP into pathway section */}
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
            font-family: 'Material Symbols Outlined';
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
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="pitch-line hidden md:block"></div>
                <h2 className="text-4xl md:text-5xl font-barlow font-black tracking-widest uppercase text-white whitespace-nowrap">OUR CORE FOCUS</h2>
                <div className="pitch-line hidden md:block"></div>
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
              <div className="flex items-center justify-center gap-6 mb-12">
                <div className="pitch-line hidden md:block"></div>
                <h2 className="text-2xl md:text-3xl font-barlow font-black tracking-widest uppercase text-[#f0722b] whitespace-nowrap">SUPPORTING FACTORS</h2>
                <div className="pitch-line hidden md:block"></div>
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
      <section className="relative z-[60] bg-[#21211f] w-full pt-10 pb-27 px-8 md:px-16 flex flex-col items-center">
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
          <img src="/trainingkitlogo.png" alt="Training Kit Logo" className="h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-lg hover:opacity-80 transition-opacity duration-300" />
        </a>
        <div className="w-full flex justify-center mt-8">
          <a
            href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-10 py-4 rounded-xl hover:bg-white hover:text-[#f0722b] transition-colors duration-300 text-base shadow-lg"
          >
            See All Options <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ─── 7. Our Partners ─── */}
      <section className="relative z-[70] bg-[#f9fafb] text-[#0A1F44] pt-7 pb-20 px-8 md:px-16 text-center">
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
