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

  return (
    <section className="min-h-screen py-24 px-6 flex items-center bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground/80 mb-16">
          Quiet Strength
        </h2>

        <div className="relative">
          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl bg-card-gradient shadow-card backdrop-blur-sm border border-border/50 p-8 md:p-16 min-h-[300px] flex items-center justify-center">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-lavender-light/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blush/20 blur-3xl" />

            {/* Quote */}
            <div
              className={`relative z-10 text-center transition-all duration-500 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed whitespace-pre-line">
                {quotes[currentIndex].text}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-card hover:bg-accent transition-colors shadow-soft"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5 text-foreground/70" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-primary'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-card hover:bg-accent transition-colors shadow-soft"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5 text-foreground/70" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShayariSection;
