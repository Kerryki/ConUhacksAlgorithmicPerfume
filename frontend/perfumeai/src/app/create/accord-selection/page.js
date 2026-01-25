'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Accord type definitions with colors
const accordTypes = {
  woody: {
    id: 'woody',
    label: 'Woody',
    color: '#fbbf24',
    description: 'Cedar, sandalwood, oak',
    icon: '🌲',
  },
  floral: {
    id: 'floral',
    label: 'Floral',
    color: '#ec4899',
    description: 'Rose, jasmine, lily',
    icon: '🌸',
  },
  fresh: {
    id: 'fresh',
    label: 'Fresh',
    color: '#22d3ee',
    description: 'Citrus, aquatic, green',
    icon: '💧',
  },
  oriental: {
    id: 'oriental',
    label: 'Oriental',
    color: '#f59e0b',
    description: 'Amber, vanilla, spice',
    icon: '✨',
  },
};

// Floating particles component
function FloatingParticles({ colors, count = 20 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, [count, colors]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: particle.color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Hexagonal background (simplified inline version)
function HexagonBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-30">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
            <path 
              d="M28 0L56 17V50L28 67L0 50V17L28 0Z" 
              fill="none" 
              stroke="rgba(251, 191, 36, 0.08)" 
              strokeWidth="1"
            />
            <path 
              d="M28 33L56 50V83L28 100L0 83V50L28 33Z" 
              fill="none" 
              stroke="rgba(251, 191, 36, 0.08)" 
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
}

// Compact accord card component
function AccordCard({ accord, value, onChange, isActive, normalizedValue }) {
  const intensity = value / 100;
  
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${accord.color}15 0%, transparent 60%)`,
        border: `1px solid ${accord.color}${isActive ? '60' : '30'}`,
        boxShadow: isActive ? `0 0 20px ${accord.color}30` : 'none',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow overlay when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at center, ${accord.color}20 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="p-3 sm:p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{accord.icon}</span>
            <span 
              className="text-sm sm:text-base font-light tracking-wide"
              style={{ color: accord.color }}
            >
              {accord.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-light"
              style={{ color: accord.color }}
            >
              {Math.round(normalizedValue * 100)}%
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 appearance-none cursor-pointer rounded-full"
            style={{
              background: `linear-gradient(to right, 
                ${accord.color} 0%, 
                ${accord.color} ${value}%, 
                rgba(255, 255, 255, 0.1) ${value}%, 
                rgba(255, 255, 255, 0.1) 100%)`,
            }}
          />
        </div>

        {/* Description */}
        <p className="text-[10px] sm:text-xs text-white/40 mt-2 font-light">
          {accord.description}
        </p>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px ${accord.color};
          border: 2px solid ${accord.color};
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 10px ${accord.color};
          border: 2px solid ${accord.color};
        }
      `}</style>
    </motion.div>
  );
}

// Circular blend indicator (compact)
function BlendIndicator({ normalizedValues }) {
  const segments = [
    { key: 'woody', color: accordTypes.woody.color },
    { key: 'floral', color: accordTypes.floral.color },
    { key: 'fresh', color: accordTypes.fresh.color },
    { key: 'oriental', color: accordTypes.oriental.color },
  ];

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        {/* Segments */}
        {(() => {
          let cumulativePercent = 0;
          return segments.map((segment) => {
            const percent = normalizedValues[segment.key] * 100;
            const dashArray = `${percent * 2.51} ${251.2 - percent * 2.51}`;
            const dashOffset = -cumulativePercent * 2.51;
            cumulativePercent += percent;

            return (
              <circle
                key={segment.key}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={segment.color}
                strokeWidth="6"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
                style={{
                  filter: `drop-shadow(0 0 4px ${segment.color}80)`,
                }}
              />
            );
          });
        })()}
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/50 text-[10px] font-light tracking-wider">BLEND</span>
      </div>
    </div>
  );
}

export default function AccordSelectionPage() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Independent slider states for each accord (0-100)
  const [woodyValue, setWoodyValue] = useState(25);
  const [floralValue, setFloralValue] = useState(25);
  const [freshValue, setFreshValue] = useState(25);
  const [orientalValue, setOrientalValue] = useState(25);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Calculate normalized values in real-time
  const normalizedValues = useMemo(() => {
    const total = woodyValue + floralValue + freshValue + orientalValue;
    
    if (total === 0) {
      return { woody: 0.25, floral: 0.25, fresh: 0.25, oriental: 0.25 };
    }
    
    return {
      woody: woodyValue / total,
      floral: floralValue / total,
      fresh: freshValue / total,
      oriental: orientalValue / total
    };
  }, [woodyValue, floralValue, freshValue, orientalValue]);

  // Determine dominant accord for dynamic theming
  const dominantAccord = useMemo(() => {
    const max = Math.max(normalizedValues.woody, normalizedValues.floral, normalizedValues.fresh, normalizedValues.oriental);
    if (normalizedValues.woody === max) return accordTypes.woody;
    if (normalizedValues.floral === max) return accordTypes.floral;
    if (normalizedValues.fresh === max) return accordTypes.fresh;
    return accordTypes.oriental;
  }, [normalizedValues]);

  const handleContinue = () => {
    const accordData = [
      { floral: parseFloat(normalizedValues.floral.toFixed(2)) },
      { oriental: parseFloat(normalizedValues.oriental.toFixed(2)) },
      { woody: parseFloat(normalizedValues.woody.toFixed(2)) },
      { fresh: parseFloat(normalizedValues.fresh.toFixed(2)) }
    ];

    localStorage.setItem('perfume_accord_data', JSON.stringify({
      normalized_accords: accordData,
      raw_values: { woody: woodyValue, floral: floralValue, fresh: freshValue, oriental: orientalValue },
      timestamp: new Date().toISOString()
    }));

    console.log('=== Accord Selection Output ===');
    console.log('Normalized Accords:', accordData);
    console.log('================================');

    // Navigate to personal name page
    router.push('/create/personal-name');
  };

  const particleColors = [
    accordTypes.woody.color,
    accordTypes.floral.color,
    accordTypes.fresh.color,
    accordTypes.oriental.color,
  ];

  return (
    <main className="relative h-screen max-h-screen overflow-hidden bg-[#050505]">
      {/* Hexagonal background */}
      <HexagonBackground />

      {/* Dynamic background based on dominant accord */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at center, ${dominantAccord.color}10 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Pulsing center glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${dominantAccord.color}15 0%, transparent 40%)`,
        }}
      />

      {/* Corner glows for each accord */}
      <div 
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at top left, ${accordTypes.woody.color}30 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at top right, ${accordTypes.floral.color}30 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at bottom left, ${accordTypes.fresh.color}30 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at bottom right, ${accordTypes.oriental.color}30 0%, transparent 70%)` }}
      />

      {/* Floating particles */}
      <FloatingParticles colors={particleColors} count={20} />

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content - using flex to fit everything */}
      <div className="relative z-10 h-full flex flex-col px-4 py-4 sm:py-6">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-3 sm:mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/create/time-mood"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide hidden sm:inline">Back</span>
          </Link>

          {/* Step indicator */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${dominantAccord.color}15, transparent)`,
              border: `1px solid ${dominantAccord.color}40`,
            }}
          >
            <span
              className="text-xs tracking-[0.15em] uppercase font-light"
              style={{ color: dominantAccord.color }}
            >
              Step
            </span>
            <span
              className="text-sm font-light"
              style={{ color: dominantAccord.color }}
            >
              7 / 8
            </span>
          </motion.div>
        </motion.header>

        {/* Title section - compact */}
        <motion.div
          className="text-center mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-white mb-1">
            Blend Your{" "}
            <motion.span
              className="italic font-serif"
              animate={{
                textShadow: `0 0 30px ${dominantAccord.color}, 0 0 60px ${dominantAccord.color}50`,
              }}
              style={{ color: dominantAccord.color }}
            >
              Essence
            </motion.span>
          </h1>
          <p className="text-xs sm:text-sm font-light tracking-wide text-white/50 max-w-sm mx-auto">
            Balance the primal scent worlds of your fragrance
          </p>
        </motion.div>

        {/* Center row: Blend indicator + legend */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-3 sm:mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BlendIndicator normalizedValues={normalizedValues} />
          
          {/* Compact legend */}
          <div className="flex flex-col gap-1">
            {Object.values(accordTypes).map((accord) => (
              <div 
                key={accord.id}
                className="flex items-center gap-2"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: accord.color, boxShadow: `0 0 6px ${accord.color}` }}
                />
                <span className="text-[10px] sm:text-xs text-white/50 font-light">
                  {accord.label}
                </span>
                <span 
                  className="text-[10px] sm:text-xs font-light"
                  style={{ color: accord.color }}
                >
                  {Math.round(normalizedValues[accord.id] * 100)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Accord cards - 2x2 grid */}
        <motion.div
          className="flex-1 grid grid-cols-2 gap-2 sm:gap-3 max-w-xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AccordCard
            accord={accordTypes.woody}
            value={woodyValue}
            onChange={setWoodyValue}
            isActive={woodyValue > 30}
            normalizedValue={normalizedValues.woody}
          />
          <AccordCard
            accord={accordTypes.floral}
            value={floralValue}
            onChange={setFloralValue}
            isActive={floralValue > 30}
            normalizedValue={normalizedValues.floral}
          />
          <AccordCard
            accord={accordTypes.fresh}
            value={freshValue}
            onChange={setFreshValue}
            isActive={freshValue > 30}
            normalizedValue={normalizedValues.fresh}
          />
          <AccordCard
            accord={accordTypes.oriental}
            value={orientalValue}
            onChange={setOrientalValue}
            isActive={orientalValue > 30}
            normalizedValue={normalizedValues.oriental}
          />
        </motion.div>

        {/* Continue button */}
        <motion.div
          className="flex justify-center mt-3 sm:mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={handleContinue}
            className="relative group px-8 sm:px-10 py-3 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${dominantAccord.color}, ${dominantAccord.color}cc)`,
              color: "#050505",
              boxShadow: `0 0 30px ${dominantAccord.color}50, 0 0 60px ${dominantAccord.color}30`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />

            {/* Inner glow */}
            <div
              className="absolute inset-[1px] rounded-full opacity-50"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.3), transparent)`,
              }}
            />

            <span className="relative z-10 flex items-center gap-3">
              Continue
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.footer
          className="text-center mt-2 sm:mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-white/30 font-light">
            One more step — Sign your creation
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
