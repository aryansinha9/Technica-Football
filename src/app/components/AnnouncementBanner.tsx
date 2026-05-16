import { useEffect, useRef } from 'react';

const announcements = [
  '🎉 Registrations for Term 2 Now Open!',
  '⚽ Holiday Clinic Coming Soon — Stay Tuned!',
  '🏆 New Program: Academy Development Squad — Express Interest Today!',
  '✅ Active Kids Vouchers Accepted Across All Programs',
  '📍 Sessions at The Ponds — Carindale St & Fyfe Rd',
];

export default function AnnouncementBanner() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless looping
  const items = [...announcements, ...announcements];

  return (
    <div
      className="relative w-full bg-[#21211f] border-b border-[#f0722b]/30 overflow-hidden z-[99]"
      style={{ height: '40px' }}
      aria-label="Announcements"
    >
      <style>{`
        @keyframes scrollBanner {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .banner-track {
          animation: scrollBanner 30s linear infinite;
          will-change: transform;
        }
        .banner-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#21211f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#21211f] to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="banner-track flex items-center h-full whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-10 h-full">
            <span className="text-white font-barlow font-bold tracking-widest uppercase text-[11px] leading-none">
              {text}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#f0722b] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
