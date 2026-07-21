import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className={className}
    >
      {/* Top Hexagonal Chevron */}
      <path
        d="M50 0L100 30V45L50 15L0 45V30L50 0Z"
        fill="currentColor"
      />
      {/* Central Command Diamond */}
      <path
        d="M50 45L65 60L50 75L35 60L50 45Z"
        fill="currentColor"
      />
      {/* Left Interface Node */}
      <path
        d="M0 50V75H12V50H0Z"
        fill="currentColor"
      />
      {/* Right Interface Node */}
      <path
        d="M88 50V75H100V50H88Z"
        fill="currentColor"
      />
      {/* Bottom Structural Chevron */}
      <path
        d="M50 120L0 90V75L50 105L100 75V90L50 120Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;
