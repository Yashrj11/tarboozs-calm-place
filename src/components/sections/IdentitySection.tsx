import { useEffect, useRef, useState } from 'react';

const traits = [
  "She loves mountains more than crowds.",
  "Coffee when thoughts feel heavy.",
  "Silence that speaks louder than words.",
  "Stories, moonlight, long scrolling nights.",
  "Learning — not to impress, but to grow.",
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
      className="min-h-screen py-24 px-6 flex items-center bg-background"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Illustration */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lavender-light/40 to-blush-light/40 blur-3xl" />
              
              {/* Decorative elements */}
              <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                {/* Mountains */}
                <path
                  d="M50,300 L130,180 L170,240 L200,150 L250,220 L350,300 Z"
                  fill="hsl(270 30% 75%)"
                  opacity="0.6"
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
                
                {/* Coffee cup */}
                <g transform="translate(100, 240)">
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
                  {/* Steam */}
                  <path
                    d="M25,5 Q30,-5 25,-15 M35,5 Q40,-8 35,-18 M45,5 Q50,-5 45,-15"
                    fill="none"
                    stroke="hsl(270 30% 75%)"
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="animate-breathe"
                  />
                </g>
                
                {/* Book */}
                <g transform="translate(230, 250)">
                  <rect x="0" y="0" width="60" height="40" rx="2" fill="hsl(330 40% 85%)" />
                  <rect x="5" y="5" width="50" height="30" rx="1" fill="hsl(330 30% 95%)" />
                  <line x1="30" y1="8" x2="30" y2="32" stroke="hsl(330 30% 80%)" strokeWidth="1" />
                </g>
                
                {/* Stars */}
                {[
                  { x: 80, y: 80 },
                  { x: 150, y: 60 },
                  { x: 350, y: 150 },
                  { x: 320, y: 200 },
                ].map((star, i) => (
                  <circle
                    key={i}
                    cx={star.x}
                    cy={star.y}
                    r="3"
                    fill="hsl(270 50% 80%)"
                    className="animate-pulse-soft"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 md:order-2">
            {traits.map((trait, index) => (
              <p
                key={index}
                className={`font-serif text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed transition-all duration-700 ${
                  visibleLines.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
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
