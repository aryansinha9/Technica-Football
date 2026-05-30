"use client";

import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import { Facebook, Instagram, Menu, X } from 'lucide-react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#0A1F44] text-white overflow-x-hidden font-sans">
      {/* Header */}
      <header className="relative z-[100] flex items-center justify-between px-6 md:px-16 py-2 bg-[#21211f]">
        <div className="flex items-center z-50">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 sm:gap-4">
            <img src="/TFLOGO.png" alt="Technica Football Logo" className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-barlow font-black tracking-[0.1em] text-white text-[15px] sm:text-lg md:text-xl lg:text-2xl uppercase leading-none">Technica</span>
              <span className="font-barlow font-black tracking-[0.1em] text-[#f0722b] text-[15px] sm:text-lg md:text-xl lg:text-2xl uppercase leading-tight">Football</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-8 text-sm uppercase tracking-wide">
          <Link to="/" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base xl:text-lg">Home</Link>
          <Link to="/about" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base xl:text-lg">About</Link>

          {/* Programs Dropdown */}
          <div className="relative group py-2">
            <Link to="/programs" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base xl:text-lg uppercase flex items-center gap-1 focus:outline-none cursor-pointer">
              Programs
            </Link>
            <div className="absolute top-full left-0 mt-0 bg-[#21211f] border border-gray-700/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 py-3 px-2 flex flex-col gap-3">
              <Link to="/programs/term-program" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Term Program</Link>
              <Link to="/programs/individual-sessions" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Individual Sessions</Link>
              <Link to="/programs/academy-development-squad" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Academy Development Squad</Link>
              <Link to="/programs/holiday-clinic" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Holiday Clinic</Link>
              <Link to="/programs/club-technica-training" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Club Technica Training</Link>
              <Link to="/programs/vacation-care" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm uppercase block px-4 py-1">Vacation Care</Link>
            </div>
          </div>

          <Link to="/contact" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base xl:text-lg">Contact</Link>
          <a
            href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-base xl:text-lg"
          >
            Apparel
          </a>
        </nav>

        {/* Desktop Socials */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          <a href="https://www.facebook.com/profile.php?id=100086871345661" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          </a>
          <a href="https://www.instagram.com/technicafootball/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex lg:hidden text-white hover:text-orange-500 transition-colors focus:outline-none z-[110]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-[#21211f] z-[105] flex flex-col pt-32 px-8 overflow-y-auto transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-6 text-xl">
            <Link to="/" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase">Home</Link>
            <Link to="/about" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase">About</Link>
            <Link to="/programs" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase">Programs</Link>
            <div className="flex flex-col gap-4 pl-4 border-l border-gray-700">
              <Link to="/programs/term-program" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase text-lg">Term Program</Link>
              <Link to="/programs/individual-sessions" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase text-lg">Individual Sessions</Link>
              <Link to="/programs/academy-development-squad" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase text-lg">Academy Development Squad</Link>
              <Link to="/programs/holiday-clinic" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase text-lg">Holiday Clinic</Link>
              <Link to="/programs/club-technica-training" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase text-lg">Club Technica Training</Link>
              <Link to="/programs/vacation-care" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase text-lg">Vacation Care</Link>
            </div>
            <Link to="/contact" onClick={closeMenu} className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase">Contact</Link>
            <a
              href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="hover:text-orange-500 transition-colors font-barlow tracking-widest uppercase"
            >
              Apparel
            </a>
          </nav>
          <div className="flex items-center justify-start gap-6 mt-8 mb-12">
            <a href="https://www.facebook.com/profile.php?id=100086871345661" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-6 h-6 cursor-pointer hover:text-orange-500 transition-colors" />
            </a>
            <a href="https://www.instagram.com/technicafootball/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-orange-500 transition-colors" />
            </a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <footer className="relative bg-[#071630] pt-10 pb-10 px-8 md:px-16 z-[80]">
        {/* Footer wave jutting UP */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 150 1440 170" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[50px] lg:h-[70px]">
            <path fill="#071630" fillOpacity="1" d="M0,170 L300,220 L700,190 L1100,240 L1440,210 L1440,320 L0,320 Z" />
            <path fill="#071630" fillOpacity="1" d="M0,200 L300,250 L700,220 L1100,270 L1440,240 L1440,320 L0,320 Z" />
            <path fill="#071630" fillOpacity="1" d="M0,230 L300,280 L700,250 L1100,300 L1440,270 L1440,320 L0,320 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mt-2">
            {/* Business Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
              <img src="/TFLOGO.png" alt="Technica Football" className="h-20 md:h-32 w-auto object-contain mb-3 -ml-4" />
              <p className="font-barlow tracking-wide text-white/50 text-xs mt-1">ABN: 93 433 558 169</p>
              <p className="font-barlow tracking-wide text-white/50 text-xs">The Ponds, 2769.</p>
            </div>

            {/* Nav Links - 2 Columns */}
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-sm uppercase flex-1 max-w-2xl mx-auto lg:mx-0 w-full justify-items-center sm:justify-items-start">
              <div className="flex flex-col items-center sm:items-start gap-2">
                <Link to="/" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Home</Link>
                <Link to="/about" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">About</Link>
                <Link to="/programs" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Programs</Link>
                <Link to="/faq" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">FAQ</Link>
                <Link to="/contact" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Contact</Link>
                <a
                  href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm"
                >
                  Apparel
                </a>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-2">
                <Link to="/programs/term-program" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Term Program</Link>
                <Link to="/programs/individual-sessions" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Individual Sessions</Link>
                <Link to="/programs/academy-development-squad" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Academy Dev Squad</Link>
                <Link to="/programs/holiday-clinic" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Holiday Clinic</Link>
                <Link to="/programs/club-technica-training" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Club Training</Link>
                <Link to="/programs/vacation-care" className="hover:text-orange-500 transition-colors font-barlow tracking-widest text-sm">Vacation Care</Link>
              </div>
            </nav>

            {/* Contact Details & Socials */}
            <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
              <div className="text-center lg:text-right font-barlow tracking-widest text-sm text-white/80 flex flex-col gap-1">
                <a href="mailto:info@technicafootball.com.au" className="hover:text-orange-500 transition-colors">info@technicafootball.com.au</a>
                <a href="tel:0400422802" className="hover:text-orange-500 transition-colors">0400 422 802</a>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a href="https://www.facebook.com/profile.php?id=100086871345661" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
                </a>
                <a href="https://www.instagram.com/technicafootball/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-row items-center justify-between text-xs text-white/40">
            {/* Left — nav links */}
            <div className="flex flex-wrap gap-4 flex-1">
              <Link to="/privacy" className="font-barlow tracking-widest hover:text-white/80 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="font-barlow tracking-widest hover:text-white/80 transition-colors">Terms &amp; Conditions</Link>
              <Link to="/contact" className="font-barlow tracking-widest hover:text-white/80 transition-colors">Contact</Link>
              <Link to="/admin" className="font-barlow tracking-widest hover:text-white/80 transition-colors">Admin</Link>
            </div>

            {/* Centre — Ananta Systems attribution */}
            <a
              href="https://www.anantasystems.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="infinity-link"
              aria-label="Created by Ananta Systems, opens in a new tab"
            >
              <svg
                className="infinity-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
              </svg>
            </a>

            {/* Right — copyright */}
            <span className="font-barlow tracking-widest flex-1 text-right">© {new Date().getFullYear()} Technica Football. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
