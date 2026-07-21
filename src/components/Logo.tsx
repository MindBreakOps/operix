import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className={className}
    >
      {/* Top Hexagonal Frame Segment 1 */}
      <path
        d="M50 0L100 28.87V57.74L50 28.87L0 57.74V28.87L50 0Z"
        fill="currentColor"
      />

      {/* Middle Chevron Segment 2 */}
      <path
        d="M50 35L100 63.87V78.3L50 49.43L0 78.3V63.87L50 35Z"
        fill="currentColor"
        fillOpacity="0.8"
      />

      {/* Bottom Structural Chevron (Gold) */}
      <path
        d="M50 65L100 93.87V115L50 86.13L0 115V93.87L50 65Z"
        fill="#c5a059"
      />

      {/* Technical Detail: Center Alignment Dot */}
      <circle cx="50" cy="57.74" r="2" fill="#c5a059" opacity="0.5" />
    </svg>
  );
};

export default Logo;
