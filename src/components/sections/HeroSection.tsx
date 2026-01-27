import MoonIcon from '../MoonIcon';
import MountainSilhouette from '../MountainSilhouette';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Moon */}
      <div className="absolute top-20 right-20 md:top-32 md:right-32 animate-float-slow">
        <MoonIcon size={80} glowing />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p className="text-muted-foreground text-sm md:text-base tracking-widest uppercase mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          For someone who loves calm more than noise
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Happy Birthday <span className="inline-block animate-pulse-soft">🌙</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl font-light animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
          Take your time. Nothing here needs rushing.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 animate-fade-in-up opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-muted-foreground text-xs tracking-widest">scroll gently</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-breathe" />
          </div>
        </div>
      </div>

      {/* Mountain Silhouette */}
      <MountainSilhouette />
    </section>
  );
};

export default HeroSection;
