import { useState } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Primary gallery images
import moonlightWindow from '@/assets/gallery/moonlight-window.png';
import headphonesPeaceful from '@/assets/gallery/headphones-peaceful.png';
import guitarMoment from '@/assets/gallery/guitar-moment.png';
import mountainView from '@/assets/gallery/mountain-view.png';
import teachingKids from '@/assets/gallery/teaching-kids.png';
import readingCozy from '@/assets/gallery/reading-cozy.png';

// Secondary gallery images ("some more of me")
import savingsMoment from '@/assets/gallery/savings-moment.png';
import auroraNight from '@/assets/gallery/aurora-night.png';
import dressedUp from '@/assets/gallery/dressed-up.png';
import yogaStretch from '@/assets/gallery/yoga-stretch.png';
import lakeDock from '@/assets/gallery/lake-dock.png';
import streetArt from '@/assets/gallery/street-art.png';

// Primary gallery items
const primaryGalleryItems = [
  { id: 1, src: moonlightWindow, aspect: 'wide', alt: 'Moonlight by the window' },
  { id: 2, src: headphonesPeaceful, aspect: 'wide', alt: 'Peaceful with headphones' },
  { id: 3, src: guitarMoment, aspect: 'square', alt: 'Guitar moment' },
  { id: 4, src: mountainView, aspect: 'tall', alt: 'Mountain view' },
  { id: 5, src: teachingKids, aspect: 'wide', alt: 'Teaching kids' },
  { id: 6, src: readingCozy, aspect: 'wide', alt: 'Cozy reading' },
];

// Secondary gallery items ("some more of me")
const secondaryGalleryItems = [
  { id: 7, src: savingsMoment, aspect: 'square', alt: 'Savings moment' },
  { id: 8, src: auroraNight, aspect: 'wide', alt: 'Aurora night' },
  { id: 9, src: dressedUp, aspect: 'wide', alt: 'Dressed up' },
  { id: 10, src: yogaStretch, aspect: 'wide', alt: 'Yoga stretch' },
  { id: 11, src: lakeDock, aspect: 'wide', alt: 'Lake dock' },
  { id: 12, src: streetArt, aspect: 'tall', alt: 'Street art' },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSecondary, setShowSecondary] = useState(false);

  const currentGallery = showSecondary ? secondaryGalleryItems : primaryGalleryItems;

  return (
    <section className="min-h-[100dvh] py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center text-foreground/80 mb-3 sm:mb-4">
          Her World
        </h2>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5">
          Moments. Places. Quiet memories.
        </p>

        {/* Toggle Button */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
          <Button
            variant="ghost"
            onClick={() => setShowSecondary(!showSecondary)}
            className="group px-4 py-2 h-auto rounded-full border border-border/30 hover:border-primary/40 hover:bg-accent/30 transition-all duration-500"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary/60 group-hover:text-primary transition-colors" />
            <span className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors">
              {showSecondary ? 'back to moments' : 'some more of me'}
            </span>
          </Button>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {currentGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.src)}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer group break-inside-avoid mb-3 sm:mb-4 ${
                item.aspect === 'tall' ? 'aspect-[3/4]' :
                item.aspect === 'wide' ? 'aspect-[4/3]' :
                'aspect-square'
              }`}
            >
              {/* Actual Image */}
              <img 
                src={item.src} 
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay with heart */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white/0 group-hover:text-white/60 transition-all duration-300 group-hover:scale-100 scale-50 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors touch-target"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
          </button>

          <div
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl max-h-[80vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Gallery image"
              className="w-full h-full object-contain bg-background/5"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
