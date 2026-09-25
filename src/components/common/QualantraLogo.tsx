import React from 'react';

interface QualantraLogoProps {
  variant?: 'compact' | 'full' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  className?: string;
}

export const QualantraLogo: React.FC<QualantraLogoProps> = ({
  variant = 'compact',
  size = 'md',
  theme = 'dark',
  className = '',
}) => {
  const iconSizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const textSizeClasses = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  }[size];

  const isLight = theme === 'light';

  // Primary colors based on theme
  const strokeColor = isLight ? '#FFFFFF' : '#1C1917';
  const goldColor = isLight ? '#E7A868' : '#8C5E38';
  const goldAccent = isLight ? '#F5D0A9' : '#A36F45';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 
        NEW & UNIQUE QUALANTRA EMBLEM:
        An interlocking geometric monogram representing "Learn. Teach. Connect":
        - An unbroken outer celestial ring representing the inclusive, synchronous classroom
        - A central diamond beacon representing the dedicated qualified educator
        - Ten harmoniously aligned learner constellation nodes surrounding the educator
        - A dynamic upward diagonal bridge cutting through the lower-right quadrant to form
          the iconic letter 'Q' (symbolizing educational elevation and the bridge between
          learners and accredited teachers).
      */}
      <div
        className={`relative ${iconSizeClasses} rounded-xl overflow-hidden shrink-0 flex items-center justify-center transition-transform hover:scale-105 ${
          isLight
            ? 'bg-white/10 border border-white/25 shadow-sm'
            : 'bg-white border border-[#E7E3DA] shadow-xs'
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Subtle background glow circle */}
          <circle
            cx="22"
            cy="22"
            r="16"
            fill={isLight ? 'rgba(231, 168, 104, 0.12)' : 'rgba(140, 94, 56, 0.08)'}
          />

          {/* Primary Q Ring: Bold, elegant circular arc */}
          <circle
            cx="22"
            cy="22"
            r="14"
            stroke={strokeColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Inner Golden Pod Arc (Representing the synchronous learning pod) */}
          <path
            d="M14 22C14 17.5817 17.5817 14 22 14C26.4183 14 30 17.5817 30 22C30 26.4183 26.4183 30 22 30"
            stroke={goldColor}
            strokeWidth="2.2"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />

          {/* Central Educator Beacon (Diamond geometry) */}
          <path
            d="M22 18L25.5 22L22 26L18.5 22Z"
            fill={goldColor}
          />

          {/* Ascending Bridge Vector / Q-Tail: Dynamic diagonal beam */}
          <path
            d="M25 25L39 39"
            stroke={goldColor}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Elevation Apex Arrowhead on the Q Tail */}
          <path
            d="M32 39H39V32"
            stroke={goldAccent}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ten subtle constellation learner nodes around the upper arc */}
          {/* Dot 1 */}
          <circle cx="12" cy="16" r="1.3" fill={goldColor} />
          {/* Dot 2 */}
          <circle cx="14" cy="11" r="1.3" fill={goldColor} />
          {/* Dot 3 */}
          <circle cx="18" cy="8" r="1.3" fill={goldColor} />
          {/* Dot 4 */}
          <circle cx="22" cy="7" r="1.3" fill={goldColor} />
          {/* Dot 5 */}
          <circle cx="26" cy="8" r="1.3" fill={goldColor} />
          {/* Dot 6 */}
          <circle cx="30" cy="11" r="1.3" fill={goldColor} />
          {/* Dot 7 */}
          <circle cx="32" cy="16" r="1.3" fill={goldColor} />
          {/* Dot 8 */}
          <circle cx="31" cy="27" r="1.3" fill={goldColor} />
          {/* Dot 9 */}
          <circle cx="13" cy="27" r="1.3" fill={goldColor} />
          {/* Dot 10 */}
          <circle cx="10" cy="22" r="1.3" fill={goldColor} />
        </svg>
      </div>

      {/* Typographic Wordmark & Tagline */}
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif ${textSizeClasses} font-normal tracking-wide leading-none ${
                isLight ? 'text-white' : 'text-[#1C1917]'
              }`}
            >
              QUALANTRA
            </span>
          </div>
          {variant === 'full' && (
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest mt-1.5 ${
                isLight ? 'text-[#E7A868]' : 'text-[#8C5E38]'
              }`}
            >
              Learn · Teach · Connect
            </span>
          )}
        </div>
      )}
    </div>
  );
};
