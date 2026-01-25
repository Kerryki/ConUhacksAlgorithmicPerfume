"use client"

import { motion } from "framer-motion"

interface WeatherEffectsProps {
  season: "summer" | "fall" | "winter" | "spring"
  color: string
}

// Snowflake component for winter
function Snowflake({ delay, duration, left }: { delay: number; duration: number; left: string }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-white/80"
      style={{ left, top: -10 }}
      animate={{
        y: [0, typeof window !== 'undefined' ? window.innerHeight + 20 : 800],
        x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
        rotate: [0, 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Sun ray for summer
function SunRay({ index, total }: { index: number; total: number }) {
  const angle = (index / total) * 360
  return (
    <motion.div
      className="absolute w-1 h-20 origin-bottom"
      style={{
        background: "linear-gradient(to top, rgba(251, 191, 36, 0.8), transparent)",
        transform: `rotate(${angle}deg)`,
        left: "50%",
        top: "50%",
        transformOrigin: "bottom center",
        marginLeft: "-2px",
      }}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scaleY: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2,
        delay: index * 0.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// Falling leaf for fall
function FallingLeaf({ delay, duration, left, color }: { delay: number; duration: number; left: string; color: string }) {
  return (
    <motion.div
      className="absolute text-2xl"
      style={{ left, top: -30 }}
      animate={{
        y: [0, typeof window !== 'undefined' ? window.innerHeight + 30 : 800],
        x: [0, 30, -20, 40, 0],
        rotate: [0, 45, -30, 60, 0],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
    </motion.div>
  )
}

// Floating petal for spring
function FloatingPetal({ delay, startX, color }: { delay: number; startX: number; color: string }) {
  return (
    <motion.div
      className="absolute w-3 h-4 rounded-full"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}80)`,
        left: startX,
        bottom: -20,
      }}
      animate={{
        y: [0, -400, -600],
        x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
        rotate: [0, 180, 360],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  )
}

export function WeatherEffects({ season }: WeatherEffectsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Winter - Snowfall */}
      {season === "winter" && (
        <>
          {Array.from({ length: 40 }).map((_, i) => (
            <Snowflake
              key={i}
              delay={Math.random() * 5}
              duration={5 + Math.random() * 5}
              left={`${Math.random() * 100}%`}
            />
          ))}
          {/* Frost overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(200, 230, 255, 0.05) 100%)",
            }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </>
      )}

      {/* Summer - Sun rays */}
      {season === "summer" && (
        <>
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2">
            {Array.from({ length: 12 }).map((_, i) => (
              <SunRay key={i} index={i} total={12} />
            ))}
            {/* Sun center */}
            <motion.div
              className="absolute w-24 h-24 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: "radial-gradient(circle, rgba(251, 191, 36, 0.9), rgba(251, 191, 36, 0.3))",
                boxShadow: "0 0 60px rgba(251, 191, 36, 0.6), 0 0 120px rgba(251, 191, 36, 0.3)",
                left: "50%",
                top: "50%",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          {/* Heat shimmer */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-48"
            style={{
              background: "linear-gradient(to top, rgba(251, 191, 36, 0.1), transparent)",
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
      )}

      {/* Fall - Falling leaves */}
      {season === "fall" && (
        <>
          {Array.from({ length: 25 }).map((_, i) => (
            <FallingLeaf
              key={i}
              delay={Math.random() * 8}
              duration={6 + Math.random() * 4}
              left={`${Math.random() * 100}%`}
              color={["#f59e0b", "#ea580c", "#dc2626", "#b91c1c"][Math.floor(Math.random() * 4)]}
            />
          ))}
          {/* Warm overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(234, 88, 12, 0.05), transparent, rgba(185, 28, 28, 0.05))",
            }}
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </>
      )}

      {/* Spring - Floating petals */}
      {season === "spring" && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <FloatingPetal
              key={i}
              delay={Math.random() * 6}
              startX={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800)}
              color={["#f9a8d4", "#fbcfe8", "#fce7f3", "#fdf2f8"][Math.floor(Math.random() * 4)]}
            />
          ))}
          {/* Bloom glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(236, 72, 153, 0.1), transparent 60%)",
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </>
      )}
    </div>
  )
}
