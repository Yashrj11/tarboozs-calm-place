import { useEffect, useRef, useState } from 'react';
import MoonIcon from '../MoonIcon';

interface FallingParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'star' | 'moon' | 'sparkle';
  rotation: number;
}

const ClosingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [fallingParticles, setFallingParticles] = useState<FallingParticle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOpenMessage = () => {
    setIsMessageOpen(true);
    
    // Generate falling stars, moons, and sparkles - more intense!
    const particles: FallingParticle[] = [];
    const types: Array<'star' | 'moon' | 'sparkle'> = ['star', 'star', 'star', 'star', 'sparkle', 'sparkle', 'sparkle', 'moon', 'moon'];
    
    for (let i = 0; i < 80; i++) {
      // Create varied sizes - some tiny, some large
      const sizeCategory = Math.random();
      let size: number;
      if (sizeCategory < 0.3) {
        size = Math.random() * 8 + 4; // tiny: 4-12px
      } else if (sizeCategory < 0.7) {
        size = Math.random() * 12 + 10; // medium: 10-22px
      } else {
        size = Math.random() * 16 + 18; // large: 18-34px
      }
      
      particles.push({
        id: i,
        x: Math.random() * 100,
        size,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 4,
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * 360,
      });
    }
    setFallingParticles(particles);
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
    setFallingParticles([]);
  };

  const renderParticle = (particle: FallingParticle) => {
    if (particle.type === 'moon') {
      return (
        <div
          key={particle.id}
          className="absolute text-lavender-light/60 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: '-50px',
            fontSize: `${particle.size}px`,
            animation: `starFall ${particle.duration}s ease-in infinite`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        >
          🌙
        </div>
      );
    }
    
    if (particle.type === 'sparkle') {
      return (
        <div
          key={particle.id}
          className="absolute text-blush/70 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: '-50px',
            fontSize: `${particle.size * 0.8}px`,
            animation: `starFall ${particle.duration}s ease-in infinite, twinkle 1s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          ✧
        </div>
      );
    }

    return (
      <div
        key={particle.id}
        className="absolute text-primary/50 pointer-events-none"
        style={{
          left: `${particle.x}%`,
          top: '-50px',
          fontSize: `${particle.size}px`,
          animation: `starFall ${particle.duration}s ease-in infinite`,
          animationDelay: `${particle.delay}s`,
          transform: `rotate(${particle.rotation}deg)`,
        }}
      >
        ✦
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto text-center">
        {/* Moon animation */}
        <div
          className={`mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative inline-block">
            <MoonIcon size={70} className="sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px]" glowing />
            
            {/* Orbiting stars */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute -top-3 sm:-top-4 left-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-lavender-light animate-twinkle" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute top-1/2 -right-4 sm:-right-6 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-blush animate-twinkle animation-delay-600" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s' }}>
              <div className="absolute -bottom-2 left-1/4 w-1 h-1 rounded-full bg-primary/60 animate-twinkle animation-delay-1000" />
            </div>
          </div>
        </div>

        {/* Final message */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed px-2">
            You don't owe the world constant proof.
            <br />
            <span className="text-primary">Just keep becoming — in your own time.</span>
          </p>
        </div>

        {/* Decorative element */}
        <div
          className={`mt-10 sm:mt-12 md:mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-3 sm:gap-4">
            <span className="text-primary/40 animate-twinkle">✦</span>
            <span className="text-primary/60 animate-twinkle animation-delay-200">✦</span>
            <span className="text-primary/40 animate-twinkle animation-delay-400">✦</span>
          </div>
        </div>

        {/* Subtle footer */}
        <div
          className={`mt-16 sm:mt-20 md:mt-24 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-12 sm:w-16 h-px mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-muted-foreground/50 tracking-widest">
            with quiet affection
          </p>
        </div>

        {/* Special birthday button */}
        <div
          className={`mt-16 sm:mt-20 md:mt-24 transition-all duration-1500 delay-1500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative inline-block group">
            {/* Soft ambient glow behind button */}
            <div 
              className="absolute -inset-6 sm:-inset-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(var(--lavender-light) / 0.25) 0%, transparent 70%)',
              }}
            />
            
            {/* Decorative stars around button */}
            <span className="absolute -top-4 -left-4 text-[8px] text-primary/30 animate-twinkle">✦</span>
            <span className="absolute -top-3 -right-6 text-[6px] text-blush/40 animate-twinkle animation-delay-400">✦</span>
            <span className="absolute -bottom-3 -left-6 text-[6px] text-primary/25 animate-twinkle animation-delay-800">✦</span>
            
            <button
              onClick={handleOpenMessage}
              className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-primary/20 bg-card/50 backdrop-blur-sm group-hover:border-primary/40 group-hover:bg-card/70 transition-all duration-500 shadow-soft group-hover:shadow-glow"
            >
              {/* Inner glow on hover */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(var(--blush) / 0.15) 0%, transparent 70%)',
                }}
              />
              
              <span className="relative font-serif text-sm sm:text-base text-foreground/60 group-hover:text-foreground/80 transition-colors duration-500 italic tracking-wide">
                open this only if it's your day
              </span>
            </button>
          </div>
          
          {/* Subtle hint text */}
          <p className="mt-4 text-[9px] sm:text-[10px] text-muted-foreground/30 tracking-widest animate-breathe">
            ✧ a quiet gift ✧
          </p>
        </div>
      </div>

      {/* Birthday Message Overlay */}
      {isMessageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
          onClick={handleCloseMessage}
        >
          {/* Warm dimming overlay with gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(270 30% 10% / 0.7) 0%, hsl(270 30% 5% / 0.85) 100%)',
              animation: 'fadeIn 600ms ease-in forwards',
            }}
          />

          {/* Falling stars, moons, and sparkles */}
          {fallingParticles.map(renderParticle)}

          {/* Message card - responsive sizing, no scrollbars */}
          <div
            className="relative w-[90vw] max-w-xs sm:max-w-md md:max-w-lg bg-gradient-to-br from-card via-card to-secondary/20 rounded-2xl sm:rounded-[2rem] p-4 sm:p-10 md:p-12 shadow-glow z-10 border border-primary/10"
            style={{
              animation: 'messageCardFadeIn 800ms ease-out forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer glow */}
            <div 
              className="absolute -inset-6 sm:-inset-8 rounded-[2.5rem] sm:rounded-[3rem]"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(var(--lavender-light) / 0.2) 0%, hsl(var(--blush) / 0.1) 40%, transparent 70%)',
                animation: 'glowPulse 4s ease-in-out infinite',
                animationDelay: '800ms',
              }}
            />

            {/* Decorative corner stars */}
            <span className="absolute top-4 left-4 text-primary/30 text-sm animate-twinkle">✦</span>
            <span className="absolute top-4 right-4 text-blush/40 text-xs animate-twinkle animation-delay-400">✧</span>
            <span className="absolute bottom-4 left-4 text-primary/25 text-xs animate-twinkle animation-delay-600">✧</span>
            <span className="absolute bottom-4 right-4 text-lavender-light/30 text-sm animate-twinkle animation-delay-200">✦</span>

            {/* Message content */}
            <div className="relative z-10 text-center">
              {/* Opening line */}
              <p className="font-serif text-base sm:text-2xl md:text-3xl text-primary mb-2 sm:mb-8 italic">
                if today is yours —
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-8">
                <span className="w-4 sm:w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <span className="text-blush/50 text-[10px] sm:text-xs">✧</span>
                <span className="w-4 sm:w-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>

              {/* Main message */}
              <div className="space-y-2 sm:space-y-6 font-sans text-xs sm:text-lg md:text-xl text-foreground/75 leading-relaxed">
                <p>drink the coffee while it's warm.</p>

                <p className="text-foreground/60">look at the moon without asking it for meaning.</p>

                <p>
                  rest — <span className="text-foreground/60">but don't stop just to stay comfortable.</span>
                </p>

                <p className="text-foreground/65">
                  the calm you're guarding was never meant to replace completion.
                </p>

                <p className="pt-1 sm:pt-4 text-primary/80 font-serif italic text-sm sm:text-xl md:text-2xl">
                  you don't owe the world performance. but you do owe yourself one honest finish.
                </p>
              </div>

              {/* Closing decoration */}
              <div className="mt-3 sm:mt-10 flex items-center justify-center gap-2">
                <span className="text-primary/40 text-[10px] sm:text-xs animate-twinkle">✦</span>
                <span className="text-blush/50 text-xs sm:text-sm animate-twinkle animation-delay-200">✧</span>
                <span className="text-primary/40 text-[10px] sm:text-xs animate-twinkle animation-delay-400">✦</span>
              </div>
            </div>
          </div>

          {/* Tap to close hint */}
          <p 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-foreground/30 tracking-widest"
            style={{ animation: 'fadeIn 1s ease-in 1.5s forwards', opacity: 0 }}
          >
            tap anywhere to close
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes messageCardFadeIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes starFall {
          0% { 
            opacity: 0;
            transform: translateY(-50px) rotate(0deg);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.8;
          }
          100% { 
            opacity: 0;
            transform: translateY(100vh) rotate(180deg);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
};

export default ClosingSection;