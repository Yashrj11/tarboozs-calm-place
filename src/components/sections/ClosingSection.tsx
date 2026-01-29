import { useEffect, useRef, useState } from 'react';
import MoonIcon from '../MoonIcon';

interface DustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const ClosingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);
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
    
    // Generate subtle dust particles
    const particles: DustParticle[] = [];
    for (let i = 0; i < 12; i++) {
      particles.push({
        id: i,
        x: 30 + Math.random() * 40,
        y: 50 + Math.random() * 30,
        size: Math.random() * 2 + 1,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 2,
      });
    }
    setDustParticles(particles);

    // Fade out particles after 7 seconds
    setTimeout(() => {
      setDustParticles([]);
    }, 7000);
  };

  const handleCloseMessage = () => {
    setIsMessageOpen(false);
    setDustParticles([]);
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

        {/* Hidden birthday button */}
        <div
          className={`mt-12 sm:mt-16 transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleOpenMessage}
            className="text-[10px] sm:text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-opacity duration-300 font-sans lowercase tracking-wide"
          >
            open this only if it's your day
          </button>
        </div>
      </div>

      {/* Birthday Message Overlay */}
      {isMessageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={handleCloseMessage}
        >
          {/* Warm dimming overlay */}
          <div 
            className="absolute inset-0 bg-foreground/20"
            style={{
              animation: 'fadeIn 500ms ease-in forwards',
            }}
          />

          {/* Dust particles */}
          {dustParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-blush/30"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `dustFloat ${particle.duration}s ease-out forwards`,
                animationDelay: `${particle.delay}s`,
                opacity: 0,
              }}
            />
          ))}

          {/* Message card */}
          <div
            className="relative max-w-xs sm:max-w-sm md:max-w-md bg-card/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft z-10"
            style={{
              animation: 'messageCardFadeIn 600ms ease-out forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Soft glow around card */}
            <div 
              className="absolute -inset-4 rounded-3xl sm:rounded-[2rem] opacity-0"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(var(--lavender-light) / 0.15) 0%, transparent 70%)',
                animation: 'glowPulse 4s ease-in-out infinite',
                animationDelay: '600ms',
              }}
            />

            {/* Message content */}
            <div className="relative z-10 text-center sm:text-left">
              <p className="font-sans text-sm sm:text-base md:text-lg text-foreground/80 leading-[1.8] sm:leading-[2] whitespace-pre-line">
                {`if today is yours —

drink the coffee while it's warm.
look at the moon without naming it peace.

rest, yes —
but don't stop just to stay comfortable.

the calm you're protecting
was never meant to replace finishing.

you don't owe the world noise.
but you do owe yourself one complete thing.`}
              </p>
            </div>
          </div>
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
            transform: scale(0.98) translateY(10px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes dustFloat {
          0% { 
            opacity: 0;
            transform: translateY(0);
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.1;
          }
          100% { 
            opacity: 0;
            transform: translateY(-60px);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default ClosingSection;