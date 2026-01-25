'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function ColorWheel({ hue, saturation, brightness, onSaturationBrightnessChange }) {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState(280);
  
  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth >= 768 ? 320 : 280);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Convert HSB to RGB for display
  const hsbToRgb = (h, s, b) => {
    s /= 100;
    b /= 100;
    const k = (n) => (n + h / 60) % 6;
    const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    const rgb = [f(5), f(3), f(1)].map(x => Math.round(x * 255));
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  };

  // Calculate position from saturation and brightness
  const getPosition = () => {
    const radius = size / 2;
    
    // Convert saturation and brightness to polar coordinates
    // Saturation controls distance from center (0-100%)
    const distance = (saturation / 100) * radius;
    
    // Brightness controls angle (we'll use full circle)
    // Map brightness 0-100 to angle 0-360 degrees
    const angle = ((brightness / 100) * 360) * (Math.PI / 180);
    
    // Convert polar to cartesian
    const x = radius + distance * Math.cos(angle);
    const y = radius + distance * Math.sin(angle);
    
    return { x, y };
  };

  const handleInteraction = useCallback((clientX, clientY) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const radius = size / 2;
    
    // Get position relative to center
    const centerX = rect.left + radius;
    const centerY = rect.top + radius;
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y);
    
    // Clamp distance to circle radius
    const clampedDistance = Math.min(distance, radius);
    
    // Calculate saturation from distance (0-100%)
    const newSaturation = (clampedDistance / radius) * 100;
    
    // Calculate angle from position
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    
    // Map angle to brightness (0-360 degrees to 0-100%)
    const newBrightness = (angle / 360) * 100;
    
    onSaturationBrightnessChange(newSaturation, newBrightness);
  }, [size, onSaturationBrightnessChange]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleInteraction(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    handleInteraction(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add touch event listeners directly to the canvas element with passive: false
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const touchStartHandler = (e) => {
      e.preventDefault();
      setIsDragging(true);
      const touch = e.touches[0];
      if (touch) {
        handleInteraction(touch.clientX, touch.clientY);
      }
    };

    canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
    
    return () => {
      canvas.removeEventListener('touchstart', touchStartHandler);
    };
  }, [handleInteraction]);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  const position = getPosition();
  const currentColor = hsbToRgb(hue, saturation, brightness);

  return (
    <div className="relative flex items-center justify-center w-[280px] md:w-[320px] h-[280px] md:h-[320px]">
      {/* Circular color picker using SVG */}
      <svg
        ref={canvasRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="cursor-crosshair select-none w-full h-full"
        onMouseDown={handleMouseDown}
        style={{ touchAction: 'none' }}
      >
        <defs>
          {/* Radial gradient for saturation (white center to full color at edge) */}
          <radialGradient id="saturationGradient">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={hsbToRgb(hue, 100, 100)} />
          </radialGradient>
          
          {/* Conic gradient for brightness around the circle */}
          <linearGradient id="brightnessOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
          </linearGradient>
        </defs>
        
        {/* Background circle with saturation gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill="url(#saturationGradient)"
        />
        
        {/* Subtle overlay */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill="url(#brightnessOverlay)"
        />
        
        {/* Golden ring border */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 1}
          fill="none"
          stroke="rgba(251, 191, 36, 0.3)"
          strokeWidth="2"
        />
      </svg>

      {/* Draggable thumb indicator */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: position.x - 14,
          top: position.y - 14,
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: currentColor,
          border: '3px solid rgba(255, 255, 255, 0.9)',
          boxShadow: `0 0 0 2px rgba(251, 191, 36, 0.6),
                      0 0 20px rgba(251, 191, 36, 0.5),
                      0 4px 12px rgba(0, 0, 0, 0.6),
                      inset 0 0 8px rgba(0, 0, 0, 0.3)`,
        }}
        animate={{
          scale: isDragging ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      />
    </div>
  );
}
