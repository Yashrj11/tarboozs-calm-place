import { useState } from 'react';
import { X, ImageIcon } from 'lucide-react';

// Placeholder images with soft colors
const galleryItems = [
  { id: 1, aspect: 'tall', color: 'from-lavender-light to-blush' },
  { id: 2, aspect: 'wide', color: 'from-blush to-lavender-light' },
  { id: 3, aspect: 'square', color: 'from-accent to-lavender-light' },
  { id: 4, aspect: 'tall', color: 'from-lavender to-blush-light' },
  { id: 5, aspect: 'square', color: 'from-blush-light to-accent' },
  { id: 6, aspect: 'wide', color: 'from-lavender-light to-accent' },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="min-h-screen py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground/80 mb-4">
          Her World
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Moments. Places. Quiet memories.
        </p>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid mb-4 ${
                item.aspect === 'tall' ? 'aspect-[3/4]' :
                item.aspect === 'wide' ? 'aspect-[4/3]' :
                'aspect-square'
              }`}
            >
              {/* Gradient placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id={`pattern-${item.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor" />
                  </pattern>
                  <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-${item.id})`} />
                </svg>
              </div>

              {/* Icon placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-white/30" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              
              {/* Zoom effect */}
              <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Add more prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/50 text-muted-foreground text-sm">
            <ImageIcon className="w-4 h-4" />
            <span>Add your own memories here</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-background" />
          </button>

          <div
            className="max-w-3xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-[600px] h-[400px] bg-gradient-to-br ${
              galleryItems.find(i => i.id === selectedImage)?.color
            } flex items-center justify-center`}>
              <ImageIcon className="w-24 h-24 text-white/30" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
