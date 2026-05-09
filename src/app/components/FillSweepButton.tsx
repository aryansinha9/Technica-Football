import { Link } from 'react-router';

interface FillSweepButtonProps {
  to?: string;
  label?: string;
}

export default function FillSweepButton({ to = '/programs', label = 'View Programs' }: FillSweepButtonProps) {
  return (
    <>
      <style>{`
        .fill-sweep-btn {
          position: relative;
          padding: 0.7em 4em;
          font-size: 17px;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          color: #6b7280;
          z-index: 1;
          display: inline-block;
          font-family: 'Barlow', sans-serif;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          user-select: none;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .fill-sweep-btn > .sweep-span {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: -1;
          border: 3px solid #9ca3af;
          transition: border-color 0.3s;
        }
        .fill-sweep-btn > .sweep-span::before {
          content: "";
          display: block;
          position: absolute;
          width: 8%;
          height: 2000%;
          background: #f3f4f6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-60deg);
          transition: all 0.3s;
        }
        .fill-sweep-btn:hover > .sweep-span {
          border-color: #f0722b;
        }
        .fill-sweep-btn:hover > .sweep-span::before {
          transform: translate(-50%, -50%) rotate(-90deg);
          width: 2000%;
          background: #f0722b;
        }
        .fill-sweep-btn:hover {
          color: white;
        }
        .fill-sweep-btn:active > .sweep-span::before {
          background: #d4611f;
        }
      `}</style>
      <Link to={to} className="fill-sweep-btn" aria-label={label}>
        {label}
        <span className="sweep-span" />
      </Link>
    </>
  );
}
