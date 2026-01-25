"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Star, Crown } from "lucide-react"

export const ageRanges = [
  {
    id: "teen",
    label: "Teens",
    range: "10-18",
    description: "Fresh, playful, and light",
    intensity: "Light",
    intensityLevel: 1,
    icon: Sparkles,
    color: "#7dd3fc", // sky blue
    bgGradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    glowColor: "rgba(125, 211, 252, 0.6)",
  },
  {
    id: "young",
    label: "Young Adults",
    range: "19-25",
    description: "Bold, energetic, adventurous",
    intensity: "Moderate",
    intensityLevel: 2,
    icon: Zap,
    color: "#a78bfa", // violet
    bgGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    glowColor: "rgba(167, 139, 250, 0.6)",
  },
  {
    id: "adult",
    label: "Adults",
    range: "25-50",
    description: "Sophisticated, refined, balanced",
    intensity: "Rich",
    intensityLevel: 3,
    icon: Star,
    color: "#fbbf24", // amber
    bgGradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    glowColor: "rgba(251, 191, 36, 0.6)",
  },
  {
    id: "mature",
    label: "Mature",
    range: "50+",
    description: "Complex, deep, and elegant",
    intensity: "Intense",
    intensityLevel: 4,
    icon: Crown,
    color: "#f472b6", // pink
    bgGradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    glowColor: "rgba(244, 114, 182, 0.6)",
  },
]

interface AgeSelectionGridProps {
  onSelect: (age: typeof ageRanges[0] | null) => void
  selectedAge: typeof ageRanges[0] | null
}

// Floating particle component
function FloatingParticle({ color, delay }: { color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{ backgroundColor: color }}
      initial={{ opacity: 0, y: 100, x: Math.random() * 100 - 50 }}
      animate={{
        opacity: [0, 1, 0],
        y: -100,
        x: Math.random() * 100 - 50,
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

// Intensity meter component
function IntensityMeter({ level, isSelected, color }: { level: number; isSelected: boolean; color: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="relative"
          animate={isSelected && i <= level ? {
            scale: [1, 1.3, 1],
          } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            repeat: isSelected ? Infinity : 0,
            repeatDelay: 1,
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= level ? color : "rgba(255,255,255,0.15)",
              boxShadow: i <= level && isSelected ? `0 0 10px ${color}` : "none",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function AgeSelectionGrid({ onSelect, selectedAge }: AgeSelectionGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [particles, setParticles] = useState<{ id: number; color: string }[]>([])

  // Generate particles when selection changes
  useEffect(() => {
    if (selectedAge) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        color: selectedAge.color,
      }))
      setParticles(newParticles)
    }
  }, [selectedAge])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Particles container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {particles.map((particle, i) => (
            <FloatingParticle
              key={particle.id}
              color={particle.color}
              delay={i * 0.15}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Age cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {ageRanges.map((age, index) => {
          const isSelected = selectedAge?.id === age.id
          const isHovered = hoveredId === age.id
          const Icon = age.icon

          return (
            <motion.button
              key={age.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              onClick={() => onSelect(isSelected ? null : age)}
              onMouseEnter={() => setHoveredId(age.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group outline-none focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Card container */}
              <motion.div
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-500"
                animate={{
                  scale: isSelected ? 1.05 : 1,
                }}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${age.color}15, transparent)`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected ? age.color : isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: isSelected
                    ? `0 0 40px ${age.color}30, 0 0 80px ${age.color}15, inset 0 0 30px ${age.color}10`
                    : "none",
                }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${age.bgGradient} opacity-0 transition-opacity duration-500`}
                  animate={{ opacity: isSelected || isHovered ? 1 : 0 }}
                />

                {/* Pulse ring effect when selected */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{ border: `2px solid ${age.color}` }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col items-center">
                  {/* Icon with glow */}
                  <motion.div
                    className="relative mb-4"
                    animate={{
                      y: isSelected ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isSelected ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Icon glow */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 blur-xl rounded-full"
                        style={{ backgroundColor: age.color }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <Icon
                      className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 relative z-10"
                      style={{
                        color: isSelected ? age.color : isHovered ? age.color : "rgba(255,255,255,0.4)",
                        filter: isSelected ? `drop-shadow(0 0 10px ${age.color})` : "none",
                      }}
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  {/* Age range - large number */}
                  <motion.span
                    className="text-2xl sm:text-3xl font-light tracking-wide mb-1"
                    style={{
                      color: isSelected ? "#ffffff" : "rgba(255,255,255,0.8)",
                      textShadow: isSelected ? `0 0 30px ${age.color}` : "none",
                    }}
                  >
                    {age.range}
                  </motion.span>

                  {/* Label */}
                  <motion.span
                    className="text-sm sm:text-base font-light tracking-wider mb-2"
                    style={{
                      color: isSelected ? age.color : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {age.label}
                  </motion.span>

                  {/* Description - shows on selection */}
                  <AnimatePresence>
                    {(isSelected || isHovered) && (
                      <motion.span
                        className="text-xs font-light tracking-wide text-center italic"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {age.description}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Intensity meter */}
                  <IntensityMeter
                    level={age.intensityLevel}
                    isSelected={isSelected}
                    color={age.color}
                  />

                  {/* Intensity label */}
                  <motion.span
                    className="text-[10px] tracking-[0.2em] uppercase mt-2 font-light"
                    style={{
                      color: isSelected ? age.color : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {age.intensity}
                  </motion.span>

                  {/* Selection checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: age.color,
                            boxShadow: `0 0 15px ${age.color}`,
                          }}
                        >
                          <svg
                            className="w-3.5 h-3.5 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Corner accents */}
                <div
                  className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 rounded-tl-lg transition-colors duration-300"
                  style={{ borderColor: isSelected ? age.color : "rgba(255,255,255,0.1)" }}
                />
                <div
                  className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 rounded-tr-lg transition-colors duration-300"
                  style={{ borderColor: isSelected ? age.color : "rgba(255,255,255,0.1)" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 rounded-bl-lg transition-colors duration-300"
                  style={{ borderColor: isSelected ? age.color : "rgba(255,255,255,0.1)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 rounded-br-lg transition-colors duration-300"
                  style={{ borderColor: isSelected ? age.color : "rgba(255,255,255,0.1)" }}
                />
              </motion.div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
