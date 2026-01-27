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
  { icon: GraduationCap, label: "Teacher", delay: 0 },
  { icon: Code, label: "Learning to code", delay: 100 },
  { icon: Guitar, label: "Guitar", delay: 200 },
  { icon: Mountain, label: "Travel", delay: 300 },
  { icon: BookOpen, label: "Reading", delay: 400 },
  { icon: Sprout, label: "Growth", delay: 500 },
  { icon: Brain, label: "Government exams", delay: 600 },
  { icon: Video, label: "Editing & influence", delay: 700 },
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

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 px-6 flex items-center bg-background"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground/80 mb-6">
          The Path She's Walking
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
          Dreams unfolding at their own pace
        </p>

        {/* Dreams Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
          {dreams.map((dream, index) => {
            const Icon = dream.icon;
            return (
              <div
                key={dream.label}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${dream.delay}ms` }}
              >
                <div className="relative bg-card-gradient rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border/30 group-hover:border-primary/30 text-center">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lavender-light/0 to-blush/0 group-hover:from-lavender-light/20 group-hover:to-blush/10 transition-all duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 rounded-xl bg-accent/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <p className="font-medium text-foreground/80 text-sm md:text-base">
                      {dream.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational text */}
        <div
          className={`text-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-serif text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl mx-auto">
            Not everything needs to happen fast.
            <br />
            <span className="text-primary">But everything here is worth continuing.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
