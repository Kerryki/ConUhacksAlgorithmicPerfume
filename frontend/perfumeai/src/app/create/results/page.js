'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Home, RefreshCw, Droplets } from 'lucide-react';
import { collectAllPerfumeData, submitPerfumeData } from '../utils/collectPerfumeData';

// Hexagonal background component
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

// Floating particles component
function FloatingParticles({ color, count = 30 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        size: 1 + Math.random() * 2,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            background: color,
            left: `${particle.left}%`,
            bottom: '-10%',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.2],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated perfume bottle/droplet component
function PerfumeDroplet({ color }) {
  return (
    <div className="relative w-32 h-32">
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `2px solid ${color}30` }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `2px solid ${color}40` }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Main droplet */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            boxShadow: `0 0 60px ${color}60, inset 0 0 30px ${color}30`,
          }}
        >
          <Droplets 
            className="w-10 h-10" 
            style={{ color: color }}
          />
        </div>
      </motion.div>

      {/* Orbiting particles */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 10px ${color}`,
            left: '50%',
            top: '50%',
            marginLeft: '-6px',
            marginTop: '-6px',
          }}
          animate={{
            rotate: [angle, angle + 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: '6px 6px',
            x: Math.cos((angle * Math.PI) / 180) * 50,
            y: Math.sin((angle * Math.PI) / 180) * 50,
          }}
        />
      ))}
    </div>
  );
}

// Loading messages
const loadingMessages = [
  "Crafting your signature scent...",
  "Blending the perfect notes...",
  "Distilling your essence...",
  "Harmonizing the accords...",
  "Infusing your personality...",
  "Capturing your spirit...",
];

export default function ResultsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const accentColor = '#fbbf24';
  const secondaryColor = '#f59e0b';

  // Cycle through loading messages
  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Small delay for dramatic effect
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Collect all data from localStorage
        const allData = collectAllPerfumeData();
        
        console.log('=== Submitting to Backend ===');
        console.log(JSON.stringify(allData, null, 2));

        // Submit to backend
        const response = await submitPerfumeData(allData);
        
        console.log('=== Backend Response ===');
        console.log(JSON.stringify(response, null, 2));
        
        setResponseData(response);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching perfume data:', err);
        setError(err.message || 'Failed to create your perfume. Please try again.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateAnother = () => {
    router.push('/create/personality');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Hexagonal background */}
      <HexagonBackground />

      {/* Dynamic background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 60%)`,
        }}
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
          background: `radial-gradient(circle at 50% 50%, ${accentColor}20 0%, transparent 40%)`,
        }}
      />

      {/* Floating particles */}
      <FloatingParticles color={accentColor} count={25} />

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loading State
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {/* Animated droplet */}
              <PerfumeDroplet color={accentColor} />

              {/* Loading text */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-light tracking-wide text-white mb-4"
                  >
                    {loadingMessages[currentMessageIndex]}
                  </motion.h2>
                </AnimatePresence>

                {/* Subtle progress indicator */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: accentColor }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <p className="text-sm text-white/40 mt-8 font-light tracking-wide">
                  This may take a few moments...
                </p>
              </motion.div>
            </motion.div>
          ) : error ? (
            // Error State
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl w-full"
            >
              <div
                className="rounded-2xl backdrop-blur-sm p-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), transparent)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-500/20">
                  <RefreshCw className="w-8 h-8 text-red-400" />
                </div>

                <h2 className="text-2xl font-light text-white mb-4">
                  Something Went Wrong
                </h2>
                <p className="text-red-400 mb-8">{error}</p>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleCreateAnother}
                    className="px-6 py-3 rounded-full font-light tracking-wide text-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleGoHome}
                    className="px-6 py-3 rounded-full font-light tracking-wide text-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            // Success State - Raw JSON Display
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full"
            >
              {/* Success header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
                    border: `1px solid ${accentColor}40`,
                    boxShadow: `0 0 40px ${accentColor}30`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-8 h-8" style={{ color: accentColor }} />
                </motion.div>

                <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-white mb-3">
                  Your{" "}
                  <span
                    className="italic font-serif"
                    style={{
                      color: accentColor,
                      textShadow: `0 0 30px ${accentColor}60`,
                    }}
                  >
                    Perfume
                  </span>
                  {" "}is Ready
                </h1>
                <p className="text-sm text-white/50 font-light tracking-wide">
                  Backend Response Data (Raw JSON)
                </p>
              </motion.div>

              {/* JSON Display */}
              <motion.div
                className="rounded-2xl backdrop-blur-sm p-6 mb-8 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
                  border: `1px solid ${accentColor}30`,
                  boxShadow: `0 0 40px ${accentColor}15`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                  <pre className="text-xs sm:text-sm text-white/80 font-mono whitespace-pre-wrap break-words">
                    {JSON.stringify(responseData, null, 2)}
                  </pre>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleCreateAnother}
                  className="relative group px-8 py-4 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`,
                    color: "#050505",
                    boxShadow: `0 0 30px ${accentColor}50`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Create Another
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleGoHome}
                  className="px-8 py-4 rounded-full font-light tracking-widest text-sm uppercase bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Go Home
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${accentColor}40;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${accentColor}60;
        }
      `}</style>
    </main>
  );
}
