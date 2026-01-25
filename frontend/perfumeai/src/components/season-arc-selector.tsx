"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useSpring } from "framer-motion"
import { Sun, Leaf, Snowflake, Flower2 } from "lucide-react"

export interface Season {
  id: "summer" | "fall" | "winter" | "spring"
  name: string
  value: number // 1-4 for backend
  color: string
  gradientFrom: string
  gradientTo: string
  icon: typeof Sun
  description: string
  scentProfile: string
  angle: number // position on arc (0 = left, 180 = right)
}

export const seasons: Season[] = [
  {
    id: "winter",
    name: "Winter",
    value: 3,
    color: "#60a5fa",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    icon: Snowflake,
    description: "Crisp, cozy, and contemplative",
    scentProfile: "Warm spices, amber, vanilla",
    angle: 0,
  },
  {
    id: "spring",
    name: "Spring",
    value: 4,
    color: "#f472b6",
    gradientFrom: "#ec4899",
    gradientTo: "#db2777",
    icon: Flower2,
    description: "Fresh, floral, and awakening",
    scentProfile: "Light florals, green notes, citrus",
    angle: 60,
  },
  {
    id: "summer",
    name: "Summer",
    value: 1,
    color: "#fbbf24",
    gradientFrom: "#f59e0b",
    gradientTo: "#d97706",
    icon: Sun,
    description: "Vibrant, warm, and radiant",
    scentProfile: "Tropical fruits, coconut, aquatic",
    angle: 120,
  },
  {
    id: "fall",
    name: "Fall",
    value: 2,
    color: "#f97316",
    gradientFrom: "#ea580c",
    gradientTo: "#c2410c",
    icon: Leaf,
    description: "Rich, warm, and grounding",
    scentProfile: "Woods, leather, dried leaves",
    angle: 180,
  },
]

interface SeasonArcSelectorProps {
  onSelect: (season: Season | null) => void
  selectedSeason: Season | null
}

export function SeasonArcSelector({ onSelect, selectedSeason }: SeasonArcSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<Season | null>(null)

  // Animated indicator position
  const indicatorAngle = useSpring(selectedSeason?.angle ?? 90, {
    stiffness: 100,
    damping: 20,
  })

  useEffect(() => {
    if (selectedSeason) {
      indicatorAngle.set(selectedSeason.angle)
    }
  }, [selectedSeason, indicatorAngle])

  // Arc dimensions
  const arcRadius = 180
  const arcWidth = 12
  const centerX = 200
  const centerY = 200

  // Convert angle to position on arc
  const angleToPosition = (angle: number) => {
    const rad = ((180 - angle) * Math.PI) / 180
    return {
      x: centerX + arcRadius * Math.cos(rad),
      y: centerY - arcRadius * Math.sin(rad),
    }
  }

  // Handle click on season
  const handleSeasonClick = (season: Season) => {
    onSelect(season)
  }

  return (
    <div className="relative w-full max-w-[400px] mx-auto" ref={containerRef}>
      {/* SVG Arc */}
      <svg
        viewBox="0 0 400 240"
        className="w-full"
        style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
      >
        <defs>
          {/* Gradient for the arc background */}
          <linearGradient id="arcBgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.3)" />
            <stop offset="33%" stopColor="rgba(244, 114, 182, 0.3)" />
            <stop offset="66%" stopColor="rgba(251, 191, 36, 0.3)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0.3)" />
          </linearGradient>

          {/* Gradient for selected arc segment */}
          {selectedSeason && (
            <linearGradient id="selectedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={selectedSeason.gradientFrom} />
              <stop offset="100%" stopColor={selectedSeason.gradientTo} />
            </linearGradient>
          )}

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path
          d={`M ${centerX - arcRadius} ${centerY} A ${arcRadius} ${arcRadius} 0 0 1 ${centerX + arcRadius} ${centerY}`}
          fill="none"
          stroke="url(#arcBgGradient)"
          strokeWidth={arcWidth}
          strokeLinecap="round"
          opacity={0.4}
        />

        {/* Active segment highlight */}
        {selectedSeason && (
          <motion.path
            d={`M ${centerX - arcRadius} ${centerY} A ${arcRadius} ${arcRadius} 0 0 1 ${centerX + arcRadius} ${centerY}`}
            fill="none"
            stroke={selectedSeason.color}
            strokeWidth={arcWidth + 4}
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.6,
              strokeDashoffset: [0, -20],
            }}
            transition={{ 
              pathLength: { duration: 1 },
              opacity: { duration: 0.5 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
            }}
            style={{
              strokeDasharray: "10 20",
            }}
          />
        )}

        {/* Season markers on arc */}
        {seasons.map((season) => {
          const pos = angleToPosition(season.angle)
          const isSelected = selectedSeason?.id === season.id
          const isHovered = hovered?.id === season.id

          return (
            <g key={season.id}>
              {/* Marker glow when selected */}
              {isSelected && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={32}
                  fill={season.color}
                  opacity={0.3}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Marker circle */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={isSelected ? 28 : isHovered ? 24 : 20}
                fill={isSelected ? season.color : "rgba(10, 10, 10, 0.9)"}
                stroke={season.color}
                strokeWidth={isSelected ? 3 : 2}
                style={{ cursor: "pointer" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSeasonClick(season)}
                onMouseEnter={() => setHovered(season)}
                onMouseLeave={() => setHovered(null)}
                animate={{
                  filter: isSelected ? `drop-shadow(0 0 15px ${season.color})` : "none",
                }}
              />
            </g>
          )
        })}
      </svg>

      {/* Season icons overlay - positioned absolutely */}
      <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
        {seasons.map((season) => {
          const pos = angleToPosition(season.angle)
          const isSelected = selectedSeason?.id === season.id
          const Icon = season.icon

          // Convert SVG coordinates to percentage
          const leftPercent = (pos.x / 400) * 100
          const topPercent = (pos.y / 240) * 100

          return (
            <motion.div
              key={`icon-${season.id}`}
              className="absolute flex items-center justify-center"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "auto",
                cursor: "pointer",
              }}
              onClick={() => handleSeasonClick(season)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon
                className="w-6 h-6 sm:w-7 sm:h-7"
                style={{
                  color: isSelected ? "#050505" : season.color,
                  filter: isSelected ? "none" : `drop-shadow(0 0 8px ${season.color})`,
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Season labels below arc */}
      <div className="flex justify-between px-4 mt-4">
        {seasons.map((season) => {
          const isSelected = selectedSeason?.id === season.id
          return (
            <motion.button
              key={`label-${season.id}`}
              onClick={() => handleSeasonClick(season)}
              className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all"
              style={{
                background: isSelected ? `${season.color}20` : "transparent",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className="text-xs sm:text-sm font-light tracking-wider"
                style={{
                  color: isSelected ? season.color : "rgba(255,255,255,0.5)",
                  textShadow: isSelected ? `0 0 20px ${season.color}` : "none",
                }}
              >
                {season.name}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
