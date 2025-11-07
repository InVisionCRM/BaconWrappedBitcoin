"use client"

import { useRef, useState } from "react"
import { motion, useSpring, useMotionValue, useTransform } from "motion/react"
import Image from "next/image"

function Separator({ number, title }: { number: number; title: string }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="h-px w-32 bg-gradient-to-r from-transparent to-blue-500" />
        <span className="text-blue-500 font-bold text-xl">#{number} {title}</span>
        <div className="h-px w-32 bg-gradient-to-l from-transparent to-blue-500" />
      </div>
    </div>
  )
}

// Hover Effect 1: Magnetic Card
function HoverEffect1() {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-950 to-black flex items-center justify-center">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0) }}
        className="relative w-80 h-96"
        style={{ x, y }}
      >
        <motion.div
          className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-purple-500/30"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        >
          <Image src="/bacon-wrapped-bitcoin.jpg" alt="Bacon Bitcoin" fill className="object-cover" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-bold">Magnetic Card</h3>
            <p className="text-gray-300">Follows your cursor</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Hover Effect 2: 3D Tilt
function HoverEffect2() {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setRotateY(((x - centerX) / centerX) * 15)
    setRotateX((-(y - centerY) / centerY) * 15)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-950 to-black flex items-center justify-center" style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setRotateX(0); setRotateY(0) }}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-80 h-96 relative rounded-3xl overflow-hidden border-4 border-blue-500 shadow-2xl"
      >
        <Image src="/artcoin1.png" alt="Art Coin" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-3xl font-bold">3D Tilt</h3>
        </div>
      </motion.div>
    </div>
  )
}

// Hover Effect 3: Scale & Glow
function HoverEffect3() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-pink-950 to-black flex items-center justify-center">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered
            ? "0 0 60px rgba(236, 72, 153, 0.8), 0 0 120px rgba(236, 72, 153, 0.4)"
            : "0 0 0px rgba(236, 72, 153, 0)"
        }}
        transition={{ duration: 0.3 }}
        className="w-80 h-80 relative rounded-full overflow-hidden border-4 border-pink-500"
      >
        <Image src="/Baco.jpg" alt="Baco" fill className="object-cover" />
        <motion.div
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          className="absolute inset-0 bg-pink-500"
        />
      </motion.div>
    </div>
  )
}

// Hover Effect 4: Border Reveal
function HoverEffect4() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-green-950 to-black flex items-center justify-center">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-96 h-96"
      >
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            background: isHovered
              ? "conic-gradient(from 0deg, #10b981, #3b82f6, #8b5cf6, #ec4899, #10b981)"
              : "conic-gradient(from 0deg, transparent, transparent)"
          }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-1 bg-black rounded-3xl overflow-hidden">
          <Image src="/pigunderlight.png" alt="Pig" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">Border Reveal</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hover Effect 5: Lift & Shadow
function HoverEffect5() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-orange-950 to-black flex items-center justify-center">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -20 : 0,
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(249, 115, 22, 0.5)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
        }}
        className="w-80 h-96 relative rounded-2xl overflow-hidden border-2 border-orange-500/30"
      >
        <Image src="/singlepig.png" alt="Pig" fill className="object-cover" />
        <motion.div
          animate={{ opacity: isHovered ? 0 : 0.5 }}
          className="absolute inset-0 bg-black"
        />
        <div className="absolute bottom-6 left-6 text-white z-10">
          <h3 className="text-3xl font-bold">Lift Effect</h3>
        </div>
      </motion.div>
    </div>
  )
}

// Hover Effect 6: Reveal Overlay
function HoverEffect6() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-red-950 to-black flex items-center justify-center">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-96 h-96 overflow-hidden rounded-3xl"
      >
        <Image src="/artcoin2.png" alt="Art Coin" fill className="object-cover" />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-red-500/80 to-pink-500/80 flex items-center justify-center"
        >
          <h3 className="text-white text-4xl font-bold">REVEALED</h3>
        </motion.div>
      </div>
    </div>
  )
}

// Hover Effect 7: Cursor Follow
function HoverEffect7() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-950 to-black flex items-center justify-center">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="relative w-96 h-96 rounded-3xl overflow-hidden border-2 border-cyan-500"
      >
        <Image src="/artcoin3.png" alt="Art Coin" fill className="object-cover" />
        <motion.div
          className="absolute w-32 h-32 rounded-full pointer-events-none"
          animate={{ x: position.x - 64, y: position.y - 64 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)"
          }}
        />
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold">Cursor Spotlight</h3>
        </div>
      </div>
    </div>
  )
}

// Hover Effect 8: Flip Reveal
function HoverEffect8() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="h-screen bg-gradient-to-br from-violet-950 to-black flex items-center justify-center">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-80 h-96 cursor-pointer perspective-1000"
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border-2 border-violet-500">
            <Image src="/artcoin4.png" alt="Art Coin" fill className="object-cover" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold">Click to Flip</h3>
            </div>
          </div>
          <div
            className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border-2 border-violet-500 bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center"
            style={{ transform: "rotateY(180deg)" }}
          >
            <h3 className="text-white text-4xl font-bold">FLIPPED!</h3>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function DemoHoverEffectsExpanded() {
  return (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Hover Effects Collection
          </h1>
          <p className="text-2xl text-gray-400 mb-8">8 unique hover and interaction effects</p>
        </div>
      </div>

      <Separator number={1} title="Magnetic Card" />
      <HoverEffect1 />

      <Separator number={2} title="3D Tilt" />
      <HoverEffect2 />

      <Separator number={3} title="Scale & Glow" />
      <HoverEffect3 />

      <Separator number={4} title="Border Reveal" />
      <HoverEffect4 />

      <Separator number={5} title="Lift & Shadow" />
      <HoverEffect5 />

      <Separator number={6} title="Slide Overlay" />
      <HoverEffect6 />

      <Separator number={7} title="Cursor Follow" />
      <HoverEffect7 />

      <Separator number={8} title="Flip Reveal" />
      <HoverEffect8 />

      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-cyan-950 to-black">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">End of Hover Effects</h2>
          <p className="text-xl text-gray-400">Scroll back up to explore more</p>
        </div>
      </div>
    </div>
  )
}
