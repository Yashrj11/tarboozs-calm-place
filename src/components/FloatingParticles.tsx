import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  type: 'circle' | 'star' | 'sparkle';
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 15 : 30;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const types: Array<'circle' | 'star' | 'sparkle'> = ['circle', 'circle', 'star', 'sparkle'];
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 20,
        duration: Math.random() * 20 + 25,
        opacity: Math.random() * 0.4 + 0.2,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    setParticles(newParticles);
  }, []);

  const renderParticle = (particle: Particle) => {
    if (particle.type === 'star') {
      return (
        <div
          key={particle.id}
          className="absolute text-lavender-light animate-twinkle"
          style={{
            left: `${particle.x}%`,
            fontSize: `${particle.size * 2}px`,
            opacity: particle.opacity,
            animation: `particle-drift ${particle.duration}s linear infinite, twinkle 3s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          ✦
        </div>
      );
    }
    
    if (particle.type === 'sparkle') {
      return (
        <div
          key={particle.id}
          className="absolute text-blush"
          style={{
            left: `${particle.x}%`,
            fontSize: `${particle.size * 1.5}px`,
            opacity: particle.opacity * 0.7,
            animation: `particle-drift ${particle.duration}s linear infinite, sparkle 2s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          ✿
        </div>
      );
    }

    return (
      <div
        key={particle.id}
        className="absolute rounded-full bg-lavender-light"
        style={{
          left: `${particle.x}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          animation: `particle-drift ${particle.duration}s linear infinite`,
          animationDelay: `${particle.delay}s`,
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(renderParticle)}
    </div>
  );
};

export default FloatingParticles;