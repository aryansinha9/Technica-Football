import { Link } from 'react-router';
import './AnimatedCTA.css';

interface AnimatedCTAProps {
  href: string;
  label: string;
  className?: string;
}

export default function AnimatedCTA({ href, label, className = '' }: AnimatedCTAProps) {
  return (
    <Link to={href} className={`animated-cta-btn animated-cta-btn-item ${className}`}>
      <span className="animated-cta-btn-bg">
        <span className="animated-cta-btn-bg-layers">
          <span className="animated-cta-btn-bg-layer animated-cta-btn-bg-layer-1 -layer1"></span>
          <span className="animated-cta-btn-bg-layer animated-cta-btn-bg-layer-2 -layer2"></span>
          <span className="animated-cta-btn-bg-layer animated-cta-btn-bg-layer-3 -layer3"></span>
        </span>
      </span>
      <span className="animated-cta-btn-inner">
        <span className="animated-cta-btn-inner-static">{label}</span>
        <span className="animated-cta-btn-inner-hover">{label}</span>
      </span>
    </Link>
  );
}
