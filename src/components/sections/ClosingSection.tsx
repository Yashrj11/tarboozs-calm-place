import { useEffect, useRef, useState } from 'react';
import MoonIcon from '../MoonIcon';

const ClosingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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
      </div>
    </section>
  );
};

export default ClosingSection;