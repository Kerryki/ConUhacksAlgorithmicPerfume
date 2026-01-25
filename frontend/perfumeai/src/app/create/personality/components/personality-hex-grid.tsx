"use client"

import { motion } from "framer-motion"
import { Sun, Heart, Minus, Compass, Flame, BookOpen, Sparkles } from "lucide-react"
import type React from "react"

export interface Personality {
  id: string
  name: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  tagline: string
  gradient: string
  glowColor: string
  bgGradient: string
  accentColor: string
}

export const personalities: Personality[] = [
  {
    id: "optimist",
    name: "Optimist",
    title: "The Optimist",
    icon: Sun,
    description: "Bright, uplifting, radiant energy",
    tagline: "See the light in everything",
    gradient: "from-amber-400 via-yellow-500 to-orange-400",
    glowColor: "rgba(251, 191, 36, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 40%, transparent 70%)",
    accentColor: "#fbbf24",
  },
  {
    id: "romantic",
    name: "Romantic",
    title: "The Romantic",
    icon: Heart,
    description: "Passionate, tender, deeply emotional",
    tagline: "Love is your language",
    gradient: "from-rose-400 via-pink-500 to-red-400",
    glowColor: "rgba(244, 114, 182, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(244, 114, 182, 0.15) 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%)",
    accentColor: "#f472b6",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    title: "The Minimalist",
    icon: Minus,
    description: "Clean, refined, elegantly simple",
    tagline: "Less is more",
    gradient: "from-slate-300 via-gray-400 to-zinc-500",
    glowColor: "rgba(148, 163, 184, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(148, 163, 184, 0.12) 0%, rgba(100, 116, 139, 0.06) 40%, transparent 70%)",
    accentColor: "#94a3b8",
  },
  {
    id: "explorer",
    name: "Explorer",
    title: "The Explorer",
    icon: Compass,
    description: "Adventurous, curious, free-spirited",
    tagline: "The world awaits",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glowColor: "rgba(45, 212, 191, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(45, 212, 191, 0.15) 0%, rgba(20, 184, 166, 0.08) 40%, transparent 70%)",
    accentColor: "#2dd4bf",
  },
  {
    id: "rebel",
    name: "Rebel",
    title: "The Rebel",
    icon: Flame,
    description: "Bold, unconventional, fearless",
    tagline: "Break the rules",
    gradient: "from-red-500 via-orange-500 to-amber-500",
    glowColor: "rgba(239, 68, 68, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.15) 0%, rgba(234, 88, 12, 0.08) 40%, transparent 70%)",
    accentColor: "#ef4444",
  },
  {
    id: "intellectual",
    name: "Intellectual",
    title: "The Intellectual",
    icon: BookOpen,
    description: "Thoughtful, analytical, wise",
    tagline: "Knowledge is power",
    gradient: "from-blue-400 via-indigo-500 to-violet-500",
    glowColor: "rgba(99, 102, 241, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.08) 40%, transparent 70%)",
    accentColor: "#6366f1",
  },
  {
    id: "enigma",
    name: "Enigma",
    title: "The Enigma",
    icon: Sparkles,
    description: "Mysterious, captivating, alluring",
    tagline: "Embrace the unknown",
    gradient: "from-purple-400 via-fuchsia-500 to-pink-500",
    glowColor: "rgba(192, 132, 252, 0.6)",
    bgGradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)",
    accentColor: "#c084fc",
  },
]

interface PersonalityHexGridProps {
  selected: Personality | null
  onSelect: (personality: Personality) => void
}

function HexagonButton({
  personality,
  isSelected,
  onClick,
  index,
}: {
  personality: Personality
  isSelected: boolean
  onClick: () => void
  index: number
}) {
  const Icon = personality.icon

  return (
    <motion.button
      onClick={onClick}
      className="relative group outline-none focus:outline-none"
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: isSelected ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Outer glow ring for selected */}
        {isSelected && (
          <>
            <motion.div
              className="absolute -inset-4 rounded-full blur-2xl"
              style={{ background: personality.glowColor }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.4, 0.7, 0.4], 
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Particle burst effect */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  background: personality.accentColor,
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos(i * 60 * Math.PI / 180) * 70,
                  y: Math.sin(i * 60 * Math.PI / 180) * 70,
                }}
                transition={{ 
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}

        {/* Main hexagon */}
        <svg
          viewBox="0 0 100 115"
          className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 lg:w-36 lg:h-40 drop-shadow-lg"
        >
          <defs>
            <linearGradient
              id={`grad-${personality.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              {isSelected ? (
                <>
                  <stop offset="0%" stopColor={personality.accentColor} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={personality.accentColor} stopOpacity="0.6" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="rgba(30, 30, 40, 0.9)" />
                  <stop offset="100%" stopColor="rgba(20, 20, 30, 0.95)" />
                </>
              )}
            </linearGradient>
            <filter id={`glow-${personality.id}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Hexagon background */}
          <polygon
            points="50 2, 98 29.75, 98 85.25, 50 113, 2 85.25, 2 29.75"
            fill={`url(#grad-${personality.id})`}
            filter={isSelected ? `url(#glow-${personality.id})` : undefined}
            className="transition-all duration-300"
            stroke={isSelected ? personality.accentColor : "rgba(255,255,255,0.1)"}
            strokeWidth={isSelected ? 2.5 : 1}
          />

          {/* Inner hexagon border */}
          <polygon
            points="50 8, 92 32, 92 83, 50 107, 8 83, 8 32"
            fill="transparent"
            stroke={isSelected ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.05)"}
            strokeWidth="1"
            className="transition-all duration-300"
          />

          {/* Hover shimmer effect */}
          <polygon
            points="50 2, 98 29.75, 98 85.25, 50 113, 2 85.25, 2 29.75"
            fill="transparent"
            className="transition-all duration-300 opacity-0 group-hover:opacity-100"
            stroke={personality.accentColor}
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
        </svg>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2">
          <motion.div
            className="relative"
            animate={{
              scale: isSelected ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon glow */}
            {isSelected && (
              <motion.div
                className="absolute inset-0 blur-md"
                style={{ color: personality.accentColor }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
              </motion.div>
            )}
            <span 
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10 transition-colors duration-300 inline-flex"
              style={{ color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
            >
              <Icon className="w-full h-full" />
            </span>
          </motion.div>

          <motion.span
            className="text-xs sm:text-sm font-light tracking-wider text-center leading-tight"
            style={{ 
              color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)',
              textShadow: isSelected ? `0 0 20px ${personality.accentColor}` : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            {personality.name}
          </motion.span>

          {isSelected && (
            <motion.span
              className="text-[9px] sm:text-[10px] font-light tracking-wide text-center leading-tight max-w-[70px] sm:max-w-[80px] italic"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {personality.tagline}
            </motion.span>
          )}
        </div>

        {/* Selection checkmark */}
        {isSelected && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: personality.accentColor }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  )
}

export function PersonalityHexGrid({
  selected,
  onSelect,
}: PersonalityHexGridProps) {
  const row1 = personalities.slice(0, 3)
  const row2 = personalities.slice(3, 5)
  const row3 = personalities.slice(5, 7)

  return (
    <div className="flex flex-col items-center gap-0">
      {/* Row 1 */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
        {row1.map((personality, index) => (
          <HexagonButton
            key={personality.id}
            personality={personality}
            isSelected={selected?.id === personality.id}
            onClick={() => onSelect(personality)}
            index={index}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 -mt-4 sm:-mt-5 md:-mt-6">
        {row2.map((personality, index) => (
          <HexagonButton
            key={personality.id}
            personality={personality}
            isSelected={selected?.id === personality.id}
            onClick={() => onSelect(personality)}
            index={index + 3}
          />
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 -mt-4 sm:-mt-5 md:-mt-6">
        {row3.map((personality, index) => (
          <HexagonButton
            key={personality.id}
            personality={personality}
            isSelected={selected?.id === personality.id}
            onClick={() => onSelect(personality)}
            index={index + 5}
          />
        ))}
      </div>
    </div>
  )
}
