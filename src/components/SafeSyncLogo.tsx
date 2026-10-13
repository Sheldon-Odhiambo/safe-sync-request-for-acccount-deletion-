import React, { useState } from 'react';

export const SAFESYNC_LOGO_URL = 'https://res.cloudinary.com/di15s67o/image/upload/v1783362406/safesync-logo_ooeqqg.png';

interface SafeSyncLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'icon' | 'horizontal';
}

export const SafeSyncLogo: React.FC<SafeSyncLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'full',
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension presets for the Cloudinary image
  const imageSizes = {
    sm: 'h-10 w-auto max-w-[120px]',
    md: 'h-24 w-auto max-w-[190px]',
    lg: 'h-36 w-auto max-w-[280px]',
    xl: 'h-48 w-auto max-w-[360px]',
  }[size];

  const iconSizes = {
    sm: 32,
    md: 56,
    lg: 84,
    xl: 120,
  }[size];

  // Vector fallback if image fails to load or during offline testing
  const fallbackSvg = (
    <svg
      width={iconSizes}
      height={iconSizes}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-label="SafeSync Alert Emblem"
    >
      <path d="M 23 29 A 44 44 0 0 0 23 71" stroke="#002B66" strokeWidth="7" strokeLinecap="round" />
      <path d="M 77 29 A 44 44 0 0 1 77 71" stroke="#002B66" strokeWidth="7" strokeLinecap="round" />
      <path d="M 37 13.5 A 44 44 0 0 1 63 13.5" stroke="#002B66" strokeWidth="7" strokeLinecap="round" />
      <path d="M 37 86.5 A 44 44 0 0 0 63 86.5" stroke="#002B66" strokeWidth="7" strokeLinecap="round" />
      <circle cx="50" cy="50" r="33" fill="#DE1123" />
      <path d="M 47.2 28.5 C 47.2 27 48.4 26 50 26 C 51.6 26 52.8 27 52.8 28.5 L 52.2 52 C 52.2 53.2 51.2 54.2 50 54.2 C 48.8 54.2 47.8 53.2 47.8 52 Z" fill="#FFFFFF" />
      <circle cx="50" cy="62" r="3.6" fill="#FFFFFF" />
      <path d="M 30.5 40 C 27.5 46 27.5 54 30.5 60" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 36.5 43.5 C 34.5 47.5 34.5 52.5 36.5 56.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 63.5 43.5 C 65.5 47.5 65.5 52.5 63.5 56.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 69.5 40 C 72.5 46 72.5 54 69.5 60" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );

  // If image fails to load, render resilient vector representation
  if (imageError) {
    if (variant === 'icon') {
      return <div className={`inline-flex items-center ${className}`}>{fallbackSvg}</div>;
    }
    return (
      <div className={`inline-flex flex-col items-center text-center ${className}`}>
        {fallbackSvg}
        <div className="font-extrabold tracking-tight leading-none mt-2 text-2xl">
          <span className="text-[#002B66]">Safe</span>
          <span className="text-[#DE1123]">Sync</span>
        </div>
        {showTagline && (
          <div className="font-semibold text-xs tracking-wide flex items-center gap-1.5 mt-1 text-[#002B66]">
            <span>—</span>
            <span>Every Second Matters.</span>
            <span className="text-[#DE1123]">Every Life Counts.</span>
            <span>—</span>
          </div>
        )}
      </div>
    );
  }

  // Variant for horizontal top bar / footer display
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={SAFESYNC_LOGO_URL}
          alt="SafeSync Logo"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="h-10 w-auto object-contain transition-transform"
        />
      </div>
    );
  }

  // Variant for pure icon crop
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}>
        <img
          src={SAFESYNC_LOGO_URL}
          alt="SafeSync"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="h-10 w-10 object-cover object-top scale-120"
        />
      </div>
    );
  }

  // Full default stacked logo view (Hero display)
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <img
        src={SAFESYNC_LOGO_URL}
        alt="SafeSync - Every Second Matters. Every Life Counts."
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
        className={`${imageSizes} object-contain transition-transform hover:scale-[1.02] duration-200 drop-shadow-2xs`}
      />
    </div>
  );
};
