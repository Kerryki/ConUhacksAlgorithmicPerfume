'use client';

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useMemo } from 'react';

export default function TimeIndicator({ sliderValue }) {
  // Use motion value for better performance
  const motionValue = useMotionValue(sliderValue);
  
  // Spring animation for smooth transitions
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });

  useEffect(() => {
    motionValue.set(sliderValue);
  }, [sliderValue, motionValue]);

  // Calculate arc position (left to right, with vertical arc)
  // Map slider value to angle: 0 = left (180°), 100 = right (0°)
  const angle = useTransform(springValue, [0, 100], [180, 0]);
  
  // Arc radius - adjust this to control the height of the arc
  const arcRadius = 200; // pixels
  
  // Calculate x and y positions based on arc
  const xPosition = useTransform(angle, (a) => {
    const radians = (a * Math.PI) / 180;
    return Math.cos(radians) * arcRadius;
  });
  
  const yPosition = useTransform(angle, (a) => {
    const radians = (a * Math.PI) / 180;
    // Negative because we want the arc to go up
    return -Math.abs(Math.sin(radians)) * arcRadius * 0.6; // 0.6 to make arc less tall
  });

  // Determine if it's sun or moon based on time
  const isSun = sliderValue <= 60; // Sun from dawn to early dusk
  const isMoon = sliderValue > 60; // Moon from late dusk to midnight

  // Memoize sun/moon properties to prevent recalculation on every render
  const style = useMemo(() => {
    const value = sliderValue;

    if (value <= 25) {
      // Dawn: Rising sun (yellow/orange)
      return {
        background: 'radial-gradient(circle at 35% 35%, #FFF4E6 0%, #FFD54F 20%, #FFA726 60%, #FF6F00 100%)',
        boxShadow: '0 0 40px rgba(255, 193, 7, 0.8), 0 0 80px rgba(255, 152, 0, 0.6), inset -10px -10px 20px rgba(255, 87, 34, 0.3)',
        scale: 0.9 + (value / 25) * 0.3
      };
    } else if (value <= 50) {
      // Noon: Bright full sun
      return {
        background: 'radial-gradient(circle at 35% 35%, #FFFDE7 0%, #FFF59D 15%, #FFEB3B 40%, #FFC107 80%, #FF8F00 100%)',
        boxShadow: '0 0 60px rgba(255, 235, 59, 1), 0 0 100px rgba(255, 193, 7, 0.8), inset -12px -12px 25px rgba(255, 152, 0, 0.4)',
        scale: 1.2
      };
    } else if (value <= 75) {
      // Dusk: Setting sun transitioning to moon
      const duskProgress = (value - 50) / 25;
      if (duskProgress < 0.4) {
        // Still sun, turning orange/red
        return {
          background: `radial-gradient(circle at 35% 35%, #FFE0B2 0%, #FFB74D 20%, #FF7043 60%, #D84315 100%)`,
          boxShadow: '0 0 50px rgba(255, 87, 34, 0.9), 0 0 90px rgba(244, 67, 54, 0.6), inset -10px -10px 20px rgba(191, 54, 12, 0.4)',
          scale: 1.1 - duskProgress * 0.3
        };
      } else {
        // Transitioning to moon
        return {
          background: 'radial-gradient(circle at 40% 40%, #F5F5F5 0%, #E0E0E0 30%, #BDBDBD 70%, #9E9E9E 100%)',
          boxShadow: '0 0 40px rgba(224, 224, 224, 0.6), 0 0 70px rgba(189, 189, 189, 0.4), inset -15px -15px 30px rgba(117, 117, 117, 0.5)',
          scale: 0.95
        };
      }
    } else {
      // Midnight: Full moon with craters
      return {
        background: 'radial-gradient(circle at 40% 40%, #FAFAFA 0%, #EEEEEE 25%, #E0E0E0 50%, #BDBDBD 80%, #9E9E9E 100%)',
        boxShadow: '0 0 50px rgba(238, 238, 238, 0.8), 0 0 90px rgba(224, 224, 224, 0.5), inset -20px -20px 40px rgba(117, 117, 117, 0.6)',
        scale: 1.0
      };
    }
  }, [sliderValue]);

  return (
    <motion.div
      className="relative will-change-transform"
      style={{ x: xPosition, y: yPosition }}
    >
      {/* Main Sun/Moon Circle */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full will-change-transform"
        style={{
          background: style.background,
          boxShadow: style.boxShadow,
        }}
        animate={{
          scale: style.scale,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {/* Moon Craters (visible only when moon) */}
        {isMoon && (
          <>
            <div 
              className="absolute rounded-full bg-gray-400/30"
              style={{
                width: '25%',
                height: '25%',
                top: '20%',
                left: '30%',
                boxShadow: 'inset 2px 2px 8px rgba(0, 0, 0, 0.3)'
              }}
            />
            <div 
              className="absolute rounded-full bg-gray-400/20"
              style={{
                width: '18%',
                height: '18%',
                top: '55%',
                left: '50%',
                boxShadow: 'inset 1px 1px 5px rgba(0, 0, 0, 0.3)'
              }}
            />
            <div 
              className="absolute rounded-full bg-gray-400/25"
              style={{
                width: '15%',
                height: '15%',
                top: '35%',
                left: '60%',
                boxShadow: 'inset 1px 1px 4px rgba(0, 0, 0, 0.3)'
              }}
            />
            <div 
              className="absolute rounded-full bg-gray-400/20"
              style={{
                width: '12%',
                height: '12%',
                top: '65%',
                left: '25%',
                boxShadow: 'inset 1px 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            />
          </>
        )}
      </motion.div>

      {/* Sun Rays (visible only when sun) */}
      {isSun && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(12)].map((_, i) => {
            const distance = 85; // Distance from center
            const rayLength = sliderValue <= 50 ? 30 + (sliderValue / 50) * 15 : 45 - ((sliderValue - 50) / 25) * 20;
            const rayWidth = sliderValue <= 50 ? 3 : 3 - ((sliderValue - 50) / 25) * 1;
            const opacity = sliderValue <= 50 ? 0.6 + (sliderValue / 50) * 0.3 : 0.9 - ((sliderValue - 50) / 25) * 0.5;

            return (
              <motion.div
                key={i}
                className="absolute bg-gradient-to-r from-amber-300 to-transparent rounded-full will-change-transform"
                style={{
                  width: `${rayLength}px`,
                  height: `${rayWidth}px`,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'left center',
                  transform: `translate(-50%, -50%) translate(${distance}px, 0) rotate(${i * 30}deg)`,
                  opacity: opacity,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [opacity, opacity * 0.8, opacity],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            );
          })}
        </div>
      )}

      {/* Rotating outer glow for sun */}
      {isSun && sliderValue >= 20 && sliderValue <= 55 && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(circle, rgba(255, 235, 59, 0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            scale: [1.5, 1.7, 1.5],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  );
}
