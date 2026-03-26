import { Facebook, Twitter, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import TiltedCard from '../components/TiltedCard';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A1F44] text-white overflow-x-hidden font-sans">
      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-16 py-6 bg-[#21211f]">
        <div className="flex items-center">
          <img src="/HEADER.png" alt="Technica Football" className="h-32 md:h-40 lg:h-48 w-auto object-contain" />
        </div>

        <nav className="flex items-center gap-8 text-sm uppercase tracking-wide">
          <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-lg">Home</a>
          <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-lg">About</a>
          
          {/* Programs Dropdown */}
          <div className="relative group py-2">
            <button className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-lg uppercase flex items-center gap-1 focus:outline-none cursor-pointer">
              Programs
            </button>
            <div className="absolute top-full left-0 mt-0 bg-[#21211f] border border-gray-700/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 py-3 px-2 flex flex-col gap-3">
              <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Term Program</a>
              <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Individual Sessions</a>
              <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Primary School Program</a>
              <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Preschool Program</a>
              <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Holiday Clinic</a>
              <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">OSH/Vacation Care</a>
            </div>
          </div>

          <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-lg">Contact</a>
          <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-lg">Apparel</a>
        </nav>

        <div className="flex items-center gap-3">
          <Facebook className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          <Twitter className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          <Youtube className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          <span className="text-xs ml-2 font-barlow tracking-widest uppercase">ENGLISH (USA)</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[100vh] bg-gradient-to-br from-[#021d40] from-30% via-[#021d40] via-50% to-[#f38221] to-70%">
        {/* Charcoal Top Half Layer */}
        <div className="absolute top-0 inset-x-0 h-[250px] md:h-[350px] bg-[#21211f] z-10">
          {/* Middle Wave Border (Charcoal spilling down) */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[99%] pointer-events-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1440 70" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
              <path fill="#21211f" fillOpacity="1" d="M0,224L480,288L960,224L1440,288L1440,0L0,0Z"></path>
            </svg>
          </div>
        </div>

        {/* Navigation arrows */}
        <button className="absolute left-8 top-[37.5vh] -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-50">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="absolute right-8 top-[37.5vh] -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-50">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Back Text Layer (Bottom layer - shows ICA) */}
        <div className="absolute top-0 inset-x-0 h-[75vh] z-20 flex items-center justify-center translate-x-12 md:translate-x-24 lg:-translate-x-1 -translate-y-40 pointer-events-none">
          <h1 className="text-[150px] sm:text-[220px] md:text-[300px] lg:text-[450px] font-black leading-none tracking-tighter text-white/90 whitespace-nowrap select-none">
            <span className="text-transparent">TECHN</span><span>ICA</span>
          </h1>
        </div>

        {/* Person Image Layer (Middle layer) */}
        <div className="absolute top-0 inset-x-0 z-30 flex justify-center items-end pointer-events-none h-[75vh]">
          <img
            src="/PERSON.png"
            alt="Hero Person"
            className="w-auto object-contain object-bottom translate-y-[22%] translate-x-[30%]"
            style={{ height: '135%' }}
            draggable="false"
          />
        </div>

        {/* Front Text Layer (Top layer - shows TECHN) */}
        <div className="absolute top-0 inset-x-0 h-[75vh] z-50 flex items-center justify-center translate-x-12 md:translate-x-24 lg:-translate-x-1 -translate-y-40 pointer-events-none">
          <h1 className="text-[150px] sm:text-[220px] md:text-[300px] lg:text-[450px] font-black leading-none tracking-tighter text-white/90 whitespace-nowrap select-none">
            <span>TECHN</span><span className="text-transparent">ICA</span>
          </h1>
        </div>

        {/* Solid Gray Background (Behind ICA text) */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[200px] bg-[#f3f4f6] z-[45] pointer-events-none"></div>

        {/* Gray SVG Wave (In front of player image, 100px down) */}
        <div className="absolute bottom-[99px] md:bottom-[199px] left-0 w-full z-[45] pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 130 1440 190" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,160L470,130L960,160L1440,224L1440,320L960,320L480,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* 1. Leading the Development Section */}
      <section className="relative z-[45] bg-[#f3f4f6] pt-0 pb-48 px-8 md:px-16 text-center text-[#0A1F44]">
        <div className="max-w-4xl mx-auto transform -translate-y-[100px] md:-translate-y-[150px]">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-wide text-[#0A1F44]">
            LEADING THE DEVELOPMENT IN FORMING TECHNICAL FOOTBALL PLAYERS
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
            We build players on a foundation of technical mastery, developing them to excel on the pitch in all areas of skill, intelligence, and discipline. Each session is designed to challenge, inspire, and prepare players for the next level of their game.
          </p>
        </div>
      </section>

      {/* 2. Slim Highlight Bar */}
      <section className="relative z-[45] bg-white text-black pt-20 pb-20 px-8 md:px-16">
        {/* White wave jutting UP into Gray Section 1 */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[70px] lg:h-[100px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,235L480,270L960,250L1440,288L1440,320L960,320L480,320L0,320Z"></path>
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

      {/* 3. Our Programs */}
      <section className="relative z-30 bg-[#0A1F44] text-white pt-32 pb-48 px-8 md:px-16">
        {/* Top Wave (White dripping into Blue) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 320 1440 110" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#ffffff" fillOpacity="1" d="M0,430L300,360L750,400L1440,340L1440,320L960,320L480,320L0,320Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center text-white">OUR PROGRAMS</h2>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer border border-gray-100">
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#013068] to-[#0A1F44] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-base tracking-widest uppercase font-barlow">Placeholder</div>
                </div>
                <div className="p-8">
                  <div className="text-sm uppercase text-orange-500 font-bold mb-2 tracking-widest font-barlow">Ages {i * 2}-{i * 2 + 3}</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#0A1F44]">Foundation Level {i}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    A comprehensive program designed to develop foundational skills, tactical awareness, and physical conditioning.
                  </p>
                  <div className="text-orange-500 font-bold flex items-center gap-2 group-hover:gap-4 transition-all font-barlow tracking-widest text-lg">
                    LEARN MORE <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-3 mt-8">
            <div className="w-10 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-4 h-2 bg-white/30 rounded-full"></div>
            <div className="w-4 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="relative z-40 bg-[#f0722b] text-white pt-32 pb-48 px-8 md:px-16 text-center">
        {/* Orange wave jutting UP into Blue */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f0722b" fillOpacity="1" d="M0,200L450,300L900,230L1440,320L1440,320L960,320L480,320L0,320Z"></path>
          </svg>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-4xl font-black mb-20 tracking-wider">TESTIMONIALS</h2>

          <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-20 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <svg className="w-12 h-12 md:w-16 md:h-16 text-white/30 absolute top-6 left-6 md:top-10 md:left-10" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed mb-12 relative z-10">
              "Joining Technica Football was the best decision for our son's development. The coaches are incredible, the facilities are top-tier, and his confidence on the ball has skyrocketed!"
            </p>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full mb-6 relative overflow-hidden flex items-center justify-center">
                <span className="text-xl font-bold text-white/60">MV</span>
              </div>
              <p className="font-bold text-lg md:text-2xl tracking-widest font-barlow uppercase">MICHAEL V.</p>
              <p className="text-white/80 text-sm uppercase tracking-widest mt-1 font-barlow">Parent of U12 Player</p>
            </div>
          </div>

          {/* Navigation */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 md:w-16 md:h-16 bg-white text-orange-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-xl z-20">
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 md:w-16 md:h-16 bg-white text-orange-500 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-xl z-20">
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </section>

      {/* 5. Our Core Focus */}
      <section className="relative z-50 bg-[#0A1F44] text-white pt-40 pb-56 px-8 md:px-16 text-center">
        {/* White wave jutting UP into Orange */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#0A1F44" fillOpacity="1" d="M0,240 L300,300 L700,220 L1100,280 L1440,260 L1440,320 L0,320 Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto border-2 border-dashed border-white/20 rounded-3xl p-16 md:p-32 bg-white/5 hover:bg-white/10 transition-colors duration-500">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-wider">OUR CORE FOCUS</h2>
          <h3 className="text-3xl md:text-4xl text-orange-500 font-bold tracking-widest uppercase font-barlow">Supporting Factors</h3>

          <div className="mt-24 text-white/40 text-2xl tracking-widest uppercase font-barlow">
            [ Core Focus Content Area ]
          </div>
        </div>
      </section>

      {/* 6. Official Training Kit */}
      <section className="relative z-[60] bg-[#21211f] w-full pt-32 pb-40 px-8 md:px-16 flex flex-col items-center">
        {/* Charcoal wave jutting UP into Blue Core Focus */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#21211f" fillOpacity="1" d="M0,260L350,220L750,280L1100,210L1440,270L1440,320L0,320Z"></path>
          </svg>
        </div>

        {/* Top Training Kit Logo */}
        <img src="/Training Kit.png" alt="Training Kit Logo" className="relative z-30 h-32 md:h-48 lg:h-64 w-auto mb-16 object-contain drop-shadow-lg" />
        
        <div className="relative w-full max-w-[1800px] mx-auto text-center transition-colors duration-500 rounded-xl overflow-hidden shadow-2xl group border-[8px] border-[#f0722b]">
          <img src="/my-project-page-1.png" alt="Official Training Kit" className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Overlay container for the 4 interactive cards */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 px-4 md:px-12 w-full h-full">
            <div className="w-1/4 max-w-[280px] aspect-[4/5] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <TiltedCard 
                imageSrc="/JEARSY.webp" 
                altText="Jersey" 
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
            </div>
            <div className="w-1/4 max-w-[280px] aspect-[4/5] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <TiltedCard 
                imageSrc="/SHORTS (1).webp" 
                altText="Shorts" 
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
            </div>
            <div className="w-1/4 max-w-[280px] aspect-[4/5] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <TiltedCard 
                imageSrc="/LONGSLEEVE (1).webp" 
                altText="Long Sleeve" 
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
            </div>
            <div className="w-1/4 max-w-[280px] aspect-[4/5] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <TiltedCard 
                imageSrc="/PANTS.png" 
                altText="Pants" 
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
            </div>
          </div>
        </div>
        
        {/* Bottom Semantic Header */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-barlow font-bold mt-20 uppercase tracking-widest text-center">
          <span className="text-white">Official</span>{" "}
          <span className="text-[#f0722b]">Training Kit</span>
        </h2>
      </section>

      {/* 7. Our Partners */}
      <section className="relative z-[70] bg-[#f9fafb] text-[#0A1F44] pt-40 pb-48 px-8 md:px-16 text-center">
        {/* Light Grey wave jutting UP into Charcoal */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 200 1440 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f9fafb" fillOpacity="1" d="M0,220L400,290L850,230L1250,280L1440,240L1440,320L0,320Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-24 tracking-wider">OUR PARTNERS</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-48 h-24 bg-gray-300 rounded-lg flex items-center justify-center font-bold text-gray-500 text-2xl shadow-inner font-barlow tracking-widest cursor-pointer hover:bg-gray-200 transition-colors">
                LOGO {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#071630] pt-32 pb-16 px-16 z-[80]">
        {/* Footer Dark Blue wave jutting UP into Light Grey (layered gradient) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 150 1440 170" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[50px] lg:h-[70px]">
            <path fill="#071630" fillOpacity="1" d="M0,170 L300,220 L700,190 L1100,240 L1440,210 L1440,320 L0,320 Z"></path>
            <path fill="#071630" fillOpacity="1" d="M0,200 L300,250 L700,220 L1100,270 L1440,240 L1440,320 L0,320 Z"></path>
            <path fill="#071630" fillOpacity="1" d="M0,230 L300,280 L700,250 L1100,300 L1440,270 L1440,320 L0,320 Z"></path>
          </svg>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mt-8">
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm uppercase">
            <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base">Football</a>
            <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base">Accessories</a>
            <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base">T-shirts</a>
            <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base">Sneakers</a>
            <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base">Career</a>
            <a href="#" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
            <span className="text-xs ml-2 font-barlow tracking-widest uppercase">ENGLISH (USA)</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-xs text-white/40">
          <div className="flex flex-wrap justify-center gap-6">
            <span className="font-barlow tracking-widest hover:text-white/80 cursor-pointer">Terms and conditions</span>
            <span className="font-barlow tracking-widest hover:text-white/80 cursor-pointer">Corporate Terms</span>
            <span className="font-barlow tracking-widest hover:text-white/80 cursor-pointer">Terms of Use</span>
            <span className="font-barlow tracking-widest hover:text-white/80 cursor-pointer">Agreement</span>
            <span className="font-barlow tracking-widest hover:text-white/80 cursor-pointer">Delivery Policy</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-3" viewBox="0 0 64 32" fill="currentColor">
              <path d="M10 16 L22 10 L22 22 Z" />
            </svg>
            <span className="font-barlow tracking-widest">All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
