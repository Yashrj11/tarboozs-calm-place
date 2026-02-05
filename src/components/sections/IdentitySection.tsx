import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// What the world sees - the observable
const observedTraits = [
  "She loves mountains more than crowds.",
  "Coffee when thoughts feel heavy.",
  "Silence that speaks louder than words.",
  "Stories, moonlight, long scrolling nights.",
  "Learning — not to impress, but to grow.",
];

// Who she really is - the inner
const innerTraits = [
  "Teasing is her quiet way of showing love.",
  "She trusts the universe and its quiet timing.",
  "Her family is where her heart always returns.",
  "She dreams of mornings that begin with sunrise.",
  "Freedom, travel, and a life with no regrets.",
  "Building something big — in her own way.",
];

const IdentitySection = () => {
  const [showInner, setShowInner] = useState(false);
  const [visibleTraits, setVisibleTraits] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currentTraits = showInner ? innerTraits : observedTraits;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Reveal traits one by one
            currentTraits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleTraits((prev) => [...prev, index]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, currentTraits]);

  // Handle toggle - animate new traits
  const handleToggle = () => {
    setVisibleTraits([]);
    setShowInner(!showInner);
    
    // Animate new traits after toggle
    const newTraits = !showInner ? innerTraits : observedTraits;
    newTraits.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTraits((prev) => [...prev, index]);
      }, index * 250);
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="About her personality"
      className="min-h-[100dvh] py-20 sm:py-24 md:py-28 px-4 sm:px-6 flex items-center bg-background"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-24 items-center">
          {/* Illustration */}
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/30 blur-3xl animate-pulse-soft" />
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full relative z-10"
                role="img"
                aria-label="Decorative illustration with mountains, coffee, and moon"
              >
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

          {/* Text Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-2">
            {/* Traits list */}
            {currentTraits.map((trait, index) => (
              <p
                key={`${showInner ? 'inner' : 'observed'}-${index}`}
                className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2rem] text-foreground/85 leading-relaxed transition-all duration-700 motion-reduce:transition-none ${
                  visibleTraits.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-primary/60 mr-2 sm:mr-3 text-sm sm:text-base" aria-hidden="true">✦</span>
                {trait}
              </p>
            ))}

            {/* Toggle Button - similar to music/gallery */}
            <div 
              className={`pt-8 sm:pt-10 md:pt-12 flex justify-start transition-all duration-1000 ${
                visibleTraits.length >= currentTraits.length ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Button
                variant="ghost"
                onClick={handleToggle}
                aria-pressed={showInner}
                className="group px-5 sm:px-6 py-2.5 sm:py-3 h-auto rounded-full border-2 border-primary/40 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 shadow-soft hover:shadow-glow transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {showInner ? (
                  <Heart className="w-4 h-4 mr-2 text-primary group-hover:text-primary transition-colors" fill="currentColor" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2 text-primary group-hover:text-primary transition-colors" />
                )}
                <span className="text-sm sm:text-base font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {showInner ? 'what the world sees' : 'but who she really is'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;