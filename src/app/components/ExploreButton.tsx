import { Link } from 'react-router';

interface ExploreButtonProps {
  href?: string;
  label?: string;
  isExternal?: boolean;
}

export default function ExploreButton({ 
  href = 'https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football',
  label = 'View Training Kit',
  isExternal = true
}: ExploreButtonProps) {
  const interior = (
    <>
      {/* Orange circle with pixel-art arrow icon */}
      <span
        className="shrink-0 w-[60px] h-[60px] bg-[#f0722b] rounded-none flex items-center justify-center border-[3px] border-white"
        style={{ marginLeft: '-1px' }}
      >
        <svg
          className="explore-icon"
          width="16"
          height="19"
          viewBox="0 0 16 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="1.61321" cy="1.61321" r="1.5" fill="#0A1F44" />
          <circle cx="5.73583" cy="1.61321" r="1.5" fill="#0A1F44" />
          <circle cx="5.73583" cy="5.5566" r="1.5" fill="#0A1F44" />
          <circle cx="9.85851" cy="5.5566" r="1.5" fill="#0A1F44" />
          <circle cx="9.85851" cy="9.5" r="1.5" fill="#0A1F44" />
          <circle cx="13.9811" cy="9.5" r="1.5" fill="#0A1F44" />
          <circle cx="5.73583" cy="13.4434" r="1.5" fill="#0A1F44" />
          <circle cx="9.85851" cy="13.4434" r="1.5" fill="#0A1F44" />
          <circle cx="1.61321" cy="17.3868" r="1.5" fill="#0A1F44" />
          <circle cx="5.73583" cy="17.3868" r="1.5" fill="#0A1F44" />
        </svg>
      </span>

      {/* Button text */}
      <span className="flex-1 flex items-center justify-center text-[#0A1F44] font-barlow font-bold tracking-widest uppercase text-[16px] leading-tight text-center px-2">
        {label}
      </span>
    </>
  );

  return (
    <>
      <style>{`
        @keyframes arrowSlide {
          0%   { opacity: 0; transform: translateX(0px); }
          100% { opacity: 1; transform: translateX(10px); }
        }
        .explore-btn:hover .explore-icon {
          animation: arrowSlide 1s linear infinite;
        }
      `}</style>
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="explore-btn inline-flex items-center w-[320px] h-[60px] bg-white rounded-none border-none cursor-pointer no-underline"
          style={{ boxShadow: '0px 5px 20px rgba(255,255,255,0.45)' }}
          aria-label={label}
        >
          {interior}
        </a>
      ) : (
        <Link
          to={href}
          className="explore-btn inline-flex items-center w-[320px] h-[60px] bg-white rounded-none border-none cursor-pointer no-underline"
          style={{ boxShadow: '0px 5px 20px rgba(255,255,255,0.45)' }}
          aria-label={label}
        >
          {interior}
        </Link>
      )}
    </>
  );
}
