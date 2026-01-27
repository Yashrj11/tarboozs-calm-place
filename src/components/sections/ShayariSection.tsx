import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const quotes = [
  {
    text: "Some people bloom quietly —\nand still change the whole season.",
    type: "reflection"
  },
  {
    text: "You don't need speed.\nYou need direction — and you already have it.",
    type: "motivation"
  },
  {
    text: "Gentle doesn't mean weak.\nIt means controlled strength.",
    type: "strength"
  },
  {
    text: "धीरे-धीरे रहना सीखो,\nजल्दी में जिंदगी छूट जाती है।",
    type: "shayari"
  },
  {
    text: "The mountain doesn't rush to the sky.\nIt simply rises, day after day.",
    type: "patience"
  },
  {
    text: "Not all storms are meant to destroy —\nsome just clear the path ahead.",
    type: "hope"
  },
  {
    text: "खुद से मिलने का वक्त निकालो,\nवो रिश्ता सबसे खास है।",
    type: "shayari"
  },
];

const ShayariSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(null);
  };

  return (
    <section className="min-h-[100dvh] py-16 sm:py-20 md:py-24 px-4 sm:px-6 flex items-center bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground/80 mb-10 sm:mb-16">
          <span className="inline-block animate-float-slow">✨</span>
          <span className="mx-3">Quiet Strength</span>
          <span className="inline-block animate-float-slow animation-delay-400">✨</span>
        </h2>

        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card-gradient shadow-card backdrop-blur-sm border border-border/50 p-6 sm:p-8 md:p-12 lg:p-16 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 text-primary/20 text-lg sm:text-xl">❝</div>
            <div className="absolute bottom-4 right-4 text-primary/20 text-lg sm:text-xl">❞</div>
            
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-lavender-light/20 blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 rounded-full bg-blush/20 blur-3xl animate-pulse-soft animation-delay-1000" />

            {/* Quote */}
            <div
              className={`relative z-10 text-center transition-all duration-500 ${
                isAnimating ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed whitespace-pre-line">
                {quotes[currentIndex].text}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            <button
              onClick={handlePrev}
              className="p-2.5 sm:p-3 rounded-full bg-card hover:bg-accent transition-all duration-300 shadow-soft touch-target active:scale-95"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 touch-target ${
                    index === currentIndex
                      ? 'w-4 sm:w-6 bg-primary'
                      : 'w-1.5 sm:w-2 bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 sm:p-3 rounded-full bg-card hover:bg-accent transition-all duration-300 shadow-soft touch-target active:scale-95"
              aria-label="Next quote"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/70" />
            </button>
          </div>

          {/* Swipe hint for mobile */}
          <p className="text-center text-muted-foreground/50 text-xs mt-4 sm:hidden">
            swipe to navigate
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShayariSection;