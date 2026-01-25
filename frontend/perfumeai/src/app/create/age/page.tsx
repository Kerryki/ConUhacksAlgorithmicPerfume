"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { HexagonBackground } from "./components/hexagon-background"
import { AgeSelectionGrid, ageRanges } from "./components/age-selection-grid"
import Link from "next/link"
import { useRouter } from "next/navigation"

type AgeRange = typeof ageRanges[number]

export default function AgePage() {
  const router = useRouter()
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Handle age selection
  const handleSelect = (age: AgeRange | null) => {
    setSelectedAge(age)
    if (age) {
      setShowConfirmation(true)
    }
  }

  // Handle continue
  const handleContinue = () => {
    if (selectedAge) {
      const payload = {
        ageGroup: {
          id: selectedAge.id,
          label: selectedAge.label,
          range: selectedAge.range,
          intensity: selectedAge.intensity,
          intensityLevel: selectedAge.intensityLevel,
        },
      }
      console.log("Age selection payload:", JSON.stringify(payload, null, 2))
      
      // Store to localStorage
      localStorage.setItem('perfume_age_data', JSON.stringify(payload))
      
      // Navigate to gender expression (step 5)
      router.push('/create/gender-expression')
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Hexagonal background */}
      <HexagonBackground />

      {/* Dynamic background based on selection */}
      <AnimatePresence>
        {selectedAge && (
          <>
            {/* Main radial gradient */}
            <motion.div
              key={`bg-${selectedAge.id}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `radial-gradient(ellipse at center, ${selectedAge.color}15 0%, transparent 60%)`,
              }}
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
                background: `radial-gradient(circle at 50% 50%, ${selectedAge.color}20 0%, transparent 40%)`,
              }}
            />

            {/* Ambient corner glows */}
            <motion.div
              className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at top left, ${selectedAge.color}10 0%, transparent 70%)`,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at bottom right, ${selectedAge.color}10 0%, transparent 70%)`,
              }}
            />

            {/* Rising particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: selectedAge.color,
                    left: `${Math.random() * 100}%`,
                    bottom: 0,
                  }}
                  animate={{
                    y: [0, -window.innerHeight],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

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
            href="/create/longevity-projection"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide">Back</span>
          </Link>

          {/* Step indicator */}
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: selectedAge
                ? `linear-gradient(135deg, ${selectedAge.color}15, transparent)`
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${selectedAge ? selectedAge.color + "40" : "rgba(255,255,255,0.1)"}`,
              boxShadow: selectedAge ? `0 0 20px ${selectedAge.color}20` : "none",
            }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase font-light"
              style={{ color: selectedAge ? selectedAge.color : "rgba(255,255,255,0.6)" }}
            >
              Step
            </span>
            <span
              className="text-sm font-light"
              style={{ color: selectedAge ? selectedAge.color : "#fbbf24" }}
            >
              4 / 8
            </span>
          </motion.div>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
          {/* Title section */}
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="text-xs tracking-[0.3em] uppercase font-light mb-3 block"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Life Stage
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
              Your{" "}
              <motion.span
                className="italic font-serif"
                animate={{
                  textShadow: selectedAge
                    ? `0 0 40px ${selectedAge.color}, 0 0 80px ${selectedAge.color}50`
                    : "0 0 40px rgba(251, 191, 36, 0.5)",
                }}
                style={{ color: selectedAge ? selectedAge.color : "#fbbf24" }}
              >
                Maturity
              </motion.span>
            </h1>

            <p className="text-sm sm:text-base font-light tracking-wide text-white/50 max-w-md mx-auto">
              Scent intensity and depth evolve with life experience
            </p>
          </motion.div>

          {/* Age selection grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full mb-10"
          >
            <AgeSelectionGrid
              onSelect={handleSelect}
              selectedAge={selectedAge}
            />
          </motion.div>

          {/* Selection info card */}
          <AnimatePresence>
            {selectedAge && (
              <motion.div
                className="w-full max-w-md mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="rounded-2xl backdrop-blur-sm p-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${selectedAge.color}10, transparent)`,
                    border: `1px solid ${selectedAge.color}30`,
                  }}
                >
                  <p className="text-sm font-light text-white/70 mb-2">
                    You selected
                  </p>
                  <p
                    className="text-xl font-light tracking-wide"
                    style={{ color: selectedAge.color }}
                  >
                    {selectedAge.label}
                  </p>
                  <p className="text-xs font-light text-white/50 mt-2 italic">
                    {selectedAge.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue button */}
          <AnimatePresence>
            {selectedAge && (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  onClick={handleContinue}
                  className="relative group px-10 py-4 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${selectedAge.color}, ${selectedAge.color}cc)`,
                    color: "#050505",
                    boxShadow: `0 0 30px ${selectedAge.color}50, 0 0 60px ${selectedAge.color}30`,
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
            )}
          </AnimatePresence>

          {/* Hint when no selection */}
          {!selectedAge && (
            <motion.p
              className="text-xs tracking-wider text-white/30 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Select your life stage to continue
            </motion.p>
          )}
        </div>

        {/* Footer note */}
        <motion.footer
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-[10px] tracking-widest uppercase text-white/30 font-light">
            This influences concentration and depth of notes
          </p>
        </motion.footer>
      </div>
    </main>
  )
}
