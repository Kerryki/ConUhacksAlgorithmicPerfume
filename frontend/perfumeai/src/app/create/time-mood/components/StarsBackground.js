'use client';

import { useMemo } from 'react';

export default function StarsBackground({ sliderValue }) {
  // Generate random stars once
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.5
    }));
  }, []);

  // Calculate overall opacity based on time of day
  const getStarsOpacity = () => {
    const value = sliderValue;
    
    if (value <= 25) {
      // Dawn: Stars fading out
      return Math.max(0, 1 - (value / 25));
    } else if (value <= 50) {
      // Noon: No stars
      return 0;
    } else if (value <= 75) {
      // Dusk: Stars appearing
      return (value - 50) / 25;
    } else {
      // Midnight: Full stars
      return 1;
    }
  };

  const starsOpacity = getStarsOpacity();

  if (starsOpacity === 0) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: starsOpacity, transition: 'opacity 500ms ease-in-out' }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`
          }}
        />
      ))}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .star-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
