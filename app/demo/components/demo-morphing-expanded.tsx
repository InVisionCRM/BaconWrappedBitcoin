"use client"

import { useState } from "react"
import { motion } from "motion/react"

function Separator({ number, title }: { number: number; title: string }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="h-px w-32 bg-gradient-to-r from-transparent to-purple-500" />
        <span className="text-purple-500 font-bold text-xl">#{number} {title}</span>
        <div className="h-px w-32 bg-gradient-to-l from-transparent to-purple-500" />
      </div>
    </div>
  )
}

const shapes = [
  { name: "Circle", path: "M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10" },
  { name: "Square", path: "M10,10 L90,10 L90,90 L10,90 Z" },
  { name: "Triangle", path: "M50,10 L90,90 L10,90 Z" },
  { name: "Star", path: "M50,10 L61,35 L90,35 L67,52 L78,78 L50,61 L22,78 L33,52 L10,35 L39,35 Z" },
  { name: "Heart", path: "M50,85 C50,85 20,60 20,40 C20,25 27,15 37,15 C45,15 50,22 50,22 C50,22 55,15 63,15 C73,15 80,25 80,40 C80,60 50,85 50,85 Z" },
  { name: "Bitcoin", path: "M30,20 L30,80 L50,80 C65,80 75,70 75,55 C75,47 70,40 63,37 C68,34 72,28 72,20 C72,10 65,5 50,5 L30,20 M40,20 L50,20 C58,20 62,24 62,30 C62,36 58,40 50,40 L40,40 M40,50 L52,50 C60,50 65,54 65,60 C65,66 60,70 52,70 L40,70" },
  { name: "Hexagon", path: "M50,5 L90,27.5 L90,72.5 L50,95 L10,72.5 L10,27.5 Z" },
  { name: "Diamond", path: "M50,10 L80,50 L50,90 L20,50 Z" },
  { name: "Pentagon", path: "M50,10 L90,40 L75,85 L25,85 L10,40 Z" },
  { name: "Cross", path: "M35,10 L65,10 L65,35 L90,35 L90,65 L65,65 L65,90 L35,90 L35,65 L10,65 L10,35 L35,35 Z" }
]

const colors = [
  { from: "#ff6b35", to: "#f7931e" },
  { from: "#a855f7", to: "#ec4899" },
  { from: "#06b6d4", to: "#3b82f6" },
  { from: "#10b981", to: "#059669" },
  { from: "#ef4444", to: "#dc2626" },
  { from: "#f59e0b", to: "#d97706" },
  { from: "#8b5cf6", to: "#6366f1" },
  { from: "#ec4899", to: "#f43f5e" },
  { from: "#14b8a6", to: "#0d9488" },
  { from: "#f97316", to: "#ea580c" }
]

// Morph 1: Basic Shape Morphing
function MorphEffect1() {
  const [currentShape, setCurrentShape] = useState(0)
  const color = colors[currentShape % colors.length]

  return (
    <div className="h-screen bg-gradient-to-br from-purple-950 to-black flex flex-col items-center justify-center gap-8">
      <div className="w-96 h-96">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: color.from }} transition={{ duration: 0.6 }} />
              <motion.stop offset="100%" animate={{ stopColor: color.to }} transition={{ duration: 0.6 }} />
            </linearGradient>
          </defs>
          <motion.path
            d={shapes[currentShape].path}
            fill="url(#grad1)"
            initial={false}
            animate={{ d: shapes[currentShape].path }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          />
        </svg>
      </div>
      <p className="text-3xl text-white font-bold">{shapes[currentShape].name}</p>
      <button
        onClick={() => setCurrentShape((currentShape + 1) % shapes.length)}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Morph Shape
      </button>
    </div>
  )
}

// Morph 2: Rotating Morph
function MorphEffect2() {
  const [currentShape, setCurrentShape] = useState(0)
  const [rotation, setRotation] = useState(0)
  const color = colors[currentShape % colors.length]

  const handleMorph = () => {
    setCurrentShape((currentShape + 1) % shapes.length)
    setRotation(rotation + 180)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-950 to-black flex flex-col items-center justify-center gap-8">
      <motion.div className="w-96 h-96" animate={{ rotate: rotation }} transition={{ duration: 0.8 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: color.from }} />
              <motion.stop offset="100%" animate={{ stopColor: color.to }} />
            </linearGradient>
          </defs>
          <motion.path
            d={shapes[currentShape].path}
            fill="url(#grad2)"
            animate={{ d: shapes[currentShape].path }}
            transition={{ duration: 0.6, type: "spring" }}
          />
        </svg>
      </motion.div>
      <p className="text-3xl text-white font-bold">{shapes[currentShape].name}</p>
      <button
        onClick={handleMorph}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Rotate & Morph
      </button>
    </div>
  )
}

// Morph 3: Scale Morph
function MorphEffect3() {
  const [currentShape, setCurrentShape] = useState(0)
  const [scale, setScale] = useState(1)
  const color = colors[currentShape % colors.length]

  const handleMorph = () => {
    setScale(0.5)
    setTimeout(() => {
      setCurrentShape((currentShape + 1) % shapes.length)
      setScale(1)
    }, 300)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-950 to-black flex flex-col items-center justify-center gap-8">
      <motion.div className="w-96 h-96" animate={{ scale }} transition={{ duration: 0.3 }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: color.from }} />
              <motion.stop offset="100%" animate={{ stopColor: color.to }} />
            </linearGradient>
          </defs>
          <motion.path
            d={shapes[currentShape].path}
            fill="url(#grad3)"
            animate={{ d: shapes[currentShape].path }}
            transition={{ duration: 0.6 }}
          />
        </svg>
      </motion.div>
      <p className="text-3xl text-white font-bold">{shapes[currentShape].name}</p>
      <button
        onClick={handleMorph}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Scale & Morph
      </button>
    </div>
  )
}

// Morph 4: Multi-Shape
function MorphEffect4() {
  const [indices, setIndices] = useState([0, 1, 2])

  const morphAll = () => {
    setIndices(indices.map(i => (i + 1) % shapes.length))
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-950 to-black flex flex-col items-center justify-center gap-8">
      <div className="flex gap-4">
        {indices.map((shapeIndex, i) => {
          const color = colors[shapeIndex % colors.length]
          return (
            <div key={i} className="w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id={`grad4-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <motion.stop offset="0%" animate={{ stopColor: color.from }} />
                    <motion.stop offset="100%" animate={{ stopColor: color.to }} />
                  </linearGradient>
                </defs>
                <motion.path
                  d={shapes[shapeIndex].path}
                  fill={`url(#grad4-${i})`}
                  animate={{ d: shapes[shapeIndex].path }}
                  transition={{ duration: 0.6, type: "spring" }}
                />
              </svg>
            </div>
          )
        })}
      </div>
      <button
        onClick={morphAll}
        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Morph All
      </button>
    </div>
  )
}

// Morph 5: Pulsing Morph
function MorphEffect5() {
  const [currentShape, setCurrentShape] = useState(0)
  const color = colors[currentShape % colors.length]

  return (
    <div className="h-screen bg-gradient-to-br from-orange-950 to-black flex flex-col items-center justify-center gap-8">
      <motion.div
        className="w-96 h-96"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop offset="0%" animate={{ stopColor: color.from }} />
              <motion.stop offset="100%" animate={{ stopColor: color.to }} />
            </linearGradient>
            <filter id="glow5">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={shapes[currentShape].path}
            fill="url(#grad5)"
            filter="url(#glow5)"
            animate={{ d: shapes[currentShape].path }}
            transition={{ duration: 0.6, type: "spring" }}
          />
        </svg>
      </motion.div>
      <p className="text-3xl text-white font-bold">{shapes[currentShape].name}</p>
      <button
        onClick={() => setCurrentShape((currentShape + 1) % shapes.length)}
        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Pulse & Morph
      </button>
    </div>
  )
}

export default function DemoMorphingExpanded() {
  return (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Morphing Shapes Collection
          </h1>
          <p className="text-2xl text-gray-400 mb-8">5 different morphing animations with 10 shapes</p>
        </div>
      </div>

      <Separator number={1} title="Basic Morph" />
      <MorphEffect1 />

      <Separator number={2} title="Rotating Morph" />
      <MorphEffect2 />

      <Separator number={3} title="Scale Morph" />
      <MorphEffect3 />

      <Separator number={4} title="Multi-Shape" />
      <MorphEffect4 />

      <Separator number={5} title="Pulsing Morph" />
      <MorphEffect5 />

      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-purple-950 to-black">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">End of Morphing Effects</h2>
          <p className="text-xl text-gray-400">Scroll back up to explore more</p>
        </div>
      </div>
    </div>
  )
}
