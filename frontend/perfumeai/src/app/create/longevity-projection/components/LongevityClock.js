'use client';

import { motion, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LongevityClock({ sliderValue }) {
  // Calculate longevity (inverse of slider: 0 slider = 100% longevity, 100 slider = 0% longevity)
  const longevity = 100 - sliderValue;
  
  // Single spring animation for both rotation and arc
  const progress = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 1
  });

  useEffect(() => {
    // Update single progress value (0 to 1)
    progress.set(longevity / 100);
  }, [longevity, progress]);

  // Calculate arc path for SVG
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  
  // Transform progress to rotation (synchronized)
  const rotation = useTransform(progress, [0, 1], [-90, 270]);
  
  // Transform progress to arc offset (synchronized)
  const arcOffset = useTransform(progress, [0, 1], [circumference, 0]);
  
  // Transform progress to hours (3-9 hours range)
  const hours = useTransform(progress, [0, 1], [3, 9]);
  
  // State for displayed hours (initialized based on current longevity)
  const [displayHours, setDisplayHours] = useState(3 + (longevity / 100) * 6);
  
  // Subscribe to hours value changes
  useMotionValueEvent(hours, 'change', (latest) => {
    setDisplayHours(latest);
  });

  return (
    <div className="relative flex flex-col items-center justify-center scale-150">
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
        
        {/* Animated arc - perfectly synchronized with hand */}
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
            strokeDashoffset: arcOffset,
            rotate: -90,
            transformOrigin: 'center'
          }}
        />
      </svg>

      {/* Clock Face */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-amber-400 rounded-full z-10 shadow-lg shadow-amber-500/50" />
        
        {/* Hour hand - synchronized with arc */}
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
      
      {/* Time Display */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="text-3xl font-light text-amber-400 tracking-wider block"
          style={{
            textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'
          }}
          key={displayHours}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {displayHours.toFixed(1)}h
        </motion.span>
        <div className="text-white/40 text-xs uppercase tracking-widest mt-1 font-light">
          Duration
        </div>
      </motion.div>
    </div>
  );
}
