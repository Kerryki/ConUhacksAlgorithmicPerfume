'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import DraggableMolecule from './components/DraggableMolecule';
import { HexagonBackground } from './components/HexagonBackground';

// Gender category definitions with colors
const genderCategories = {
  feminine: {
    id: 'feminine',
    label: 'Feminine',
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    description: 'Soft florals, powdery notes, and delicate sweetness',
    bgGradient: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, transparent 60%)',
  },
  neutral: {
    id: 'neutral',
    label: 'Unisex',
    color: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.4)',
    description: 'Balanced harmony of all scent families',
    bgGradient: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.15) 0%, transparent 60%)',
  },
  masculine: {
    id: 'masculine',
    label: 'Masculine',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    description: 'Bold woods, aromatic herbs, and deep musks',
    bgGradient: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
  },
};

// Floating particles component
function FloatingParticles({ color, count = 25 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
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

export default function GenderExpressionPage() {
  const router = useRouter();
  const [moleculePosition, setMoleculePosition] = useState({ x: 0, y: 0 });
  const [genderValue, setGenderValue] = useState(0.5);
  const [hasDragged, setHasDragged] = useState(false);
  const constraintsRef = useRef(null);

  // Get current category based on gender value
  const getCurrentCategory = useCallback((value) => {
    if (value < 0.33) return genderCategories.feminine;
    if (value < 0.67) return genderCategories.neutral;
    return genderCategories.masculine;
  }, []);

  const currentCategory = getCurrentCategory(genderValue);

  // Calculate gender value from 2D position
  const calculateGenderValue = useCallback((x, y) => {
    if (!constraintsRef.current) return 0.5;
    
    const rect = constraintsRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Convert from center-based coordinates to normalized 0-1
    const normalizedX = (x + centerX) / rect.width;
    const normalizedY = (y + centerY) / rect.height;
    
    // Diagonal mapping: bottom-left (0,1) = 0.0, top-right (1,0) = 1.0
    const value = (normalizedX + (1 - normalizedY)) / 2;
    
    // Clamp between 0 and 1
    return Math.max(0, Math.min(1, value));
  }, []);

  const handlePositionChange = useCallback((x, y) => {
    setMoleculePosition({ x, y });
    const newGenderValue = calculateGenderValue(x, y);
    setGenderValue(newGenderValue);
    if (!hasDragged) setHasDragged(true);
  }, [calculateGenderValue, hasDragged]);

  const handleContinue = () => {
    const category = currentCategory.id;

    const genderData = {
      gender_expression: parseFloat(genderValue.toFixed(2)),
      position: {
        x: Math.round(moleculePosition.x),
        y: Math.round(moleculePosition.y)
      },
      category: category,
    };

    // Store to localStorage
    localStorage.setItem('perfume_gender_data', JSON.stringify(genderData));

    // Log for debugging
    console.log('=== Gender Expression Output ===');
    console.log(genderData);
    console.log('================================');

    // Navigate to time-mood page
    router.push('/create/time-mood');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Hexagonal background */}
      <HexagonBackground />

      {/* Dynamic background based on gender value */}
      <AnimatePresence>
        {hasDragged && (
          <>
            {/* Main radial gradient */}
            <motion.div
              key={`bg-${currentCategory.id}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ background: currentCategory.bgGradient }}
            />

            {/* Pulsing center glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: `radial-gradient(circle at 50% 50%, ${currentCategory.color}20 0%, transparent 40%)`,
              }}
            />

            {/* Ambient corner glows */}
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at top left, ${currentCategory.color}10 0%, transparent 70%)`,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at bottom right, ${currentCategory.color}10 0%, transparent 70%)`,
              }}
            />

            {/* Floating particles */}
            <FloatingParticles color={currentCategory.color} count={25} />
          </>
        )}
      </AnimatePresence>

      {/* Diagonal guide line */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.line 
          x1="0" 
          y1="100%" 
          x2="100%" 
          y2="0" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          strokeDasharray="10,5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      </svg>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/create/age"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide">Back</span>
          </Link>

          {/* Step indicator */}
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: hasDragged
                ? `linear-gradient(135deg, ${currentCategory.color}15, transparent)`
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${hasDragged ? currentCategory.color + "40" : "rgba(255,255,255,0.1)"}`,
              boxShadow: hasDragged ? `0 0 20px ${currentCategory.color}20` : "none",
            }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase font-light"
              style={{ color: hasDragged ? currentCategory.color : "rgba(255,255,255,0.6)" }}
            >
              Step
            </span>
            <span
              className="text-sm font-light"
              style={{ color: hasDragged ? currentCategory.color : "#fbbf24" }}
            >
              5 / 8
            </span>
          </motion.div>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Title section */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="text-xs tracking-[0.3em] uppercase font-light mb-3 block"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Gender Expression
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
              Define Your{" "}
              <motion.span
                className="italic font-serif"
                animate={{
                  textShadow: hasDragged
                    ? `0 0 40px ${currentCategory.color}, 0 0 80px ${currentCategory.color}50`
                    : "0 0 40px rgba(251, 191, 36, 0.5)",
                }}
                style={{ color: hasDragged ? currentCategory.color : "#fbbf24" }}
              >
                Presence
              </motion.span>
            </h1>

            <p className="text-sm sm:text-base font-light tracking-wide text-white/50 max-w-md mx-auto">
              Drag the molecule to explore your scent identity spectrum
            </p>
          </motion.div>

          {/* Corner Labels - More prominent */}
          <motion.div 
            className="absolute bottom-24 sm:bottom-32 left-4 sm:left-8 flex flex-col items-start gap-1" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span 
              className="text-sm sm:text-lg font-light tracking-wider"
              style={{ 
                color: genderCategories.feminine.color,
                textShadow: `0 0 20px ${genderCategories.feminine.color}80`,
              }}
            >
              Feminine
            </span>
            <span className="text-[10px] sm:text-xs text-white/40 font-light">
              Drag here for soft florals
            </span>
          </motion.div>
          <motion.div 
            className="absolute top-24 sm:top-32 right-4 sm:right-8 flex flex-col items-end gap-1" 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span 
              className="text-sm sm:text-lg font-light tracking-wider"
              style={{ 
                color: genderCategories.masculine.color,
                textShadow: `0 0 20px ${genderCategories.masculine.color}80`,
              }}
            >
              Masculine
            </span>
            <span className="text-[10px] sm:text-xs text-white/40 font-light">
              Drag here for bold woods
            </span>
          </motion.div>
          {/* Center unisex label */}
          <motion.div 
            className="absolute left-1/2 top-[45%] sm:top-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-none" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
          >
            <span 
              className="text-xs sm:text-sm font-light tracking-wider"
              style={{ 
                color: genderCategories.neutral.color,
              }}
            >
              Unisex
            </span>
          </motion.div>

          {/* Central Draggable Molecule Area */}
          <motion.div 
            ref={constraintsRef}
            className="relative w-full max-w-2xl h-64 sm:h-80 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Strong gradient zone indicators - always visible */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {/* Pink feminine zone - bottom left */}
              <div 
                className="absolute bottom-0 left-0 w-full h-full"
                style={{ 
                  background: `linear-gradient(135deg, ${genderCategories.feminine.color}40 0%, ${genderCategories.feminine.color}20 25%, transparent 50%)`,
                }}
              />
              {/* Blue masculine zone - top right */}
              <div 
                className="absolute top-0 right-0 w-full h-full"
                style={{ 
                  background: `linear-gradient(315deg, ${genderCategories.masculine.color}40 0%, ${genderCategories.masculine.color}20 25%, transparent 50%)`,
                }}
              />
              {/* Purple unisex zone - center diagonal */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(135deg, transparent 30%, ${genderCategories.neutral.color}15 45%, ${genderCategories.neutral.color}15 55%, transparent 70%)`,
                }}
              />
              
              {/* Zone border/outline */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'transparent',
                }}
              />
            </div>

            {/* Corner glow indicators */}
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 pointer-events-none"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: `radial-gradient(circle at bottom left, ${genderCategories.feminine.color}50 0%, transparent 70%)`,
              }}
            />
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 pointer-events-none"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{
                background: `radial-gradient(circle at top right, ${genderCategories.masculine.color}50 0%, transparent 70%)`,
              }}
            />

            <DraggableMolecule
              genderValue={genderValue}
              onPositionChange={handlePositionChange}
              constraintsRef={constraintsRef}
            />
          </motion.div>

          {/* Selection info card */}
          <AnimatePresence>
            {hasDragged && (
              <motion.div
                className="w-full max-w-md mx-auto mt-8 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="rounded-2xl backdrop-blur-sm p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentCategory.color}10, transparent)`,
                    border: `1px solid ${currentCategory.color}30`,
                  }}
                >
                  <p className="text-sm font-light text-white/70 mb-2">
                    Current Expression
                  </p>
                  <p
                    className="text-xl font-light tracking-wide"
                    style={{ color: currentCategory.color }}
                  >
                    {currentCategory.label}
                  </p>
                  <p className="text-xs font-light text-white/50 mt-2 italic">
                    {currentCategory.description}
                  </p>

                  {/* Gender value indicator */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs text-white/40 mb-2">
                      <span>Feminine</span>
                      <span>Masculine</span>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          width: `${genderValue * 100}%`,
                          background: `linear-gradient(90deg, ${genderCategories.feminine.color}, ${genderCategories.neutral.color}, ${genderCategories.masculine.color})`,
                        }}
                        layout
                      />
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white"
                        style={{
                          left: `${genderValue * 100}%`,
                          transform: `translateX(-50%) translateY(-50%)`,
                          backgroundColor: currentCategory.color,
                          boxShadow: `0 0 10px ${currentCategory.color}`,
                        }}
                        layout
                      />
                    </div>
                    <p className="text-xs text-white/30 mt-2">
                      {Math.round(genderValue * 100)}% expression value
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue button */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={handleContinue}
              className="relative group px-10 py-4 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden"
              style={{
                background: hasDragged 
                  ? `linear-gradient(135deg, ${currentCategory.color}, ${currentCategory.color}cc)`
                  : 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
                color: hasDragged ? "#050505" : "#ffffff",
                boxShadow: hasDragged 
                  ? `0 0 30px ${currentCategory.color}50, 0 0 60px ${currentCategory.color}30`
                  : '0 0 20px rgba(251, 191, 36, 0.2)',
                border: hasDragged ? 'none' : '1px solid rgba(251, 191, 36, 0.3)',
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

            {/* Hint when no selection */}
            {!hasDragged && (
              <motion.p
                className="text-xs tracking-wider text-white/30 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Drag the molecule to explore
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.footer
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-[10px] tracking-widest uppercase text-white/30 font-light">
            This influences the character and mood of your fragrance
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
