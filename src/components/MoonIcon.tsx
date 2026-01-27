interface MoonIconProps {
  size?: number;
  className?: string;
  glowing?: boolean;
}

const MoonIcon = ({ size = 60, className = '', glowing = true }: MoonIconProps) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {glowing && (
        <>
          {/* Outer glow */}
          <div 
            className="absolute inset-0 rounded-full animate-pulse-soft"
            style={{
              background: 'radial-gradient(circle, hsl(270 50% 85% / 0.6) 0%, transparent 70%)',
              transform: 'scale(2)',
            }}
          />
          {/* Inner glow */}
          <div 
            className="absolute inset-0 rounded-full animate-breathe"
            style={{
              background: 'radial-gradient(circle, hsl(330 60% 90% / 0.4) 0%, transparent 60%)',
              transform: 'scale(1.5)',
            }}
          />
        </>
      )}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative z-10 w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 50% 90%)" />
            <stop offset="100%" stopColor="hsl(270 45% 80%)" />
          </linearGradient>
        </defs>
        <path
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          fill="url(#moonGradient)"
          stroke="hsl(270 40% 75%)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};

export default MoonIcon;
