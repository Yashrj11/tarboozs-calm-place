import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

// First phase - what the world sees
const observedTraits = [
  "She loves mountains more than crowds.",
  "Coffee when thoughts feel heavy.",
  "Silence that speaks louder than words.",
  "Stories, moonlight, long scrolling nights.",
  "Learning — not to impress, but to grow.",
];

// Second phase - who she really is
const innerTraits = [
  "Teasing is her quiet way of showing love.",
  "She trusts the universe and its quiet timing.",
  "Her family is where her heart always returns.",
  "She dreams of mornings that begin with sunrise.",
  "Freedom, travel, and a life with no regrets.",
  "Building something big — in her own way.",
];

const IdentitySection = () => {
  const [phase, setPhase] = useState(0); // 0: nothing, 1: first traits, 2: transition, 3: second traits
  const [visibleFirst, setVisibleFirst] = useState<number[]>([]);
  const [visibleSecond, setVisibleSecond] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase(1);
            
            // Reveal first phase traits
            observedTraits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFirst((prev) => [...prev, index]);
              }, index * 350);
            });

            // After first phase, show transition
            setTimeout(() => {
              setPhase(2);
            }, observedTraits.length * 350 + 600);

            // Then reveal second phase traits
            setTimeout(() => {
              setPhase(3);
              innerTraits.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleSecond((prev) => [...prev, index]);
                }, index * 350);
              });
            }, observedTraits.length * 350 + 1400);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[100dvh] py-16 sm:py-20 md:py-24 px-4 sm:px-6 flex items-center bg-background"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Illustration */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 blur-3xl animate-pulse-soft" />
              <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                <path
                  d="M50,300 L130,180 L170,240 L200,150 L250,220 L350,300 Z"
                  fill="hsl(var(--primary))"
                  opacity="0.6"
                  className="animate-breathe"
                />
                <path
                  d="M80,300 L150,200 L200,260 L280,180 L320,300 Z"
                  fill="hsl(var(--primary))"
                  opacity="0.8"
                />
                <circle
                  cx="300"
                  cy="100"
                  r="30"
                  fill="hsl(var(--lavender-light))"
                  className="animate-pulse-soft"
                />
                <g transform="translate(100, 240)" className="animate-sway" style={{ transformOrigin: 'center bottom' }}>
                  <ellipse cx="35" cy="45" rx="30" ry="8" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                  <path
                    d="M10,10 L15,45 L55,45 L60,10 Z"
                    fill="hsl(var(--secondary))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  <path
                    d="M60,15 Q80,15 80,30 Q80,45 60,40"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  <path
                    d="M25,5 Q30,-5 25,-15 M35,5 Q40,-8 35,-18 M45,5 Q50,-5 45,-15"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="animate-float-slow"
                  />
                </g>
                <g transform="translate(230, 250)">
                  <rect x="0" y="0" width="60" height="40" rx="2" fill="hsl(var(--secondary))" />
                  <rect x="5" y="5" width="50" height="30" rx="1" fill="hsl(var(--background))" />
                  <line x1="30" y1="8" x2="30" y2="32" stroke="hsl(var(--border))" strokeWidth="1" />
                </g>
                {[
                  { x: 80, y: 80, delay: 0 },
                  { x: 150, y: 60, delay: 500 },
                  { x: 350, y: 150, delay: 1000 },
                  { x: 320, y: 200, delay: 1500 },
                  { x: 60, y: 150, delay: 750 },
                ].map((star, i) => (
                  <circle
                    key={i}
                    cx={star.x}
                    cy={star.y}
                    r="3"
                    fill="hsl(var(--primary))"
                    className="animate-twinkle"
                    style={{ animationDelay: `${star.delay}ms` }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            {/* Phase 1: Observable traits */}
            {observedTraits.map((trait, index) => (
              <p
                key={index}
                className={`font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed transition-all duration-700 ${
                  visibleFirst.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-primary/50 mr-2 text-xs sm:text-sm">✦</span>
                {trait}
              </p>
            ))}

            {/* Transition divider - breathing pause */}
            <div 
              className={`py-4 sm:py-6 flex items-center justify-center transition-all duration-1000 ${
                phase >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
                <Heart 
                  className={`w-3 h-3 sm:w-4 sm:h-4 text-primary/40 transition-all duration-1000 ${
                    phase >= 2 ? 'animate-pulse-soft scale-100' : 'scale-0'
                  }`} 
                  fill="currentColor"
                />
                <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
              </div>
            </div>

            {/* Phase 2: Inner traits - who she really is */}
            {innerTraits.map((trait, index) => (
              <p
                key={`inner-${index}`}
                className={`font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed transition-all duration-700 ${
                  visibleSecond.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-primary/60 mr-2 text-xs sm:text-sm">✦</span>
                {trait}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;