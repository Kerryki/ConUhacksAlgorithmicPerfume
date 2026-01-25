"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HexagonBackground } from "./components/hexagon-background"
import {
  PersonalityHexGrid,
  type Personality,
} from "./components/personality-hex-grid"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Floating particle component
function FloatingParticles({ color, count = 20 }: { color: string; count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function PersonalityPage() {
  const router = useRouter()
  const [selectedPersonality, setSelectedPersonality] =
    useState<Personality | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    if (selectedPersonality) {
      setShowParticles(true)
    }
  }, [selectedPersonality])

  const handleSelect = (personality: Personality) => {
    setSelectedPersonality(personality)
  }

  const handleContinue = async () => {
    if (!selectedPersonality) return

    setIsSubmitting(true)

    const payload = {
      personality: {
        id: selectedPersonality.id,
        name: selectedPersonality.name,
        title: selectedPersonality.title,
      },
      timestamp: new Date().toISOString(),
    }

    console.log("Personality payload:", JSON.stringify(payload, null, 2))
    
    // Store to localStorage
    localStorage.setItem('perfume_personality_data', JSON.stringify(payload))
    
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitting(false)
    
    // Navigate to color picker (step 2)
    router.push('/create/color-picker')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Base hexagonal grid background */}
      <HexagonBackground />

      {/* Dynamic background that changes with personality selection */}
      <AnimatePresence mode="wait">
        {selectedPersonality && (
          <motion.div
            key={selectedPersonality.id}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main radial glow */}
            <div
              className="absolute inset-0"
              style={{ background: selectedPersonality.bgGradient }}
            />
            
            {/* Secondary ambient glow - top */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] rounded-full"
              style={{ background: selectedPersonality.glowColor }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0.1, 0.25, 0.1],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Accent glow - bottom corners */}
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[300px] blur-[100px] rounded-full"
              style={{ background: selectedPersonality.glowColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[500px] h-[300px] blur-[100px] rounded-full"
              style={{ background: selectedPersonality.glowColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.8 }}
            />

            {/* Floating particles */}
            {showParticles && (
              <FloatingParticles color={selectedPersonality.accentColor} count={25} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="px-6 pb-4 pt-8 md:pt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Step indicator - following theme pattern */}
            <motion.div 
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm"
              style={{
                background: selectedPersonality 
                  ? `linear-gradient(135deg, ${selectedPersonality.accentColor}15, transparent)`
                  : 'rgba(251, 191, 36, 0.1)',
                border: `1px solid ${selectedPersonality?.accentColor || 'rgba(251, 191, 36, 0.3)'}`,
              }}
            >
              <span 
                className="text-xs font-light tracking-widest uppercase"
                style={{ color: selectedPersonality?.accentColor || '#fbbf24' }}
              >
                Step 1 of 7
              </span>
            </motion.div>

            {/* Main title - following theme typography */}
            <h1 className="mb-3 text-4xl md:text-5xl font-light text-white tracking-wide">
              Choose Your{" "}
              <motion.span
                className="italic font-serif"
                style={{
                  color: selectedPersonality?.accentColor || '#fbbf24',
                  textShadow: selectedPersonality 
                    ? `0 0 30px ${selectedPersonality.accentColor}, 0 0 60px ${selectedPersonality.accentColor}50`
                    : '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'
                }}
                animate={selectedPersonality ? {
                  textShadow: [
                    `0 0 30px ${selectedPersonality.accentColor}, 0 0 60px ${selectedPersonality.accentColor}50`,
                    `0 0 50px ${selectedPersonality.accentColor}, 0 0 80px ${selectedPersonality.accentColor}60`,
                    `0 0 30px ${selectedPersonality.accentColor}, 0 0 60px ${selectedPersonality.accentColor}50`,
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Essence
              </motion.span>
            </h1>

            <p className="mx-auto max-w-md text-sm text-white/60 font-light tracking-wide">
              Select the archetype that resonates with your inner self
            </p>
          </motion.div>
        </header>

        {/* Hex Grid Section */}
        <motion.div
          className="flex flex-1 items-center justify-center px-4 py-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PersonalityHexGrid
            selected={selectedPersonality}
            onSelect={handleSelect}
          />
        </motion.div>

        {/* Footer / CTA */}
        <footer className="px-6 pb-8 pt-4">
          <motion.div
            className="mx-auto max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {selectedPersonality ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="flex flex-col items-center gap-5"
                >
                  {/* Selected personality display */}
                  <motion.div 
                    className="text-center px-6 py-4 rounded-2xl backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${selectedPersonality.accentColor}10, transparent)`,
                      border: `1px solid ${selectedPersonality.accentColor}30`,
                    }}
                  >
                    <p className="text-xs uppercase tracking-widest text-white/40 font-light mb-1">Selected Essence</p>
                    <p 
                      className="text-2xl font-light tracking-wide"
                      style={{ 
                        color: selectedPersonality.accentColor,
                        textShadow: `0 0 20px ${selectedPersonality.accentColor}60`
                      }}
                    >
                      {selectedPersonality.title}
                    </p>
                    <p className="text-xs text-white/50 font-light mt-1.5">{selectedPersonality.description}</p>
                  </motion.div>

                  {/* Continue button - following theme button pattern */}
                  <motion.button
                    className="relative group w-full py-4 rounded-full font-light text-lg tracking-wide overflow-hidden backdrop-blur-sm"
                    onClick={handleContinue}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: `linear-gradient(135deg, ${selectedPersonality.accentColor}25, ${selectedPersonality.accentColor}15)`,
                      border: `1px solid ${selectedPersonality.accentColor}40`,
                      boxShadow: `0 0 30px ${selectedPersonality.accentColor}20`,
                      color: '#ffffff',
                    }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                    />

                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          Continue
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-flex"
                          >
                            <ArrowRight size={20} />
                          </motion.div>
                        </>
                      )}
                    </span>
                  </motion.button>

                  <button
                    onClick={() => {
                      setSelectedPersonality(null)
                      setShowParticles(false)
                    }}
                    className="text-xs uppercase tracking-widest text-white/30 hover:text-white/50 transition-all duration-300 font-light"
                    type="button"
                  >
                    Reset Selection
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="instruction"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center"
                >
                  <motion.p 
                    className="text-white/40 text-sm font-light tracking-wide"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Select a hexagon to reveal your essence
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </footer>
      </div>
    </main>
  )
}
