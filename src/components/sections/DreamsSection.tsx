import { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  Code, 
  Guitar, 
  Mountain, 
  BookOpen, 
  Sprout, 
  Brain, 
  Video 
} from 'lucide-react';

const dreams = [
  { icon: GraduationCap, label: "Teaching, in her own way", delay: 0 },
  { icon: Code, label: "Learning how things work", delay: 100 },
  { icon: Guitar, label: "Music, when words feel heavy", delay: 200 },
  { icon: Mountain, label: "Going where the mind breathes", delay: 300 },
  { icon: BookOpen, label: "Stories that stay longer than people", delay: 400 },
  { icon: Sprout, label: "Becoming, without rushing", delay: 500 },
  { icon: Brain, label: "Trying, even when it's hard", delay: 600 },
  { icon: Video, label: "Creating things that feel honest", delay: 700 },
];

const DreamsSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Staggered layout - cards 2,3,4,5 (indices 2,3,4,5) are taller
  const isTallerCard = (index: number) => index >= 2 && index <= 5;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 px-6 flex items-center bg-background"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground/80 mb-6">
          Things She Moves Toward
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
          Not destinations — just directions that feel right.
        </p>

        {/* Dreams Grid - Staggered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-12">
          {dreams.map((dream, index) => {
            const Icon = dream.icon;
            const isTall = isTallerCard(index);
            
            return (
              <div
                key={dream.label}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${isTall ? 'md:-mt-3' : 'md:mt-3'}`}
                style={{ transitionDelay: `${dream.delay}ms` }}
              >
                <div className={`relative bg-background rounded-2xl ${isTall ? 'p-7 md:p-9' : 'p-6 md:p-8'} border border-border/20 hover:border-border/40 transition-all duration-500 text-center`}>
                  <div className="relative z-10">
                    <div className="w-11 h-11 md:w-12 md:h-12 mx-auto mb-5 rounded-xl bg-accent/30 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary/80" />
                    </div>
                    <p className="font-sans text-foreground/70 text-sm md:text-base leading-relaxed group-hover:text-foreground/85 transition-opacity duration-500">
                      {dream.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-muted-foreground text-sm md:text-base">
            Some paths don't need announcing. They just need continuing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
