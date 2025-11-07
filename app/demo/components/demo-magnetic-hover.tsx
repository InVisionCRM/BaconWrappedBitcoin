"use client"

import { useRef, useState } from "react"
import { motion, useSpring } from "motion/react"
import Image from "next/image"
import PromptOverlay from "./prompt-overlay"

const magneticHoverPrompts = [
  "Create magnetic hover effect: Use useSpring(0, {stiffness: 300, damping: 30}) for x/y values. On mousemove, calculate cursor distance from element center. Set deltaX/Y = (mousePos - center) * 0.3 (magnetism strength). Apply x/y spring values to element style. Reset to 0 on mouse leave for smooth return.",
  "Build cursor-following magnetic item: Track mouse position with onMouseMove handler. Get element center using getBoundingClientRect(). Calculate offset: (e.clientX - centerX) * 0.3 for pull effect. Use useSpring for smooth physics-based animation. Add scale: 1.1 on hover with glow boxShadow effect.",
  "Implement magnetic attraction hover: Create spring motion values for x/y position. On hover, element follows cursor at 30% strength (multiply delta by 0.3). Use stiffness: 300, damping: 30 for responsive yet smooth movement. Combine with scale animation and orange glow shadow when hovered.",
  "Create magnetic pull effect: Use framer-motion useSpring hooks for x/y translation. Calculate mouse delta from item center on every mousemove. Apply delta * 0.3 to spring values for magnetic pull. Element scales to 1.1x and shows orange glow (boxShadow: 0 0 30px orange) on hover. Smooth spring physics."
]

const items = [
  { src: "/bacon-wrapped-bitcoin.jpg", label: "Bacon Bitcoin" },
  { src: "/artcoin1.png", label: "Art Coin" },
  { src: "/Baco.jpg", label: "Baco" },
  { src: "/pigunderlight.png", label: "Pig Light" }
]

function MagneticItem({ src, label, index }: { src: string; label: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return

    const rect = itemRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * 0.3
    const deltaY = (e.clientY - centerY) * 0.3

    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-64 h-64"
      style={{ x, y }}
    >
      <PromptOverlay effectNumber={index + 1} effectName="Magnetic Hover" prompt={magneticHoverPrompts[index]} />
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-orange-500/30 cursor-pointer"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-4"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          <h3 className="text-white font-bold text-xl">{label}</h3>
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(255, 107, 53, 0.6), 0 0 60px rgba(255, 107, 53, 0.3)"
              : "0 0 0px rgba(255, 107, 53, 0)"
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function DemoMagneticHover() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-indigo-950 to-purple-950 flex items-center justify-center p-8">
      <div className="grid grid-cols-2 gap-12 min-w-0">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <MagneticItem src={item.src} label={item.label} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
