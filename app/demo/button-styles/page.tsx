/* eslint-disable react/no-inline-styles */
"use client"

import { motion } from "motion/react"
import { useState } from "react"

function ButtonGrid({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  )
}

function ButtonCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
      {children}
      <span className="text-sm text-gray-400 text-center">{label}</span>
    </div>
  )
}

export default function ButtonStylesPage() {
  const [clickedButtons, setClickedButtons] = useState<Record<number, boolean>>({})

  const handleClick = (id: number) => {
    setClickedButtons((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setClickedButtons((prev) => ({ ...prev, [id]: false }))
    }, 600)
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="text-center mb-16">
        <h1 className="text-7xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Premium Button Collection
        </h1>
        <p className="text-2xl text-gray-400">50 Master-Crafted Button Designs</p>
      </div>

      <ButtonGrid title="Gradient & Glow">
        {/* Button 1: Neon Gradient */}
        <ButtonCard label="Neon Gradient">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-lg shadow-2xl shadow-purple-500/50"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(1)}
          >
            Neon Glow
          </motion.button>
        </ButtonCard>

        {/* Button 2: Shimmer */}
        <ButtonCard label="Shimmer Effect">
          <motion.button
            className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(2)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Shimmer</span>
          </motion.button>
        </ButtonCard>

        {/* Button 3: Pulse Glow */}
        <ButtonCard label="Pulse Glow">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.5)",
                "0 0 60px rgba(6, 182, 212, 0.8)",
                "0 0 20px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(3)}
          >
            Pulse
          </motion.button>
        </ButtonCard>

        {/* Button 4: Rainbow Border */}
        <ButtonCard label="Rainbow Border">
          <motion.button
            className="relative px-8 py-4 bg-black text-white font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(4)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ padding: "3px" }}
            />
            <div className="absolute inset-[3px] bg-black rounded-lg" />
            <span className="relative z-10">Rainbow</span>
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="3D & Depth">
        {/* Button 5: 3D Raised */}
        <ButtonCard label="3D Raised">
          <motion.button
            className="px-8 py-4 bg-gradient-to-b from-orange-400 to-orange-600 text-white font-bold rounded-lg"
            style={{
              boxShadow: "0 8px 0 #c2410c, 0 12px 20px rgba(0,0,0,0.3)",
            }}
            whileHover={{ y: -4 }}
            whileTap={{
              y: 4,
              boxShadow: "0 4px 0 #c2410c, 0 6px 10px rgba(0,0,0,0.3)",
            }}
            onClick={() => handleClick(5)}
          >
            3D Press
          </motion.button>
        </ButtonCard>

        {/* Button 6: Neumorphic */}
        <ButtonCard label="Neumorphic">
          <motion.button
            className="px-8 py-4 bg-gray-800 text-white font-bold rounded-2xl"
            style={{
              boxShadow: "8px 8px 16px #0a0a0a, -8px -8px 16px #2a2a2a",
            }}
            whileHover={{
              boxShadow: "4px 4px 8px #0a0a0a, -4px -4px 8px #2a2a2a",
            }}
            whileTap={{
              boxShadow: "inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #2a2a2a",
            }}
            onClick={() => handleClick(6)}
          >
            Neumorphic
          </motion.button>
        </ButtonCard>

        {/* Button 7: Layered Shadow */}
        <ButtonCard label="Layered Shadow">
          <motion.button
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg"
            whileHover={{
              y: -8,
              boxShadow:
                "0 4px 0 #7c3aed, 0 8px 0 #6d28d9, 0 12px 0 #5b21b6, 0 16px 20px rgba(0,0,0,0.4)",
            }}
            whileTap={{ y: 0 }}
            style={{
              boxShadow: "0 4px 0 #7c3aed, 0 8px 0 #6d28d9, 0 12px 20px rgba(0,0,0,0.3)",
            }}
            onClick={() => handleClick(7)}
          >
            Layered
          </motion.button>
        </ButtonCard>

        {/* Button 8: Glass Morphism */}
        <ButtonCard label="Glass Morphism">
          <motion.button
            className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white font-bold rounded-lg border border-white/20"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(8)}
          >
            Glass
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Animated & Interactive">
        {/* Button 9: Ripple */}
        <ButtonCard label="Ripple Effect">
          <motion.button
            className="relative px-8 py-4 bg-blue-600 text-white font-bold rounded-lg overflow-hidden"
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(9)}
          >
            {clickedButtons[9] && (
              <motion.span
                className="absolute inset-0 bg-white/30 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
            Ripple
          </motion.button>
        </ButtonCard>

        {/* Button 10: Slide Fill */}
        <ButtonCard label="Slide Fill">
          <motion.button
            className="relative px-8 py-4 bg-transparent text-orange-500 font-bold rounded-lg border-2 border-orange-500 overflow-hidden"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(10)}
          >
            <motion.div
              className="absolute inset-0 bg-orange-500 z-0"
              initial={{ x: "-100%" }}
              variants={{
                hover: { x: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 mix-blend-difference">Slide</span>
          </motion.button>
        </ButtonCard>

        {/* Button 11: Bounce */}
        <ButtonCard label="Bounce">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg"
            whileHover={{
              y: [0, -20, 0, -10, 0],
              transition: { duration: 0.6 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(11)}
          >
            Bounce
          </motion.button>
        </ButtonCard>

        {/* Button 12: Rotate */}
        <ButtonCard label="Rotate">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg"
            whileHover={{ rotate: [0, -5, 5, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(12)}
          >
            Rotate
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Border & Outline">
        {/* Button 13: Animated Border */}
        <ButtonCard label="Animated Border">
          <motion.button
            className="relative px-8 py-4 bg-black text-white font-bold rounded-lg"
            whileHover="hover"
            onClick={() => handleClick(13)}
          >
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6, #f59e0b)",
                backgroundSize: "300% 100%",
              }}
              variants={{
                hover: {
                  backgroundPosition: ["0% 0%", "100% 0%"],
                  transition: { duration: 1, repeat: Infinity },
                },
              }}
            />
            <div className="absolute inset-[2px] bg-black rounded-lg" />
            <span className="relative z-10">Border Flow</span>
          </motion.button>
        </ButtonCard>

        {/* Button 14: Double Border */}
        <ButtonCard label="Double Border">
          <motion.button
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg border-2 border-purple-500 outline outline-2 outline-offset-2 outline-pink-500"
            whileHover={{
              outlineOffset: "4px",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(14)}
          >
            Double
          </motion.button>
        </ButtonCard>

        {/* Button 15: Dashed Border */}
        <ButtonCard label="Dashed Animate">
          <motion.button
            className="px-8 py-4 bg-black text-cyan-400 font-bold rounded-lg"
            style={{
              border: "2px dashed #22d3ee",
            }}
            whileHover={{
              borderColor: "#06b6d4",
              color: "#06b6d4",
            }}
            animate={{
              borderColor: ["#22d3ee", "#0891b2", "#22d3ee"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => handleClick(15)}
          >
            Dashed
          </motion.button>
        </ButtonCard>

        {/* Button 16: Outline Expand */}
        <ButtonCard label="Outline Expand">
          <motion.button
            className="px-8 py-4 bg-transparent text-orange-500 font-bold rounded-lg border-2 border-orange-500"
            whileHover={{
              boxShadow: "0 0 0 8px rgba(249, 115, 22, 0.2)",
              borderColor: "#fb923c",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(16)}
          >
            Expand
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Text Effects">
        {/* Button 17: Gradient Text */}
        <ButtonCard label="Gradient Text">
          <motion.button
            className="px-8 py-4 bg-gray-900 font-bold rounded-lg border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(17)}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Gradient Text
            </span>
          </motion.button>
        </ButtonCard>

        {/* Button 18: Glitch Text */}
        <ButtonCard label="Glitch Effect">
          <motion.button
            className="px-8 py-4 bg-black text-green-400 font-bold rounded-lg border border-green-500"
            whileHover="hover"
            onClick={() => handleClick(18)}
          >
            <motion.span
              variants={{
                hover: {
                  x: [0, -2, 2, -2, 2, 0],
                  textShadow: [
                    "0 0 0 transparent",
                    "2px 0 0 #ff00ff, -2px 0 0 #00ffff",
                    "0 0 0 transparent",
                  ],
                  transition: { duration: 0.3 },
                },
              }}
              className="inline-block"
            >
              Glitch
            </motion.span>
          </motion.button>
        </ButtonCard>

        {/* Button 19: Typewriter */}
        <ButtonCard label="Text Scramble">
          <motion.button
            className="px-8 py-4 bg-purple-900 text-white font-bold rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(19)}
          >
            <motion.span
              animate={{
                opacity: [1, 0.5, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              Scramble
            </motion.span>
          </motion.button>
        </ButtonCard>

        {/* Button 20: Shadow Text */}
        <ButtonCard label="Shadow Pop">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg"
            whileHover={{
              textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(20)}
          >
            Shadow Pop
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Special Effects">
        {/* Button 21: Magnetic */}
        <ButtonCard label="Magnetic">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg"
            whileHover={{
              scale: 1.1,
              rotate: [0, -2, 2, -2, 2, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(21)}
          >
            Magnetic
          </motion.button>
        </ButtonCard>

        {/* Button 22: Particle Burst */}
        <ButtonCard label="Explode">
          <motion.button
            className="relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg overflow-visible"
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(22)}
          >
            {clickedButtons[22] && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400 rounded-full"
                    initial={{ x: 0, y: 0, scale: 1 }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 8) * 50,
                      y: Math.sin((i * Math.PI * 2) / 8) * 50,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  />
                ))}
              </>
            )}
            Explode
          </motion.button>
        </ButtonCard>

        {/* Button 23: Split */}
        <ButtonCard label="Split">
          <motion.button
            className="relative px-8 py-4 bg-teal-600 text-white font-bold rounded-lg overflow-hidden"
            whileHover="hover"
            onClick={() => handleClick(23)}
          >
            <motion.div
              className="absolute inset-0 bg-teal-400"
              variants={{
                hover: {
                  clipPath: [
                    "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                  ],
                },
              }}
            />
            <motion.div
              className="absolute inset-0 bg-teal-800"
              variants={{
                hover: {
                  clipPath: [
                    "polygon(0 0, 0 0, 0 100%, 0 100%)",
                    "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                  ],
                },
              }}
            />
            <span className="relative z-10">Split</span>
          </motion.button>
        </ButtonCard>

        {/* Button 24: Liquid */}
        <ButtonCard label="Liquid Morph">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold"
            animate={{
              borderRadius: ["20px", "40px", "20px", "30px", "20px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(24)}
          >
            Liquid
          </motion.button>
        </ButtonCard>

        {/* Button 25: Neon Sign */}
        <ButtonCard label="Neon Sign">
          <motion.button
            className="px-8 py-4 bg-black text-pink-500 font-bold rounded-lg border-2 border-pink-500"
            animate={{
              boxShadow: [
                "0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899",
                "0 0 20px #ec4899, 0 0 30px #ec4899, 0 0 40px #ec4899",
                "0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899",
              ],
              textShadow: [
                "0 0 10px #ec4899, 0 0 20px #ec4899",
                "0 0 20px #ec4899, 0 0 30px #ec4899",
                "0 0 10px #ec4899, 0 0 20px #ec4899",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(25)}
          >
            Neon Sign
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Luxury & Premium">
        {/* Button 26: Chrome Metallic */}
        <ButtonCard label="Chrome Metallic">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-gray-900 font-bold rounded-lg relative overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(255,255,255,0.2), inset 0 2px 8px rgba(255,255,255,0.6)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 48px rgba(255,255,255,0.3), inset 0 2px 12px rgba(255,255,255,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(26)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Chrome</span>
          </motion.button>
        </ButtonCard>

        {/* Button 27: Gold Foil */}
        <ButtonCard label="Gold Foil">
          <motion.button
            className="px-8 py-4 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900 font-bold rounded-lg"
            style={{
              boxShadow: "0 4px 20px rgba(234, 179, 8, 0.5), inset 0 2px 4px rgba(255,255,255,0.5)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(234, 179, 8, 0.7), inset 0 2px 8px rgba(255,255,255,0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(27)}
          >
            Gold Foil
          </motion.button>
        </ButtonCard>

        {/* Button 28: Diamond Shine */}
        <ButtonCard label="Diamond Shine">
          <motion.button
            className="relative px-8 py-4 bg-gradient-to-br from-cyan-200 via-blue-200 to-purple-200 text-indigo-900 font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(28)}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 60%)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Diamond</span>
          </motion.button>
        </ButtonCard>

        {/* Button 29: Rose Gold */}
        <ButtonCard label="Rose Gold">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 text-rose-900 font-bold rounded-lg"
            style={{
              boxShadow: "0 4px 20px rgba(251, 113, 133, 0.4)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(251, 113, 133, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(29)}
          >
            Rose Gold
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Holographic & Iridescent">
        {/* Button 30: Holographic */}
        <ButtonCard label="Holographic">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 text-white font-bold rounded-lg"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(30)}
          >
            Holographic
          </motion.button>
        </ButtonCard>

        {/* Button 31: Aurora */}
        <ButtonCard label="Aurora">
          <motion.button
            className="relative px-8 py-4 bg-black text-white font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(31)}
          >
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: "linear-gradient(45deg, #00ff87, #60efff, #ff6b9d, #ffa87a)",
                backgroundSize: "400% 400%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10">Aurora</span>
          </motion.button>
        </ButtonCard>

        {/* Button 32: Prism */}
        <ButtonCard label="Prism">
          <motion.button
            className="relative px-8 py-4 bg-white text-gray-900 font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(32)}
          >
            <motion.div
              className="absolute inset-0 opacity-60"
              style={{
                background: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 mix-blend-difference text-white">Prism</span>
          </motion.button>
        </ButtonCard>

        {/* Button 33: Opal */}
        <ButtonCard label="Opal">
          <motion.button
            className="px-8 py-4 text-white font-bold rounded-lg relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #667eea 100%)",
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(33)}
          >
            Opal
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Minimal & Clean">
        {/* Button 34: Subtle Lift */}
        <ButtonCard label="Subtle Lift">
          <motion.button
            className="px-8 py-4 bg-gray-800 text-white font-bold rounded-lg"
            whileHover={{
              y: -4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
            whileTap={{ y: 0 }}
            onClick={() => handleClick(34)}
          >
            Subtle Lift
          </motion.button>
        </ButtonCard>

        {/* Button 35: Underline Grow */}
        <ButtonCard label="Underline Grow">
          <motion.button
            className="px-8 py-4 bg-transparent text-white font-bold relative"
            whileHover="hover"
            onClick={() => handleClick(35)}
          >
            <span>Underline</span>
            <motion.div
              className="absolute bottom-2 left-1/2 h-0.5 bg-orange-500"
              initial={{ width: 0, x: "-50%" }}
              variants={{
                hover: { width: "80%", x: "-50%" },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </ButtonCard>

        {/* Button 36: Ghost Border */}
        <ButtonCard label="Ghost Border">
          <motion.button
            className="px-8 py-4 bg-transparent text-gray-400 font-bold rounded-lg border border-gray-700"
            whileHover={{
              borderColor: "#f97316",
              color: "#f97316",
              boxShadow: "0 0 20px rgba(249, 115, 22, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(36)}
          >
            Ghost
          </motion.button>
        </ButtonCard>

        {/* Button 37: Fade In */}
        <ButtonCard label="Fade In BG">
          <motion.button
            className="relative px-8 py-4 text-white font-bold rounded-lg border border-purple-500 overflow-hidden"
            whileHover="hover"
            onClick={() => handleClick(37)}
          >
            <motion.div
              className="absolute inset-0 bg-purple-500"
              initial={{ opacity: 0 }}
              variants={{
                hover: { opacity: 1 },
              }}
            />
            <span className="relative z-10">Fade In</span>
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Geometric & Modern">
        {/* Button 38: Hexagon */}
        <ButtonCard label="Hexagon">
          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(38)}
          >
            Hexagon
          </motion.button>
        </ButtonCard>

        {/* Button 39: Skew */}
        <ButtonCard label="Skew Transform">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold"
            style={{ transform: "skew(-10deg)" }}
            whileHover={{
              transform: "skew(0deg)",
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(39)}
          >
            <span style={{ display: "inline-block", transform: "skew(10deg)" }}>Skew</span>
          </motion.button>
        </ButtonCard>

        {/* Button 40: Corner Cut */}
        <ButtonCard label="Corner Cut">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold"
            style={{
              clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(40)}
          >
            Cut Corner
          </motion.button>
        </ButtonCard>

        {/* Button 41: Diagonal Slice */}
        <ButtonCard label="Diagonal Slice">
          <motion.button
            className="relative px-8 py-4 bg-pink-600 text-white font-bold overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
            }}
            whileHover="hover"
            onClick={() => handleClick(41)}
          >
            <motion.div
              className="absolute inset-0 bg-pink-400"
              initial={{ x: "-100%" }}
              variants={{
                hover: { x: 0 },
              }}
            />
            <span className="relative z-10">Diagonal</span>
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Playful & Fun">
        {/* Button 42: Jelly */}
        <ButtonCard label="Jelly Bounce">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-full"
            whileHover={{
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, 5, -5, 3, 0],
            }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleClick(42)}
          >
            Jelly
          </motion.button>
        </ButtonCard>

        {/* Button 43: Bubble */}
        <ButtonCard label="Bubble Pop">
          <motion.button
            className="px-8 py-4 bg-gradient-to-br from-blue-400 to-cyan-300 text-white font-bold rounded-full"
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 40px rgba(34, 211, 238, 0.6)",
            }}
            whileTap={{
              scale: 0,
              transition: { duration: 0.2 },
            }}
            onClick={() => handleClick(43)}
          >
            Bubble
          </motion.button>
        </ButtonCard>

        {/* Button 44: Squeeze */}
        <ButtonCard label="Squeeze">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg"
            whileHover={{
              scaleX: 1.1,
              scaleY: 0.9,
            }}
            whileTap={{
              scaleX: 0.9,
              scaleY: 1.1,
            }}
            onClick={() => handleClick(44)}
          >
            Squeeze
          </motion.button>
        </ButtonCard>

        {/* Button 45: Wiggle */}
        <ButtonCard label="Wiggle">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg"
            whileHover={{
              rotate: [0, -5, 5, -5, 5, -3, 3, 0],
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(45)}
          >
            Wiggle
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Tech & Futuristic">
        {/* Button 46: Circuit Board */}
        <ButtonCard label="Circuit Board">
          <motion.button
            className="relative px-8 py-4 bg-gray-900 text-cyan-400 font-bold rounded-lg border border-cyan-500 overflow-hidden"
            whileHover="hover"
            onClick={() => handleClick(46)}
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, #06b6d4 0px, transparent 1px, transparent 10px), repeating-linear-gradient(0deg, #06b6d4 0px, transparent 1px, transparent 10px)",
              }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                x: ["-100%", "500%"],
                y: [0, 20, -20, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Circuit</span>
          </motion.button>
        </ButtonCard>

        {/* Button 47: Scan Line */}
        <ButtonCard label="Scan Line">
          <motion.button
            className="relative px-8 py-4 bg-black text-green-400 font-bold rounded-lg border border-green-500 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleClick(47)}
          >
            <motion.div
              className="absolute inset-x-0 h-px bg-green-400"
              animate={{ y: [0, 56, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">Scan</span>
          </motion.button>
        </ButtonCard>

        {/* Button 48: Data Stream */}
        <ButtonCard label="Data Stream">
          <motion.button
            className="relative px-8 py-4 bg-gray-900 text-blue-400 font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleClick(48)}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-4 bg-blue-400"
                animate={{
                  y: ["-100%", "300%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{ left: `${20 + i * 15}%` }}
              />
            ))}
            <span className="relative z-10">Data</span>
          </motion.button>
        </ButtonCard>

        {/* Button 49: Quantum */}
        <ButtonCard label="Quantum Flux">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg"
            animate={{
              boxShadow: [
                "0 0 20px rgba(124, 58, 237, 0.5), inset 0 0 20px rgba(124, 58, 237, 0.2)",
                "0 0 40px rgba(124, 58, 237, 0.8), inset 0 0 30px rgba(124, 58, 237, 0.4)",
                "0 0 20px rgba(124, 58, 237, 0.5), inset 0 0 20px rgba(124, 58, 237, 0.2)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(49)}
          >
            Quantum
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <ButtonGrid title="Elite & Exclusive">
        {/* Button 50: VIP */}
        <ButtonCard label="VIP Exclusive">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black font-bold rounded-lg relative overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(245, 158, 11, 0.5)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 48px rgba(245, 158, 11, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(50)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              ⭐ VIP
            </span>
          </motion.button>
        </ButtonCard>
      </ButtonGrid>

      <div className="text-center mt-20 pb-20">
        <p className="text-gray-500 text-lg">
          All buttons are interactive • Hover and click to see effects
        </p>
      </div>
    </div>
  )
}
