'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import StarsBackground from './components/StarsBackground';
import CloudsBackground from './components/CloudsBackground';

// Time period definitions
const timePeriods = [
  {
    id: 'dawn',
    label: 'Dawn',
    time: '',
    description: 'Fresh awakening',
    color: '#F97316',
    position: 0,
  },
  {
    id: 'noon',
    label: 'Noon', 
    time: '',
    description: 'Radiant energy',
    color: '#FBBF24',
    position: 25,
  },
  {
    id: 'dusk',
    label: 'Dusk',
    time: '',
    description: 'Golden hour',
    color: '#A855F7',
    position: 50,
  },
  {
    id: 'midnight',
    label: 'Midnight',
    time: '',
    description: 'Deep mystery',
    color: '#6366F1',
    position: 75,
  },
];

// Get interpolated color based on slider value
function getInterpolatedColor(value) {
  if (value <= 25) {
    const t = value / 25;
    return lerpColor('#F97316', '#FBBF24', t);
  } else if (value <= 50) {
    const t = (value - 25) / 25;
    return lerpColor('#FBBF24', '#A855F7', t);
  } else if (value <= 75) {
    const t = (value - 50) / 25;
    return lerpColor('#A855F7', '#6366F1', t);
  } else {
    const t = (value - 75) / 25;
    return lerpColor('#6366F1', '#F97316', t);
  }
}

function lerpColor(a, b, t) {
  const ah = parseInt(a.replace('#', ''), 16);
  const bh = parseInt(b.replace('#', ''), 16);
  const ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = ar + t * (br - ar);
  const rg = ag + t * (bg - ag);
  const rb = ab + t * (bb - ab);
  return `rgb(${Math.round(rr)}, ${Math.round(rg)}, ${Math.round(rb)})`;
}

// Circular dial component
function TimeDial({ value, onChange, color }) {
  const dialRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Convert value (0-100) to angle (0-360)
  const angle = (value / 100) * 360;
  
  const handleInteraction = (clientX, clientY) => {
    if (!dialRef.current) return;
    
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    // Calculate angle from center
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    newAngle = (newAngle + 90 + 360) % 360; // Offset so 0 is at top
    
    const newValue = Math.round((newAngle / 360) * 100);
    onChange(newValue);
  };
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleInteraction(e.clientX, e.clientY);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleInteraction(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const dialSize = 280;
  const strokeWidth = 6;
  const radius = (dialSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div 
      ref={dialRef}
      className="relative cursor-pointer select-none touch-none"
      style={{ width: dialSize, height: dialSize }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: color }}
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main dial SVG */}
      <svg 
        className="absolute inset-0"
        viewBox={`0 0 ${dialSize} ${dialSize}`}
      >
        <defs>
          {/* Gradient for the progress arc */}
          <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="33%" stopColor="#FBBF24" />
            <stop offset="66%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={dialSize / 2}
          cy={dialSize / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Progress arc */}
        <motion.circle
          cx={dialSize / 2}
          cy={dialSize / 2}
          r={radius}
          fill="none"
          stroke="url(#dialGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform={`rotate(-90 ${dialSize / 2} ${dialSize / 2})`}
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />

        {/* Time markers */}
        {timePeriods.map((period, i) => {
          const markerAngle = (period.position / 100) * 360 - 90;
          const markerRadius = radius + 20;
          const x = dialSize / 2 + Math.cos(markerAngle * Math.PI / 180) * markerRadius;
          const y = dialSize / 2 + Math.sin(markerAngle * Math.PI / 180) * markerRadius;
          const isActive = Math.abs(value - period.position) < 12.5 || 
                          (period.position === 0 && (value < 12.5 || value > 87.5));
          
          return (
            <g key={period.id}>
              {/* Marker dot */}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 5 : 3}
                fill={isActive ? period.color : 'rgba(255,255,255,0.3)'}
                style={{ transition: 'all 0.3s ease' }}
              />
              {isActive && (
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  fill="none"
                  stroke={period.color}
                  strokeWidth={1}
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Draggable handle */}
      <motion.div
        className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center"
        style={{
          left: `${50 + 42 * Math.sin(angle * Math.PI / 180)}%`,
          top: `${50 - 42 * Math.cos(angle * Math.PI / 180)}%`,
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          boxShadow: `0 0 30px ${color}, 0 4px 15px rgba(0,0,0,0.4)`,
        }}
        animate={{
          scale: isDragging ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="w-4 h-4 rounded-full bg-white/90" />
      </motion.div>

      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={getCurrentPeriod(value).id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.p 
              className="text-5xl font-extralight tracking-tight"
              style={{ color }}
            >
              {getCurrentPeriod(value).time}
            </motion.p>
            <p className="text-xl font-light text-white/90 mt-1 tracking-wide">
              {getCurrentPeriod(value).label}
            </p>
            <p className="text-sm font-light text-white/50 mt-1 italic">
              {getCurrentPeriod(value).description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function getCurrentPeriod(value) {
  if (value <= 12.5 || value > 87.5) return timePeriods[0]; // dawn
  if (value <= 37.5) return timePeriods[1]; // noon
  if (value <= 62.5) return timePeriods[2]; // dusk
  return timePeriods[3]; // midnight
}

// Background gradient based on time
function getBackgroundGradient(value) {
  if (value <= 25) {
    const progress = value / 25;
    return `linear-gradient(to bottom, 
      rgb(${147 + progress * 20}, ${51 + progress * 80}, ${234 - progress * 100}),
      rgb(${236 - progress * 100}, ${72 + progress * 80}, ${153 - progress * 50}),
      rgb(${245 - progress * 50}, ${158 + progress * 80}, ${11 + progress * 80}))`;
  } else if (value <= 50) {
    const progress = (value - 25) / 25;
    return `linear-gradient(to bottom,
      rgb(${59 + progress * 80}, ${130 + progress * 35}, ${246 - progress * 90}),
      rgb(${96 + progress * 51}, ${165 + progress * 20}, ${250 - progress * 103}),
      rgb(${147 + progress * 50}, ${197 + progress * 30}, ${253 - progress * 106}))`;
  } else if (value <= 75) {
    const progress = (value - 50) / 25;
    return `linear-gradient(to bottom,
      rgb(${245 - progress * 138}, ${158 - progress * 86}, ${11 + progress * 97}),
      rgb(${236 - progress * 129}, ${72 + progress * 0}, ${153 - progress * 46}),
      rgb(${107 + progress * 0}, ${33 + progress * 0}, ${168 - progress * 0}))`;
  } else {
    const progress = (value - 75) / 25;
    return `linear-gradient(to bottom,
      rgb(${10 - progress * 5}, ${10 - progress * 5}, ${25 - progress * 10}),
      rgb(${30 - progress * 10}, ${27 - progress * 10}, ${75 - progress * 25}),
      rgb(${49 - progress * 20}, ${46 - progress * 20}, ${129 - progress * 50}))`;
  }
}

export default function TimeMoodPage() {
  const router = useRouter();
  const [sliderValue, setSliderValue] = useState(25);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentColor = getInterpolatedColor(sliderValue);
  const currentPeriod = getCurrentPeriod(sliderValue);

  const handleContinue = async () => {
    setIsSubmitting(true);

    const timeData = {
      time_value: sliderValue,
      time_period: currentPeriod.id,
      period_label: currentPeriod.label,
    };

    localStorage.setItem('perfume_time_data', JSON.stringify(timeData));
    console.log('Time & Mood Output:', timeData);

    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSubmitting(false);
    router.push('/create/accord-selection');
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden flex flex-col transition-all duration-700"
      style={{ background: getBackgroundGradient(sliderValue) }}
    >
      {/* Stars Background */}
      <StarsBackground sliderValue={sliderValue} />

      {/* Clouds Background */}
      <CloudsBackground sliderValue={sliderValue} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: currentColor }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/create/gender-expression"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide">Back</span>
          </Link>

          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${currentColor}20, transparent)`,
              border: `1px solid ${currentColor}40`,
            }}
          >
            <span className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: currentColor }}>
              Step
            </span>
            <span className="text-sm font-light" style={{ color: currentColor }}>
              6 / 8
            </span>
          </motion.div>
        </motion.header>

        {/* Title */}
        <motion.div
          className="text-center mt-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span className="text-xs tracking-[0.3em] uppercase font-light mb-3 block text-white/50">
            Time Signature
          </motion.span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-3">
            When Does Your{" "}
            <motion.span
              className="italic font-serif"
              animate={{
                textShadow: [
                  `0 0 30px ${currentColor}, 0 0 60px ${currentColor}50`,
                  `0 0 50px ${currentColor}, 0 0 80px ${currentColor}60`,
                  `0 0 30px ${currentColor}, 0 0 60px ${currentColor}50`,
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: currentColor }}
            >
              Scent
            </motion.span>
            {" "}Shine?
          </h1>

          <p className="text-sm font-light tracking-wide text-white/60 max-w-sm mx-auto">
            Drag the dial to select your moment
          </p>
        </motion.div>

        {/* Circular Dial */}
        <motion.div 
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", damping: 20 }}
        >
          <TimeDial 
            value={sliderValue} 
            onChange={setSliderValue} 
            color={currentColor}
          />
        </motion.div>

        {/* Bottom section */}
        <motion.div
          className="flex flex-col items-center gap-6 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Continue Button */}
          <motion.button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="relative group w-full max-w-xs py-4 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${currentColor}, ${currentColor}cc)`,
              boxShadow: `0 0 40px ${currentColor}50, 0 10px 30px rgba(0,0,0,0.3)`,
              color: '#050505',
            }}
            whileHover={{ scale: 1.03, boxShadow: `0 0 60px ${currentColor}70, 0 15px 40px rgba(0,0,0,0.4)` }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />

            {/* Inner highlight */}
            <div 
              className="absolute inset-[1px] rounded-full opacity-50"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4), transparent)' }}
            />

            <span className="relative z-10 flex items-center justify-center gap-3 font-medium">
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Continue
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </>
              )}
            </span>
          </motion.button>

          {/* Skip */}
          <button className="text-xs tracking-wider text-white/40 hover:text-white/70 transition-colors font-light">
            Skip this step
          </button>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[10px] tracking-widest uppercase text-white/30 font-light">
            Your moment defines the character of your fragrance
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
