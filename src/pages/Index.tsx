import FloatingParticles from '@/components/FloatingParticles';
import HeroSection from '@/components/sections/HeroSection';
import IdentitySection from '@/components/sections/IdentitySection';
import ShayariSection from '@/components/sections/ShayariSection';
import DreamsSection from '@/components/sections/DreamsSection';
import MusicSection from '@/components/sections/MusicSection';
import GallerySection from '@/components/sections/GallerySection';
import ClosingSection from '@/components/sections/ClosingSection';

const Index = () => {
  return (
    <main className="relative">
      <FloatingParticles />
      <HeroSection />
      <IdentitySection />
      <ShayariSection />
      <DreamsSection />
      <MusicSection />
      <GallerySection />
      <ClosingSection />
    </main>
  );
};

export default Index;
