"use client"

import { useState } from "react"
import { motion } from "motion/react"

const morphingEffects = [
  {
    id: 1,
    name: "Circle to Square",
    description: "Smooth morph from circle to square",
    prompt: "Create an SVG path morphing animation that transitions from a circle path to a square path. Use framer-motion's animate prop to morph the 'd' attribute of the path. Duration should be 0.8s with spring animation (stiffness: 100, damping: 20).",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M10,10 L90,10 L90,90 L10,90 Z"
    },
    color: { from: "#ff6b35", to: "#f7931e" }
  },
  {
    id: 2,
    name: "Star Explosion",
    description: "Star morphs into explosion pattern",
    prompt: "Animate an SVG star path to morph into a multi-pointed explosion shape. Increase the number of points and spike depth on hover. Use path morphing with 0.6s duration and ease-out timing.",
    paths: {
      start: "M50,10 L61,35 L90,35 L67,52 L78,78 L50,61 L22,78 L33,52 L10,35 L39,35 Z",
      end: "M50,5 L58,25 L80,20 L65,35 L75,55 L50,45 L25,55 L35,35 L20,20 L42,25 Z"
    },
    color: { from: "#a855f7", to: "#ec4899" }
  },
  {
    id: 3,
    name: "Heart Pulse",
    description: "Beating heart animation",
    prompt: "Create a pulsing heart effect by morphing between two heart path variations with different scales. Combine with scale animation from 1 to 1.2 and back. Loop infinitely with 1s duration.",
    paths: {
      start: "M50,85 C50,85 20,60 20,40 C20,25 27,15 37,15 C45,15 50,22 50,22 C50,22 55,15 63,15 C73,15 80,25 80,40 C80,60 50,85 50,85 Z",
      end: "M50,80 C50,80 25,58 25,42 C25,28 30,18 40,18 C47,18 50,24 50,24 C50,24 53,18 60,18 C70,18 75,28 75,42 C75,58 50,80 50,80 Z"
    },
    color: { from: "#ef4444", to: "#dc2626" }
  },
  {
    id: 4,
    name: "Triangle to Hexagon",
    description: "Triangle transforms to hexagon",
    prompt: "Morph a triangle SVG path into a hexagon by adding additional vertices. Ensure smooth transition by matching vertex count using intermediate points. Animate over 0.7s with ease-in-out.",
    paths: {
      start: "M50,10 L90,90 L10,90 Z",
      end: "M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z"
    },
    color: { from: "#06b6d4", to: "#3b82f6" }
  },
  {
    id: 5,
    name: "Bitcoin Symbol",
    description: "B morphs to Bitcoin symbol",
    prompt: "Create a morphing animation from the letter 'B' to the Bitcoin symbol (₿). Use SVG path for both shapes and animate the 'd' attribute. Duration 0.8s with smooth easing.",
    paths: {
      start: "M30,20 L30,80 L50,80 C65,80 75,70 75,55 C75,47 70,40 63,37 C68,34 72,28 72,20 C72,10 65,5 50,5 L30,20",
      end: "M35,15 L35,85 M50,15 L50,85 M30,30 L60,30 C70,30 75,35 75,42 C75,49 70,54 60,54 L30,54 M30,54 L62,54 C72,54 77,59 77,66 C77,73 72,78 62,78 L30,78"
    },
    color: { from: "#f59e0b", to: "#d97706" }
  },
  {
    id: 6,
    name: "Infinity Loop",
    description: "Circle morphs to infinity symbol",
    prompt: "Transform a circle into an infinity symbol (∞). Create smooth figure-8 path and animate from circular to infinity shape. Use 0.9s duration with spring animation for organic feel.",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M25,50 C25,30 35,20 50,20 C65,20 75,30 75,50 C75,70 65,80 50,80 C35,80 25,70 25,50 M50,20 C65,20 75,30 75,50 C75,70 65,80 50,80 C35,80 25,70 25,50"
    },
    color: { from: "#10b981", to: "#059669" }
  },
  {
    id: 7,
    name: "Spiral Formation",
    description: "Shape spirals inward/outward",
    prompt: "Create a spiral morphing effect using Archimedean spiral equations. Start with outer spiral and morph to tight inner spiral. Combine with rotation animation for enhanced effect. Duration 1.2s.",
    paths: {
      start: "M50,50 Q70,30 90,50 T50,90 T10,50 T50,10 T90,50",
      end: "M50,50 Q60,40 70,50 T50,70 T30,50 T50,30 T70,50"
    },
    color: { from: "#8b5cf6", to: "#7c3aed" }
  },
  {
    id: 8,
    name: "Lightning Bolt",
    description: "Straight line to lightning bolt",
    prompt: "Morph a straight vertical line into a lightning bolt with sharp zigzag pattern. Add glow filter for electric effect. Animate with 0.5s duration and ease-out.",
    paths: {
      start: "M50,10 L50,90",
      end: "M50,10 L60,35 L45,35 L55,60 L40,60 L50,90"
    },
    color: { from: "#fbbf24", to: "#f59e0b" }
  },
  {
    id: 9,
    name: "Blob Morph",
    description: "Organic blob transformation",
    prompt: "Create organic blob shapes using Bezier curves and morph between different blob configurations. Use smooth cubic Bezier paths for natural, fluid movement. Duration 1s with ease-in-out.",
    paths: {
      start: "M50,20 Q70,30 80,50 Q70,70 50,80 Q30,70 20,50 Q30,30 50,20 Z",
      end: "M50,15 Q75,25 85,50 Q75,75 50,85 Q25,75 15,50 Q25,25 50,15 Z"
    },
    color: { from: "#ec4899", to: "#db2777" }
  },
  {
    id: 10,
    name: "Gear Rotation",
    description: "Circle to gear teeth",
    prompt: "Transform a circle into a gear with teeth. Create notched edges at regular intervals around the circumference. Combine morph with rotation animation for mechanical effect.",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M50,10 L55,10 L55,15 L50,15 M60,12 L65,12 L65,17 L60,17 M68,18 L73,18 L73,23 L68,23"
    },
    color: { from: "#6366f1", to: "#4f46e5" }
  },
  {
    id: 11,
    name: "Diamond Facets",
    description: "Square to diamond with facets",
    prompt: "Morph a square into a multi-faceted diamond shape by adding internal lines creating gem-like appearance. Animate path complexity increasing over time. Duration 0.8s.",
    paths: {
      start: "M10,10 L90,10 L90,90 L10,90 Z",
      end: "M50,10 L90,50 L50,90 L10,50 Z M50,10 L50,50 M50,50 L90,50 M50,50 L50,90 M50,50 L10,50"
    },
    color: { from: "#06b6d4", to: "#0891b2" }
  },
  {
    id: 12,
    name: "Flower Bloom",
    description: "Circle blooms into flower petals",
    prompt: "Animate a circle morphing into a flower with multiple petals. Use petal shapes arranged in circular pattern. Combine with scale and opacity for blooming effect. Duration 1s.",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M50,10 Q40,30 50,40 Q60,30 50,10 M50,40 Q35,45 40,55 Q45,45 50,40 M40,55 Q30,60 35,70 Q40,60 40,55"
    },
    color: { from: "#f472b6", to: "#ec4899" }
  },
  {
    id: 13,
    name: "Arrow Dynamics",
    description: "Line to arrow to double arrow",
    prompt: "Morph a horizontal line into an arrow, then into a double-headed arrow. Add arrowhead triangles smoothly at ends. Animate over 1.2s with staged transitions.",
    paths: {
      start: "M10,50 L90,50",
      end: "M10,50 L90,50 L80,45 M90,50 L80,55"
    },
    color: { from: "#14b8a6", to: "#0d9488" }
  },
  {
    id: 14,
    name: "Polygon Evolution",
    description: "Triangle → Square → Pentagon → Hexagon",
    prompt: "Create a sequence morphing through polygons with increasing sides: triangle to square to pentagon to hexagon. Each transition 0.6s. Use vertex interpolation for smooth morphing.",
    paths: {
      start: "M50,10 L90,90 L10,90 Z",
      end: "M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z"
    },
    color: { from: "#a78bfa", to: "#8b5cf6" }
  },
  {
    id: 15,
    name: "Wave to Particle",
    description: "Sine wave to particle burst",
    prompt: "Transform a smooth sine wave into discrete particles/dots. Morph continuous path into segmented circular points. Duration 0.7s with stagger effect on particles.",
    paths: {
      start: "M10,50 Q30,30 50,50 T90,50",
      end: "M20,50 A5,5 0 1,1 20,50 M40,45 A5,5 0 1,1 40,45 M60,50 A5,5 0 1,1 60,50 M80,45 A5,5 0 1,1 80,45"
    },
    color: { from: "#22d3ee", to: "#06b6d4" }
  },
  {
    id: 16,
    name: "Pie Chart Segments",
    description: "Circle splits into pie segments",
    prompt: "Morph a full circle into multiple pie chart segments. Create paths for each segment and animate from unified to separated with gaps. Duration 0.8s with spring.",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M50,50 L50,10 A40,40 0 0,1 85,35 Z M50,50 L85,35 A40,40 0 0,1 85,65 Z M50,50 L85,65 A40,40 0 0,1 50,90 Z"
    },
    color: { from: "#f97316", to: "#ea580c" }
  },
  {
    id: 17,
    name: "DNA Helix",
    description: "Line to DNA double helix",
    prompt: "Transform a straight line into DNA double helix structure. Create intertwining helical paths with connecting base pairs. Animate with 1.2s duration and continuous rotation.",
    paths: {
      start: "M30,10 L30,90 M70,10 L70,90",
      end: "M30,10 Q50,30 70,50 Q50,70 30,90 M70,10 Q50,30 30,50 Q50,70 70,90 M30,30 L70,30 M30,50 L70,50 M30,70 L70,70"
    },
    color: { from: "#3b82f6", to: "#2563eb" }
  },
  {
    id: 18,
    name: "Portal Vortex",
    description: "Circle to swirling vortex",
    prompt: "Morph a circle into a swirling vortex/portal effect. Create spiral inward path with increasing curvature. Add rotation animation for vortex spinning. Duration 1s.",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M50,50 Q70,30 80,50 Q60,70 50,50 Q40,30 20,50 Q40,70 50,50"
    },
    color: { from: "#8b5cf6", to: "#6d28d9" }
  },
  {
    id: 19,
    name: "Crystal Formation",
    description: "Amorphous to crystalline structure",
    prompt: "Transform an organic blob into geometric crystal structure with sharp facets. Morph from curved paths to angular polygonal shapes. Duration 0.9s with ease-in-out.",
    paths: {
      start: "M50,20 Q70,30 80,50 Q70,70 50,80 Q30,70 20,50 Q30,30 50,20 Z",
      end: "M50,15 L75,35 L85,60 L65,85 L35,85 L15,60 L25,35 Z M50,15 L50,50 M75,35 L50,50 M85,60 L50,50 M65,85 L50,50 M35,85 L50,50 M15,60 L50,50 M25,35 L50,50"
    },
    color: { from: "#a855f7", to: "#9333ea" }
  },
  {
    id: 20,
    name: "Soundwave Pulse",
    description: "Flat line to audio waveform",
    prompt: "Animate a flat line morphing into audio waveform with varying amplitudes. Create multiple peaks and valleys. Add pulsing animation for live audio effect. Duration 0.6s.",
    paths: {
      start: "M10,50 L90,50",
      end: "M10,50 L20,40 L30,60 L40,35 L50,65 L60,45 L70,55 L80,50 L90,50"
    },
    color: { from: "#10b981", to: "#059669" }
  },
  {
    id: 21,
    name: "Snowflake",
    description: "Hexagon to detailed snowflake",
    prompt: "Morph a simple hexagon into intricate snowflake pattern with fractal-like branches. Add fine details gradually. Combine with rotation for floating effect. Duration 1s.",
    paths: {
      start: "M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z",
      end: "M50,10 L85,30 L85,70 L50,90 L15,70 L15,30 Z M50,10 L50,30 M85,30 L75,40 M85,70 L75,60 M50,90 L50,70 M15,70 L25,60 M15,30 L25,40"
    },
    color: { from: "#60a5fa", to: "#3b82f6" }
  },
  {
    id: 22,
    name: "Maze Path",
    description: "Line to complex maze pattern",
    prompt: "Transform a simple line into a complex maze-like path structure. Add right-angle turns and branching paths. Animate path tracing effect. Duration 1.5s.",
    paths: {
      start: "M10,50 L90,50",
      end: "M10,50 L30,50 L30,30 L50,30 L50,70 L70,70 L70,30 L90,30"
    },
    color: { from: "#f59e0b", to: "#d97706" }
  },
  {
    id: 23,
    name: "Butterfly Wings",
    description: "Oval to butterfly wings",
    prompt: "Morph an oval shape into butterfly wings with symmetrical patterns. Create wing details and antenna. Add fluttering animation with scale pulse. Duration 0.8s.",
    paths: {
      start: "M50,30 A30,20 0 1,1 50,70 A30,20 0 1,1 50,30",
      end: "M50,40 Q30,30 20,50 Q30,70 50,60 Q70,70 80,50 Q70,30 50,40 M50,30 L45,20 M50,30 L55,20"
    },
    color: { from: "#ec4899", to: "#db2777" }
  },
  {
    id: 24,
    name: "Shield to Sword",
    description: "Shield shape morphs to sword",
    prompt: "Transform a shield shape into a sword silhouette. Transition from defensive to offensive form. Morph curved shield edges to straight blade. Duration 0.7s.",
    paths: {
      start: "M50,10 Q70,30 70,50 Q70,70 50,90 Q30,70 30,50 Q30,30 50,10 Z",
      end: "M48,10 L52,10 L52,70 L60,70 L50,90 L40,70 L48,70 Z"
    },
    color: { from: "#64748b", to: "#475569" }
  },
  {
    id: 25,
    name: "Ripple Rings",
    description: "Single circle to concentric ripples",
    prompt: "Animate a single circle expanding into multiple concentric ripple rings. Each ring scales outward with fading opacity. Create 5 rings with staggered animation. Duration 1.2s.",
    paths: {
      start: "M50,30 A20,20 0 1,1 50,70 A20,20 0 1,1 50,30",
      end: "M50,20 A30,30 0 1,1 50,80 A30,30 0 1,1 50,20 M50,15 A35,35 0 1,1 50,85 A35,35 0 1,1 50,15"
    },
    color: { from: "#06b6d4", to: "#0891b2" }
  },
  {
    id: 26,
    name: "Origami Fold",
    description: "Flat shape to 3D origami",
    prompt: "Create the illusion of paper folding from 2D to 3D origami. Use perspective transforms and path morphing to show folds and creases. Duration 1s with ease-out.",
    paths: {
      start: "M10,10 L90,10 L90,90 L10,90 Z",
      end: "M10,10 L50,30 L90,10 L70,50 L90,90 L50,70 L10,90 L30,50 Z"
    },
    color: { from: "#f472b6", to: "#ec4899" }
  },
  {
    id: 27,
    name: "Clock Hands",
    description: "Circle to clock with moving hands",
    prompt: "Transform circle into clock face with hour markers and rotating hands. Morph to show clock structure then animate hands. Duration 0.9s plus continuous rotation.",
    paths: {
      start: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10",
      end: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 M50,50 L50,20 M50,50 L70,50"
    },
    color: { from: "#64748b", to: "#475569" }
  },
  {
    id: 28,
    name: "Atomic Orbit",
    description: "Nucleus with electron orbits",
    prompt: "Create atom visualization with nucleus and electron orbital paths. Morph from simple dot to nucleus with elliptical orbits. Add electron dots moving along orbits. Duration 1s.",
    paths: {
      start: "M50,50 A3,3 0 1,1 50,50",
      end: "M50,50 A3,3 0 1,1 50,50 M50,30 A20,20 0 1,1 50,70 A20,20 0 1,1 50,30 M30,50 A20,10 0 1,1 70,50 A20,10 0 1,1 30,50"
    },
    color: { from: "#3b82f6", to: "#1d4ed8" }
  }
]

export default function DemoMorphingShapes() {
  const [currentEffect, setCurrentEffect] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMorphed, setIsMorphed] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const currentShape = morphingEffects[currentEffect]

  const nextEffect = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsMorphed(false)
    setCurrentEffect((prev) => (prev + 1) % morphingEffects.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const previousEffect = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsMorphed(false)
    setCurrentEffect((prev) => (prev - 1 + morphingEffects.length) % morphingEffects.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const toggleMorph = () => {
    if (!isAnimating) {
      setIsMorphed(!isMorphed)
    }
  }

  const copyPrompt = (prompt: string, id: number) => {
    navigator.clipboard.writeText(prompt)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Morphing Shape Effects
          </h1>
          <p className="text-xl text-gray-400 mb-2">28 SVG Morphing Animations with AI Implementation Prompts</p>
          <p className="text-sm text-gray-500">Click the shape to morph, or browse all effects below</p>
        </div>

        {/* Main Preview */}
        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-orange-500 font-bold text-2xl">#{currentShape.id}</span>
                <h2 className="text-3xl font-bold text-white">{currentShape.name}</h2>
              </div>
              <p className="text-gray-400 text-lg">{currentShape.description}</p>
            </div>
            <motion.button
              type="button"
              onClick={() => copyPrompt(currentShape.prompt, currentShape.id)}
              className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 rounded-lg font-medium transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copiedId === currentShape.id ? (
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

          <div className="relative w-full max-w-md mx-auto aspect-square mb-8 cursor-pointer" onClick={toggleMorph}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id={`gradient-${currentEffect}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <motion.stop
                    offset="0%"
                    animate={{ stopColor: currentShape.color.from }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.stop
                    offset="100%"
                    animate={{ stopColor: currentShape.color.to }}
                    transition={{ duration: 0.6 }}
                  />
                </linearGradient>
                <filter id="morphGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d={isMorphed ? currentShape.paths.end : currentShape.paths.start}
                fill={`url(#gradient-${currentEffect})`}
                filter="url(#morphGlow)"
                strokeWidth="2"
                stroke={currentShape.color.from}
                initial={false}
                animate={{ d: isMorphed ? currentShape.paths.end : currentShape.paths.start }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              />
            </svg>

            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-orange-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <motion.button
              type="button"
              onClick={previousEffect}
              disabled={isAnimating}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Previous
            </motion.button>
            <motion.button
              type="button"
              onClick={toggleMorph}
              disabled={isAnimating}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMorphed ? "Reset" : "Morph Shape"}
            </motion.button>
            <motion.button
              type="button"
              onClick={nextEffect}
              disabled={isAnimating}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          </div>

          <div className="flex gap-2 mt-6 justify-center flex-wrap">
            {morphingEffects.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setIsMorphed(false)
                    setCurrentEffect(index)
                    setTimeout(() => setIsAnimating(false), 800)
                  }
                }}
                aria-label={`Go to effect ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentEffect
                    ? "bg-orange-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Effects Grid */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">All Morphing Effects</h2>
        <div className="grid grid-cols-3 gap-6 min-w-0">
          {morphingEffects.map((effect) => (
            <motion.div
              key={effect.id}
              className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 cursor-pointer hover:border-orange-500/50 transition-colors"
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setIsMorphed(false)
                  setCurrentEffect(effect.id - 1)
                  setTimeout(() => setIsAnimating(false), 800)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-500 font-bold">#{effect.id}</span>
                    <h3 className="text-lg font-bold text-white">{effect.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{effect.description}</p>
                </div>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyPrompt(effect.prompt, effect.id)
                  }}
                  aria-label="Copy prompt"
                  className="p-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </motion.button>
              </div>
              <div className="w-full aspect-square bg-gray-900 rounded-lg p-4">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id={`mini-gradient-${effect.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={effect.color.from} />
                      <stop offset="100%" stopColor={effect.color.to} />
                    </linearGradient>
                  </defs>
                  <path
                    d={effect.paths.start}
                    fill={`url(#mini-gradient-${effect.id})`}
                    strokeWidth="1"
                    stroke={effect.color.from}
                    opacity="0.8"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
