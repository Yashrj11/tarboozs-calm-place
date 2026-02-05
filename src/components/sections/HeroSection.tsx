import MoonIcon from '../MoonIcon';
import MountainSilhouette from '../MountainSilhouette';

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-hero-gradient"
      aria-label="Birthday greeting"
    >
      {/* Decorative sparkles */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-lavender-light animate-twinkle" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-blush animate-twinkle animation-delay-400" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/6 w-1 h-1 rounded-full bg-primary/60 animate-twinkle animation-delay-800" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-lavender animate-twinkle animation-delay-600" aria-hidden="true" />
      
      {/* Moon */}
      <div className="absolute top-12 right-6 sm:top-16 sm:right-12 md:top-24 md:right-24 lg:top-32 lg:right-32 animate-float-slow" aria-hidden="true">
        <MoonIcon size={60} className="sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]" glowing />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
        <p className="text-foreground/60 text-xs sm:text-sm md:text-base tracking-widest uppercase mb-6 sm:mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          A small birthday space, just for you.
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground/95 mb-4 sm:mb-6 animate-fade-in-up opacity-0 leading-tight" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Happy Birthday Riya
        </h1>

        <p className="text-foreground/65 text-base sm:text-lg md:text-xl font-light animate-fade-in-up opacity-0 px-2" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          Take your time. Nothing here needs rushing.
        </p>

        {/* Cute decorative element */}
        <div className="mt-8 sm:mt-12 animate-fade-in-up opacity-0" style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }} aria-hidden="true">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-primary/60 animate-heart-beat">✿</span>
            <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>
        
        {/* Subtle scroll hint */}
        <div className="mt-16 sm:mt-20 animate-fade-in-up opacity-0" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
          <p className="text-foreground/30 text-[10px] sm:text-xs tracking-widest animate-breathe">
            scroll gently ↓
          </p>
        </div>
      </div>


      {/* Mountain Silhouette */}
      <MountainSilhouette />
    </section>
  );
};

export default HeroSection;