import { useEffect, useRef, useState } from 'react';

const traits = [
  "She smiles most in the smallest, home-kind moments",
  "Teasing is her quiet way of showing love",
  "Her family is where her heart always returns",
  "She dreams of mornings that begin with sunrise",
  "Freedom, travel, and a life with no regrets",
  "Building something big — in her own way",
];

const IdentitySection = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            traits.forEach((_, index) => {
              setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
              }, index * 400);
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
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lavender-light/40 to-blush-light/40 blur-3xl animate-pulse-soft" />
              
              {/* Decorative elements */}
              <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                {/* Mountains */}
                <path
                  d="M50,300 L130,180 L170,240 L200,150 L250,220 L350,300 Z"
                  fill="hsl(270 30% 75%)"
                  opacity="0.6"
                  className="animate-breathe"
                />
                <path
                  d="M80,300 L150,200 L200,260 L280,180 L320,300 Z"
                  fill="hsl(270 35% 65%)"
                  opacity="0.8"
                />
                
                {/* Moon */}
                <circle
                  cx="300"
                  cy="100"
                  r="30"
                  fill="hsl(270 50% 88%)"
                  className="animate-pulse-soft"
                />
                
                {/* Coffee cup with gentle sway */}
                <g transform="translate(100, 240)" className="animate-sway" style={{ transformOrigin: 'center bottom' }}>
                  <ellipse cx="35" cy="45" rx="30" ry="8" fill="hsl(30 20% 60%)" opacity="0.5" />
                  <path
                    d="M10,10 L15,45 L55,45 L60,10 Z"
                    fill="hsl(30 30% 85%)"
                    stroke="hsl(30 20% 70%)"
                    strokeWidth="2"
                  />
                  <path
                    d="M60,15 Q80,15 80,30 Q80,45 60,40"
                    fill="none"
                    stroke="hsl(30 20% 70%)"
                    strokeWidth="2"
                  />
                  {/* Steam with animation */}
                  <path
                    d="M25,5 Q30,-5 25,-15 M35,5 Q40,-8 35,-18 M45,5 Q50,-5 45,-15"
                    fill="none"
                    stroke="hsl(270 30% 75%)"
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="animate-float-slow"
                  />
                </g>
                
                {/* Book */}
                <g transform="translate(230, 250)">
                  <rect x="0" y="0" width="60" height="40" rx="2" fill="hsl(330 40% 85%)" />
                  <rect x="5" y="5" width="50" height="30" rx="1" fill="hsl(330 30% 95%)" />
                  <line x1="30" y1="8" x2="30" y2="32" stroke="hsl(330 30% 80%)" strokeWidth="1" />
                </g>
                
                {/* Twinkling Stars */}
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
                    fill="hsl(270 50% 80%)"
                    className="animate-twinkle"
                    style={{ animationDelay: `${star.delay}ms` }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 order-1 lg:order-2">
            {traits.map((trait, index) => (
              <p
                key={index}
                className={`font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed transition-all duration-700 ${
                  visibleLines.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-primary/60 mr-2 text-sm">✦</span>
                {trait}
              </p>
            ))}
            
            {/* Closing paragraph */}
            <div
              className={`mt-8 sm:mt-10 space-y-2 font-serif text-base sm:text-lg md:text-xl text-foreground/60 leading-relaxed transition-all duration-700 delay-500 ${
                visibleLines.length === traits.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <p>She's always been someone who belongs to simple joys.</p>
              <p className="text-foreground/50">Not the loud kind — the real kind.</p>
              <p className="text-foreground/50">The kind that lives in warm cups, soft evenings,</p>
              <p className="text-foreground/50">and the space to just be.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;