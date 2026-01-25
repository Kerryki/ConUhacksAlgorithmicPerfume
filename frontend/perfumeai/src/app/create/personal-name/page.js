'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { HexagonBackground } from './components/HexagonBackground';

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

// Animated signature line component
function SignatureLine({ isActive, color }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="h-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        initial={{ x: '-100%' }}
        animate={isActive ? { x: '100%' } : { x: '-100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export default function PersonalNamePage() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const accentColor = '#fbbf24'; // Golden amber - matching theme
  const secondaryColor = '#f59e0b';

  useEffect(() => {
    // Focus the input on mount
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const isValidName = name.trim().length >= 2;

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isValidName || isSubmitting) return;

    setIsSubmitting(true);
    setShowCelebration(true);

    // Store personal name to localStorage
    const nameData = {
      personal_name: name.trim(),
    };
    localStorage.setItem('perfume_personal_name', JSON.stringify(nameData));

    console.log('=== Personal Name Saved ===');
    console.log(nameData);
    console.log('===========================');

    // Short delay for celebration animation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Navigate to results page - it will handle the API submission
    router.push('/create/results');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isValidName) {
      handleSubmit();
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Hexagonal background */}
      <HexagonBackground />

      {/* Dynamic background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isValidName
            ? `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 60%)`
            : `radial-gradient(ellipse at center, ${accentColor}08 0%, transparent 60%)`,
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
          background: `radial-gradient(circle at 50% 50%, ${accentColor}15 0%, transparent 40%)`,
        }}
      />

      {/* Corner glows */}
      <div 
        className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at top left, ${accentColor}20 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at bottom right, ${secondaryColor}20 0%, transparent 70%)` }}
      />

      {/* Floating particles */}
      <FloatingParticles color={accentColor} count={20} />

      {/* Celebration particles on submit */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`celebration-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? accentColor : secondaryColor,
                  left: '50%',
                  top: '40%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.02,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
            href="/create/weather"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide">Back</span>
          </Link>

          {/* Step indicator */}
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${accentColor}15, transparent)`,
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 20px ${accentColor}20`,
            }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase font-light"
              style={{ color: accentColor }}
            >
              Final Step
            </span>
            <span
              className="text-sm font-light"
              style={{ color: accentColor }}
            >
              8 / 8
            </span>
          </motion.div>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Icon */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}20, transparent)`,
                border: `1px solid ${accentColor}30`,
                boxShadow: `0 0 40px ${accentColor}20`,
              }}
            >
              <User 
                className="w-8 h-8" 
                style={{ color: accentColor }}
              />
            </div>
          </motion.div>

          {/* Title section */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.span
              className="text-xs tracking-[0.3em] uppercase font-light mb-3 block"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Personal Signature
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
              Sign Your{" "}
              <motion.span
                className="italic font-serif"
                animate={{
                  textShadow: [
                    `0 0 30px ${accentColor}, 0 0 60px ${accentColor}50`,
                    `0 0 50px ${accentColor}, 0 0 80px ${accentColor}60`,
                    `0 0 30px ${accentColor}, 0 0 60px ${accentColor}50`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: accentColor }}
              >
                Creation
              </motion.span>
            </h1>

            <p className="text-sm sm:text-base font-light tracking-wide text-white/50 max-w-md mx-auto">
              Your name will be inscribed on your unique fragrance
            </p>
          </motion.div>

          {/* Name input area */}
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit}>
              <div
                className="relative rounded-2xl backdrop-blur-sm p-6 sm:p-8"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
                  border: `1px solid ${isFocused || isValidName ? accentColor + '50' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isFocused || isValidName ? `0 0 40px ${accentColor}20` : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <label className="block mb-4">
                  <span className="text-xs uppercase tracking-widest text-white/40 font-light">
                    Your Name
                  </span>
                </label>

                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your name..."
                    maxLength={50}
                    className="w-full bg-transparent text-2xl sm:text-3xl font-light text-white placeholder-white/20 outline-none tracking-wide text-center py-4"
                    style={{
                      caretColor: accentColor,
                    }}
                    disabled={isSubmitting}
                  />
                  <SignatureLine isActive={isFocused || isValidName} color={accentColor} />
                </div>

                {/* Character count */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-white/30 font-light">
                    {name.length > 0 ? `${name.length} / 50 characters` : ''}
                  </span>
                  {isValidName && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 text-xs font-light"
                      style={{ color: accentColor }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Perfect
                    </motion.span>
                  )}
                </div>
              </div>

              {/* Preview card */}
              <AnimatePresence>
                {isValidName && (
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-xs text-white/40 mb-2 font-light tracking-wider uppercase">
                      Preview
                    </p>
                    <motion.p
                      className="text-lg sm:text-xl font-light italic tracking-wide"
                      style={{ 
                        color: accentColor,
                        textShadow: `0 0 20px ${accentColor}50`
                      }}
                    >
                      "{name.trim()}'s Signature Scent"
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue button */}
              <motion.div
                className="flex flex-col items-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.button
                  type="submit"
                  disabled={!isValidName || isSubmitting}
                  className="relative group px-10 py-4 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: isValidName 
                      ? `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`
                      : 'rgba(255,255,255,0.1)',
                    color: isValidName ? "#050505" : "#ffffff50",
                    boxShadow: isValidName 
                      ? `0 0 30px ${accentColor}50, 0 0 60px ${accentColor}30`
                      : 'none',
                  }}
                  whileHover={isValidName ? { scale: 1.05 } : {}}
                  whileTap={isValidName ? { scale: 0.98 } : {}}
                >
                  {/* Shine effect */}
                  {isValidName && !isSubmitting && (
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
                  )}

                  {/* Inner glow */}
                  <div
                    className="absolute inset-[1px] rounded-full opacity-50"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.3), transparent)`,
                    }}
                  />

                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        Complete Journey
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Hint when no name */}
                {!isValidName && (
                  <motion.p
                    className="text-xs tracking-wider text-white/30 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Enter at least 2 characters to continue
                  </motion.p>
                )}
              </motion.div>
            </form>
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
            Your personal fragrance awaits — the final touch
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
