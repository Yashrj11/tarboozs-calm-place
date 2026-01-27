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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-gradient-to-b from-background via-secondary/10 to-background"
    >
      <div className="max-w-xl mx-auto text-center">
        {/* Moon animation */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="relative inline-block">
            <MoonIcon size={100} glowing />
            
            {/* Orbiting stars */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute -top-4 left-1/2 w-2 h-2 rounded-full bg-lavender-light" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute top-1/2 -right-6 w-1.5 h-1.5 rounded-full bg-blush" />
            </div>
          </div>
        </div>

        {/* Final message */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed">
            You don't owe the world constant proof.
            <br />
            <span className="text-primary">Just keep becoming — in your own time.</span>
          </p>
        </div>

        {/* Subtle footer */}
        <div
          className={`mt-24 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <p className="mt-6 text-xs text-muted-foreground/50 tracking-widest">
            with quiet affection
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
