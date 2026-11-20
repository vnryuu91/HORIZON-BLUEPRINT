import { useId } from 'react';

interface BrandLogoProps {
  showWordmark?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function BrandLogo({
  showWordmark = true,
  size = 'md',
  className = '',
}: BrandLogoProps) {
  const uid = useId().replace(/:/g, '');
  const coreGradId = `hb-logo-core-${uid}`;
  const orbitGradId = `hb-logo-orbit-${uid}`;

  const iconSizeClass =
    size === 'sm'
      ? 'w-7 h-7 sm:w-8 sm:h-8'
      : 'w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10';

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className={`${iconSizeClass} shrink-0 transition-[filter,transform] duration-200 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.65)]`}
      >
        <defs>
          <linearGradient id={coreGradId} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#7000FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id={orbitGradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#7000FF" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
        </defs>

        {/* 1. Central Planetary / Quantum Core Circle */}
        <circle
          cx="50"
          cy="45"
          r="22"
          fill="none"
          stroke={`url(#${coreGradId})`}
          strokeWidth="6"
        />

        {/* 2. 45-degree Tilted Elliptical Orbit */}
        <ellipse
          cx="50"
          cy="45"
          rx="40"
          ry="14.5"
          transform="rotate(-45 50 45)"
          fill="none"
          stroke={`url(#${orbitGradId})`}
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* 3. Sharp 4-Point Quantum Spark at Core Center */}
        <path
          d="M50 31 L54 41 L64 45 L54 49 L50 59 L46 49 L36 45 L46 41 Z"
          fill="#00F0FF"
        />

        {/* 4. Tapered Horizon Arc across the Bottom */}
        <path d="M11 82 Q50 65 89 82 Q50 74 11 82 Z" fill="#00F0FF" />
      </svg>

      {showWordmark && (
        <span className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap leading-none">
          <span className="text-[#00F0FF]">HORIZON</span>{' '}
          <span className="bg-gradient-to-r from-[#A855F7] via-[#7000FF] to-[#00F0FF] bg-clip-text text-transparent">
            BLUEPRINT
          </span>
        </span>
      )}
    </span>
  );
}
