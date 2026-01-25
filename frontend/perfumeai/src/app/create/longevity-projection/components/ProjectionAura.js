'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function ProjectionAura({ sliderValue }) {
  // Calculate projection (direct relationship: higher slider = higher projection)
  const projection = sliderValue;
  
  // Spring animations for smooth motion
  const scale = useSpring(0.5, {
    stiffness: 80,
    damping: 25,
    mass: 1
  });
  
  const opacity = useSpring(0.2, {
    stiffness: 80,
    damping: 25,
    mass: 1
  });

  useEffect(() => {
    // Map projection to scale (0.5 to 2.0)
    scale.set(0.5 + (projection / 100) * 1.5);
    
    // Map projection to opacity (0.2 to 0.8)
    opacity.set(0.2 + (projection / 100) * 0.6);
  }, [projection, scale, opacity]);

  return (
    <div className="relative flex items-center justify-center w-96 h-96 scale-150">
      {/* Layer 1 - Outermost (Vibrant Purple to Pink) */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: scale,
          opacity: opacity,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, rgba(168, 85, 247, 0.6) 0%, rgba(236, 72, 153, 0.4) 40%, rgba(139, 92, 246, 0.2) 70%, transparent 85%)',
            filter: 'blur(12px)',
          }}
          animate={{
            borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', 
                          '70% 30% 30% 70% / 70% 70% 30% 30%',
                          '30% 70% 70% 30% / 30% 30% 70% 70%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Layer 2 - Middle (Cyan to Blue) */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: useSpring(scale.get() * 0.8, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
          opacity: useSpring(opacity.get() * 1.2, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 70% 40%, rgba(34, 211, 238, 0.5) 0%, rgba(59, 130, 246, 0.4) 45%, rgba(96, 165, 250, 0.2) 70%, transparent 85%)',
            filter: 'blur(10px)',
          }}
          animate={{
            borderRadius: ['60% 40% 30% 70% / 50% 60% 40% 50%', 
                          '40% 60% 70% 30% / 40% 50% 60% 50%',
                          '60% 40% 30% 70% / 50% 60% 40% 50%']
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Layer 3 - Inner (Vibrant Orange to Yellow) */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: useSpring(scale.get() * 0.6, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
          opacity: useSpring(opacity.get() * 1.3, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(251, 146, 60, 0.6) 0%, rgba(252, 211, 77, 0.5) 40%, rgba(251, 191, 36, 0.3) 65%, transparent 85%)',
            filter: 'blur(8px)',
          }}
          animate={{
            borderRadius: ['50% 50% 60% 40% / 60% 40% 50% 50%', 
                          '40% 60% 50% 50% / 50% 50% 40% 60%',
                          '50% 50% 60% 40% / 60% 40% 50% 50%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Layer 4 - Accent (Magenta/Pink) */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: useSpring(scale.get() * 0.45, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
          opacity: useSpring(opacity.get() * 1.4, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, rgba(219, 39, 119, 0.5) 0%, rgba(236, 72, 153, 0.4) 50%, transparent 75%)',
            filter: 'blur(6px)',
          }}
          animate={{
            borderRadius: ['65% 35% 45% 55% / 55% 45% 35% 65%', 
                          '35% 65% 55% 45% / 45% 55% 65% 35%',
                          '65% 35% 45% 55% / 55% 45% 35% 65%']
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Pulsing Core Glow - Multi-color */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: useSpring(opacity.get() * 0.8, {
            stiffness: 80,
            damping: 25,
            mass: 1
          }),
        }}
      >
        <motion.div
          className="w-20 h-20"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
            filter: 'blur(10px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            borderRadius: ['50%', '40% 60% 50% 50%', '50%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}
