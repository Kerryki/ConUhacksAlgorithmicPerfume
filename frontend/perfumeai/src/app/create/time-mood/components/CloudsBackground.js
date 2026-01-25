'use client';

import { useMemo } from 'react';

export default function CloudsBackground({ sliderValue }) {
  // Generate random clouds once
  const clouds = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 10, // Keep clouds in upper portion
      scale: Math.random() * 0.5 + 0.7,
      animationDuration: Math.random() * 40 + 60,
      animationDelay: Math.random() * -30
    }));
  }, []);

  // Calculate overall opacity based on time of day
  const getCloudsOpacity = () => {
    const value = sliderValue;
    
    if (value <= 25) {
      // Dawn: Some clouds visible
      return 0.4 + (value / 25) * 0.3;
    } else if (value <= 50) {
      // Noon: Full clouds
      return 0.7;
    } else if (value <= 75) {
      // Dusk: Clouds fading
      return 0.7 - ((value - 50) / 25) * 0.5;
    } else {
      // Midnight: No clouds
      return Math.max(0, 0.2 - ((value - 75) / 25) * 0.2);
    }
  };

  const cloudsOpacity = getCloudsOpacity();

  if (cloudsOpacity === 0) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: cloudsOpacity, transition: 'opacity 500ms ease-in-out' }}
    >
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute cloud-drift"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            transform: `scale(${cloud.scale})`,
            animationDuration: `${cloud.animationDuration}s`,
            animationDelay: `${cloud.animationDelay}s`,
          }}
        >
          <svg
            width="120"
            height="60"
            viewBox="0 0 120 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="30" cy="40" rx="20" ry="15" fill="white" opacity="0.6" />
            <ellipse cx="50" cy="35" rx="25" ry="18" fill="white" opacity="0.7" />
            <ellipse cx="70" cy="38" rx="22" ry="16" fill="white" opacity="0.65" />
            <ellipse cx="85" cy="42" rx="18" ry="13" fill="white" opacity="0.6" />
            <ellipse cx="55" cy="45" rx="30" ry="15" fill="white" opacity="0.5" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        .cloud-drift {
          animation: drift linear infinite;
        }
      `}</style>
    </div>
  );
}
