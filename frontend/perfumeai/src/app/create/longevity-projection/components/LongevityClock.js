'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function LongevityClock({ sliderValue }) {
  // Calculate longevity (inverse of slider: 0 slider = 100% longevity, 100 slider = 0% longevity)
  const longevity = 100 - sliderValue;
  
  // Spring animations for smooth motion
  const rotation = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 1
  });
  
  const arcProgress = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 1
  });

  useEffect(() => {
    // Map longevity to rotation (0-360 degrees)
    rotation.set((longevity / 100) * 360);
    
    // Map longevity to arc progress (0-1)
    arcProgress.set(longevity / 100);
  }, [longevity, rotation, arcProgress]);

  // Calculate arc path for SVG
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex items-center justify-center scale-150">
      {/* SVG Arc Container */}
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        className="absolute"
      >
        <defs>
          {/* Gradient for glowing gold effect */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFA500" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle (subtle) */}
        <circle
          cx="120"
          cy="120"
          r={radius}
          fill="none"
          stroke="rgba(255, 215, 0, 0.1)"
          strokeWidth="3"
        />
        
        {/* Animated arc */}
        <motion.circle
          cx="120"
          cy="120"
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: useSpring(circumference, {
              stiffness: 100,
              damping: 20,
              mass: 1
            }),
            rotate: -90,
            transformOrigin: 'center'
          }}
          animate={{
            strokeDashoffset: circumference - (arcProgress.get() * circumference)
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
          }}
        />
      </svg>

      {/* Clock Face */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-amber-400 rounded-full z-10 shadow-lg shadow-amber-500/50" />
        
        {/* Hour hand */}
        <motion.div
          className="absolute w-1.5 h-12 bg-gradient-to-t from-amber-400 to-amber-300 rounded-full origin-bottom"
          style={{
            rotate: rotation,
            bottom: '50%',
            left: '50%',
            x: '-50%',
            filter: 'drop-shadow(0 0 6px rgba(255, 215, 0, 0.8))'
          }}
        />
        
        {/* Subtle hour markers */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <div
            key={angle}
            className="absolute w-0.5 h-2 bg-white/20"
            style={{
              transform: `rotate(${angle}deg) translateY(-56px)`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>
    </div>
  );
}
