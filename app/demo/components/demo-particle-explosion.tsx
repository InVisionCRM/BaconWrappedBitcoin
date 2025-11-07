"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"

interface Particle {
  id: number
  x: number
  y: number
  angle: number
  velocity: number
  color: string
  size: number
  type?: string
}

const particleEffects = [
  {
    id: 1,
    name: "Classic Explosion",
    description: "Radial particle burst from click point",
    prompt: "Create a particle explosion effect on click. Generate 30 particles in a perfect circle (360/30 degrees apart). Each particle should have: random velocity (2-6 units), random size (4-12px), random color from palette, and animate outward 200px over 2s with easeOut, fading opacity to 0. Use framer-motion for smooth animation.",
    particleCount: 30,
    colors: ["#ff6b35", "#f7931e", "#ff4757", "#ffa502", "#ff6348"],
    bgGradient: "from-purple-900 via-indigo-900 to-black"
  },
  {
    id: 2,
    name: "Firework Burst",
    description: "Explosive firework with gravity",
    prompt: "Create firework effect with 50 particles. Each particle gets random angle (0-360deg) and velocity (3-8 units). Particles should travel outward 250px with gravity effect (+100px Y). Use cubic-bezier easing [0.25, 0.1, 0.25, 1] for realistic physics. Duration 3s with color glow (boxShadow: 0 0 30px {color}).",
    particleCount: 50,
    colors: ["#ff0080", "#00ff80", "#0080ff", "#ffff00", "#ff00ff"],
    bgGradient: "from-black via-blue-950 to-purple-950"
  },
  {
    id: 3,
    name: "Spiral Vortex",
    description: "Particles spiral outward in helix pattern",
    prompt: "Create spiral effect with 40 particles. Calculate angle using: (i/40) * PI * 6 for spiral pattern. Velocity increases linearly: i * 0.1 + 1. Use HSL colors: hsl({i * 9}, 80%, 60%) for rainbow effect. Animate 200px outward over 2.5s with rotation: 720deg. Add boxShadow glow.",
    particleCount: 40,
    colors: [], // Uses HSL
    bgGradient: "from-green-950 via-teal-950 to-black"
  },
  {
    id: 4,
    name: "Image Particles",
    description: "Explode with image fragments",
    prompt: "Create image particle burst with 20 particles using actual images (/bacon-ring.png, /Bitcoin-Logo.png). Each particle: size 30-50px, random angle (360/20 degrees), velocity 2-5, travels 180px outward. Animate with rotation: 360deg over 2s. Use Image component with fill and object-contain.",
    particleCount: 20,
    colors: [],
    bgGradient: "from-orange-950 via-red-950 to-black",
    useImages: true
  },
  {
    id: 5,
    name: "Gravity Fountain",
    description: "Upward burst with gravity fallback",
    prompt: "Create fountain effect with 35 particles shooting upward. Constrain angle: Math.random() * PI - PI/2 (upward hemisphere). Velocity 3-7 units. Particles travel 150px outward + 400px downward (gravity). Use cubic-bezier [0.25, 0.46, 0.45, 0.94] for realistic arc. Duration 3s. Colors: HSL(30-90, 100%, 60%).",
    particleCount: 35,
    colors: [],
    bgGradient: "from-yellow-950 via-amber-950 to-black"
  },
  {
    id: 6,
    name: "Ring Pulse",
    description: "Expanding concentric rings",
    prompt: "Create expanding ring effect. Spawn 5 rings at click point, each ring has 12 particles. Ring radius: i * 80px. Particles are evenly spaced around circle: (360/12) degrees. Animate scale from 1 to 3 over 1.5s with stagger delay: i * 0.2s. Opacity fades to 0.",
    particleCount: 60,
    colors: ["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e"],
    bgGradient: "from-indigo-950 via-purple-900 to-pink-950"
  },
  {
    id: 7,
    name: "DNA Helix",
    description: "Double helix spiral pattern",
    prompt: "Create DNA helix with 40 particles in two strands. Strand A: particles spiral with angle (i * 18deg), radius 100px. Strand B: offset 180deg. Particles travel vertically (Y: ±200px) while spiraling outward. Duration 2s. Alternate colors: #3b82f6 and #ec4899. Add rotation for helix twist.",
    particleCount: 40,
    colors: ["#3b82f6", "#ec4899"],
    bgGradient: "from-blue-950 via-violet-900 to-purple-950"
  },
  {
    id: 8,
    name: "Star Burst",
    description: "5-pointed star explosion pattern",
    prompt: "Create star burst with particles along 5 rays. Each ray has 8 particles. Ray angles: 0, 72, 144, 216, 288 degrees (360/5). Particles travel outward 50-300px based on position in ray. Velocity increases with distance. Duration 1.5s. Use spring animation (stiffness: 150, damping: 20).",
    particleCount: 40,
    colors: ["#fbbf24", "#f59e0b", "#f97316", "#fb923c"],
    bgGradient: "from-yellow-900 via-orange-950 to-red-950"
  },
  {
    id: 9,
    name: "Confetti Rain",
    description: "Rectangular confetti pieces falling",
    prompt: "Create confetti effect with 50 rectangular particles. Initial velocity upward: Y: -100 to -300. Horizontal spread: X: -200 to 200. Gravity pulls down: +500px over 3s. Add rotation: random 0-720deg. Use rectangle shapes (width: 10-20px, height: 4-8px). Colors: vibrant rainbow.",
    particleCount: 50,
    colors: ["#ff0080", "#00ff80", "#0080ff", "#ffff00", "#ff00ff", "#00ffff"],
    bgGradient: "from-pink-950 via-purple-900 to-indigo-950"
  },
  {
    id: 10,
    name: "Smoke Wisp",
    description: "Organic smoke-like particles",
    prompt: "Create smoke effect with 25 particles. Particles drift upward (Y: -200px) with random horizontal sway (X: ±100px). Use large sizes (20-40px) with blur filter. Opacity 0.3-0.7 fading to 0. Scale grows: 1 to 2. Duration 3s. Colors: grayscale (#666, #888, #aaa). Add perlin noise for organic movement.",
    particleCount: 25,
    colors: ["#666666", "#888888", "#aaaaaa", "#cccccc"],
    bgGradient: "from-gray-900 via-slate-800 to-black"
  },
  {
    id: 11,
    name: "Magnetic Attraction",
    description: "Particles orbit click point before exploding",
    prompt: "Create magnetic effect with 30 particles. Initial phase: particles spiral inward to click point over 0.5s (radius: 300 to 50px). Second phase: explosion outward at random angles, velocity 4-7 units. Combine rotation during orbit (0 to 360deg). Duration: 2.5s total. Use spring animation for natural feel.",
    particleCount: 30,
    colors: ["#ec4899", "#f97316", "#8b5cf6", "#06b6d4"],
    bgGradient: "from-violet-950 via-fuchsia-900 to-pink-950"
  },
  {
    id: 12,
    name: "Lightning Bolt",
    description: "Jagged electric discharge pattern",
    prompt: "Create lightning effect with 40 particles forming branching paths. Main bolt: 10 particles vertical (Y: 0 to -300px). Branch bolts: offset X by ±50-150px at random Y intervals. Use white/cyan colors with intense glow (boxShadow: 0 0 40px). Animate in sequence with 0.02s delays. Duration: 1s. Add flicker effect.",
    particleCount: 40,
    colors: ["#ffffff", "#00ffff", "#a0e7ff", "#e0f7ff"],
    bgGradient: "from-black via-blue-950 to-cyan-950"
  },
  {
    id: 13,
    name: "Heart Burst",
    description: "Particles form heart shape before exploding",
    prompt: "Create heart burst with 50 particles. Use parametric heart equation: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t). Position particles along curve. Animate outward from heart shape maintaining direction. Scale from 0.5 to 1.5. Duration: 2s. Colors: pink/red gradient.",
    particleCount: 50,
    colors: ["#ff0080", "#ff1a8c", "#ff3399", "#ff4da6"],
    bgGradient: "from-rose-950 via-pink-900 to-red-950"
  },
  {
    id: 14,
    name: "Shockwave Ripple",
    description: "Expanding wave with trailing particles",
    prompt: "Create shockwave with 3 expanding rings. Each ring: 20 particles, radius grows 0 to 400px. Stagger ring spawns by 0.3s. Particles fade as ring expands (opacity: 1→0). Add trailing smaller particles (blur effect). Duration: 2s per ring. Use easeOut for deceleration. Colors: cyan to white gradient.",
    particleCount: 60,
    colors: ["#06b6d4", "#22d3ee", "#67e8f9", "#ffffff"],
    bgGradient: "from-cyan-950 via-teal-900 to-blue-950"
  },
  {
    id: 15,
    name: "Pixel Dispersion",
    description: "Particles scatter in grid pattern with glitch effect",
    prompt: "Create pixel glitch effect with 49 particles (7x7 grid). Each particle starts at grid position (index%7 * 40, floor(index/7) * 40). On click: particles scatter with random X/Y offset (±200px) and random rotation (0-360deg). Add RGB color shift glitch. Scale varies 0.5-1.5. Duration: 2s with elastic easing. Use square particles (border-radius: 0).",
    particleCount: 49,
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
    bgGradient: "from-black via-gray-900 to-slate-950"
  }
]

export default function DemoParticleExplosionCollection() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [currentEffect, setCurrentEffect] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)

  const effect = particleEffects[currentEffect]

  const copyPrompt = (prompt: string, id: number) => {
    navigator.clipboard.writeText(prompt)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const createExplosion = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newParticles: Particle[] = []
    const count = effect.particleCount

    for (let i = 0; i < count; i++) {
      const angle = effect.id === 1
        ? (Math.PI * 2 * i) / count
        : effect.id === 3
        ? (i / count) * Math.PI * 6
        : Math.random() * Math.PI * 2

      const velocity = effect.id === 3
        ? i * 0.1 + 1
        : 2 + Math.random() * 4

      const color = effect.colors.length > 0
        ? effect.colors[Math.floor(Math.random() * effect.colors.length)]
        : `hsl(${i * 9}, 80%, 60%)`

      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        angle,
        velocity,
        color,
        size: 4 + Math.random() * 8,
        type: effect.useImages ? ["/bacon-ring.png", "/Bitcoin-Logo.png"][Math.floor(Math.random() * 2)] : undefined
      })
    }

    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 3000)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Particle Explosion Effects
          </h1>
          <p className="text-xl text-gray-400 mb-2">15 Interactive Click Effects with AI Implementation Prompts</p>
          <p className="text-sm text-gray-500">Click inside the demo area to trigger particles</p>
        </div>

        {/* Main Demo */}
        <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-pink-500 font-bold text-2xl">#{effect.id}</span>
                <h2 className="text-3xl font-bold text-white">{effect.name}</h2>
              </div>
              <p className="text-gray-400 text-lg">{effect.description}</p>
            </div>
            <motion.button
              onClick={() => copyPrompt(effect.prompt, effect.id)}
              className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/40 text-pink-400 rounded-lg font-medium transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copiedId === effect.id ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy AI Prompt
                </>
              )}
            </motion.button>
          </div>

          <div
            ref={containerRef}
            onClick={createExplosion}
            className={`relative w-full h-96 rounded-xl overflow-hidden cursor-crosshair bg-gradient-to-br ${effect.bgGradient}`}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-white/50 text-xl">Click anywhere to create {effect.name.toLowerCase()}</p>
            </div>
            {particles.map((particle) => (
              particle.type ? (
                <motion.div
                  key={particle.id}
                  initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1, rotate: 0 }}
                  animate={{
                    x: particle.x + Math.cos(particle.angle) * 180 * particle.velocity,
                    y: particle.y + Math.sin(particle.angle) * 180 * particle.velocity,
                    opacity: 0,
                    scale: 0,
                    rotate: 360
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute pointer-events-none"
                  style={{ width: particle.size, height: particle.size }}
                >
                  <Image src={particle.type} alt="" fill className="object-contain" />
                </motion.div>
              ) : (
                <motion.div
                  key={particle.id}
                  initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
                  animate={{
                    x: particle.x + Math.cos(particle.angle) * 200 * particle.velocity,
                    y: particle.y + Math.sin(particle.angle) * 200 * particle.velocity,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    backgroundColor: particle.color,
                    width: particle.size,
                    height: particle.size,
                    boxShadow: `0 0 20px ${particle.color}`
                  }}
                />
              )
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={() => setCurrentEffect((prev) => (prev - 1 + particleEffects.length) % particleEffects.length)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Previous
            </motion.button>
            <motion.button
              onClick={() => setCurrentEffect((prev) => (prev + 1) % particleEffects.length)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          </div>
        </div>

        {/* All Effects Grid */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">All Particle Effects</h2>
        <div className="grid grid-cols-2 gap-6 min-w-0">
          {particleEffects.map((eff) => (
            <motion.div
              key={eff.id}
              className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 cursor-pointer hover:border-pink-500/50 transition-colors"
              onClick={() => {
                setCurrentEffect(eff.id - 1)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-pink-500 font-bold">#{eff.id}</span>
                    <h3 className="text-lg font-bold text-white">{eff.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{eff.description}</p>
                </div>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    copyPrompt(eff.prompt, eff.id)
                  }}
                  className="p-2 bg-pink-500/20 hover:bg-pink-500/40 text-pink-400 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
