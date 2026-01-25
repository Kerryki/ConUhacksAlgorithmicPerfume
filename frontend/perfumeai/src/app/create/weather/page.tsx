"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { HexagonBackground } from "@/components/hexagon-background"
import { SeasonArcSelector, seasons, type Season } from "@/components/season-arc-selector"
import { WeatherEffects } from "@/components/weather-effects"
import Link from "next/link"

export default function SeasonPage() {
  const router = useRouter()
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle season selection
  const handleSelect = (season: Season | null) => {
    setSelectedSeason(season)
  }

  // Handle continue
  const handleContinue = async () => {
    if (!selectedSeason) return

    setIsSubmitting(true)

    const payload = {
      season: {
        id: selectedSeason.id,
        name: selectedSeason.name,
        value: selectedSeason.value, // 1=summer, 2=fall, 3=winter, 4=spring
        scentProfile: selectedSeason.scentProfile,
      },
    }

    console.log("Season selection payload:", JSON.stringify(payload, null, 2))
    
    // Store to localStorage
    localStorage.setItem('perfume_weather_data', JSON.stringify(payload))
    
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitting(false)
    
    // Navigate to personal name page (final step before results)
    router.push('/create/personal-name')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Hexagonal background */}
      <HexagonBackground />

      {/* Weather animation effects */}
      <AnimatePresence>
        {selectedSeason && (
          <WeatherEffects season={selectedSeason.id} color={selectedSeason.color} />
        )}
      </AnimatePresence>

      {/* Dynamic background based on selection */}
      <AnimatePresence>
        {selectedSeason && (
          <>
            {/* Main radial gradient */}
            <motion.div
              key={`bg-${selectedSeason.id}`}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `radial-gradient(ellipse at center 60%, ${selectedSeason.color}20 0%, transparent 60%)`,
              }}
            />

            {/* Pulsing center glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: `radial-gradient(circle at 50% 70%, ${selectedSeason.color}25 0%, transparent 50%)`,
              }}
            />

            {/* Ambient corner glows */}
            <motion.div
              className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at top left, ${selectedSeason.color}15 0%, transparent 60%)`,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at bottom right, ${selectedSeason.color}15 0%, transparent 60%)`,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/create/accord-selection"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wide">Back</span>
          </Link>

          {/* Step indicator */}
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: selectedSeason
                ? `linear-gradient(135deg, ${selectedSeason.color}15, transparent)`
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${selectedSeason ? selectedSeason.color + "40" : "rgba(255,255,255,0.1)"}`,
              boxShadow: selectedSeason ? `0 0 20px ${selectedSeason.color}20` : "none",
            }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase font-light"
              style={{ color: selectedSeason ? selectedSeason.color : "rgba(255,255,255,0.6)" }}
            >
              Step
            </span>
            <span
              className="text-sm font-light"
              style={{ color: selectedSeason ? selectedSeason.color : "#fbbf24" }}
            >
              8 / 9
            </span>
          </motion.div>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          {/* Title section */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="text-xs tracking-[0.3em] uppercase font-light mb-3 block"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Climate Preference
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-4">
              Your{" "}
              <motion.span
                className="italic font-serif"
                animate={{
                  textShadow: selectedSeason
                    ? `0 0 40px ${selectedSeason.color}, 0 0 80px ${selectedSeason.color}50`
                    : "0 0 40px rgba(251, 191, 36, 0.5)",
                  color: selectedSeason ? selectedSeason.color : "#fbbf24",
                }}
              >
                Season
              </motion.span>
            </h1>

            <p className="text-sm sm:text-base font-light tracking-wide text-white/50 max-w-md mx-auto">
              Choose the climate that resonates with your essence
            </p>
          </motion.div>

          {/* Season Arc Selector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full mb-8"
          >
            <SeasonArcSelector
              onSelect={handleSelect}
              selectedSeason={selectedSeason}
            />
          </motion.div>

          {/* Selected season info card */}
          <AnimatePresence>
            {selectedSeason && (
              <motion.div
                className="w-full max-w-md mx-auto mb-8"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="rounded-2xl backdrop-blur-md p-6 text-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${selectedSeason.color}15, ${selectedSeason.color}05)`,
                    border: `1px solid ${selectedSeason.color}40`,
                    boxShadow: `0 0 40px ${selectedSeason.color}15`,
                  }}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      border: `2px solid ${selectedSeason.color}`,
                      opacity: 0.3,
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Season icon */}
                  <motion.div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${selectedSeason.gradientFrom}, ${selectedSeason.gradientTo})`,
                      boxShadow: `0 0 30px ${selectedSeason.color}50`,
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        `0 0 30px ${selectedSeason.color}50`,
                        `0 0 50px ${selectedSeason.color}70`,
                        `0 0 30px ${selectedSeason.color}50`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <selectedSeason.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <p
                    className="text-2xl font-light tracking-wide mb-2"
                    style={{ color: selectedSeason.color }}
                  >
                    {selectedSeason.name}
                  </p>
                  
                  <p className="text-sm font-light text-white/60 italic mb-3">
                    {selectedSeason.description}
                  </p>

                  <div
                    className="text-xs tracking-wider px-4 py-2 rounded-full inline-block"
                    style={{
                      background: `${selectedSeason.color}20`,
                      color: selectedSeason.color,
                    }}
                  >
                    {selectedSeason.scentProfile}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue button */}
          <AnimatePresence>
            {selectedSeason && (
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className="relative group px-10 py-4 rounded-full font-light tracking-widest text-sm uppercase overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${selectedSeason.gradientFrom}, ${selectedSeason.gradientTo})`,
                    color: selectedSeason.id === "winter" ? "#1e3a5f" : "#050505",
                    boxShadow: `0 0 30px ${selectedSeason.color}50, 0 0 60px ${selectedSeason.color}30`,
                  }}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
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

                  {/* Inner glow border */}
                  <div
                    className="absolute inset-[1px] rounded-full opacity-50"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.4), transparent)",
                    }}
                  />

                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Continuing...
                      </>
                    ) : (
                      <>
                        Confirm Season
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint when no selection */}
          {!selectedSeason && (
            <motion.p
              className="text-xs tracking-wider text-white/30 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Select a season on the arc above
            </motion.p>
          )}
        </div>

        {/* Footer note */}
        <motion.footer
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-[10px] tracking-widest uppercase text-white/30 font-light">
            This adjusts temperature, diffusion, and freshness of your scent
          </p>
        </motion.footer>
      </div>
    </main>
  )
}
