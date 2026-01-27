const MountainSilhouette = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-auto"
        preserveAspectRatio="none"
        style={{ minHeight: '200px' }}
      >
        <defs>
          <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 25% 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(270 30% 40%)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 20% 45%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(270 25% 35%)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="mountainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(270 15% 40%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(270 20% 30%)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        
        {/* Back mountain layer */}
        <path
          d="M0,224 L120,192 L240,256 L360,176 L480,224 L600,160 L720,208 L840,144 L960,192 L1080,160 L1200,224 L1320,176 L1440,208 L1440,320 L0,320 Z"
          fill="url(#mountainGradient1)"
        />
        
        {/* Middle mountain layer */}
        <path
          d="M0,256 L180,192 L300,272 L420,208 L540,256 L660,192 L780,248 L900,184 L1020,240 L1140,200 L1260,264 L1380,216 L1440,248 L1440,320 L0,320 Z"
          fill="url(#mountainGradient2)"
        />
        
        {/* Front mountain layer */}
        <path
          d="M0,288 L160,240 L280,296 L400,248 L520,280 L640,232 L760,272 L880,224 L1000,264 L1120,240 L1240,288 L1360,256 L1440,280 L1440,320 L0,320 Z"
          fill="url(#mountainGradient3)"
        />
      </svg>
    </div>
  );
};

export default MountainSilhouette;
