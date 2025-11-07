"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { BuyNowSection } from "@/components/buy-now-section"

// Telescope Zoom Parallax Component
function TelescopeZoomParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 7vh", "end end"] // Start when carousel is 90% faded
  })

  const vignettes = [
    { src: "/liquidity.png" },
    { src: "/volume.png" },
    { src: "/holders.png" },
    { src: "/price.png" }
  ]

  return (
    <div ref={containerRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Fading "Baconomics & Stats" text in center with zoom effect */}
        <motion.div 
          className="absolute z-30 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 0.9]),
            scale: useTransform(scrollYProgress, [0.6, 0.75], [0.5, 1])
          }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white">Stats & Baconomics</h2>
        </motion.div>

        {vignettes.map((vignette, index) => {
          // Slower intervals - each image gets more time
          const scale = useTransform(scrollYProgress, [index * 0.18, (index + 1) * 0.18], [0.1, 3])
          const opacity = useTransform(scrollYProgress, [index * 0.18, (index + 0.5) * 0.18, (index + 1) * 0.18], [0, 1, 0])

          return (
            <motion.div
              key={index}
              className="absolute w-96 h-96 rounded-full overflow-hidden"
              style={{ scale, opacity }}
            >
              <Image src={vignette.src} alt={`Stats ${index}`} fill className="object-cover" />
              <div className="absolute inset-0 border-8 border-black rounded-full" />
            </motion.div>
          )
        })}

        {/* Single animated chevron with slide animation */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown 
            size={48} 
            className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
          />
        </motion.div>
      </div>
    </div>
  )
}

// Holographic Glass Cards Section
function HolographicStatsCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const stats = [
    {
      label: "Price",
      value: "$0.0042",
      change: "+15.3%",
      changeType: "positive" as const,
      image: "/price.png"
    },
    {
      label: "Liquidity",
      value: "$156.7K",
      change: "+5.7%",
      changeType: "positive" as const,
      image: "/liquidity.png"
  },
  {
    label: "Holders",
      value: "1,247",
    change: "+8.2%",
      changeType: "positive" as const,
      image: "/holders.png"
    },
    {
      label: "Volume",
      value: "$89.4K",
    change: "-3.1%",
      changeType: "negative" as const,
      image: "/volume.png"
    }
  ]

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/artcoin1.png" 
            alt="Background" 
            fill 
            className="object-cover"
          />
        </div>

        {/* Section title */}
        <motion.div 
          className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.2], [50, 0])
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">Stats</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full px-8 relative z-10">
          {stats.map((stat, index) => {
            // Staggered reveal based on scroll
            const startProgress = index * 0.15
            const endProgress = startProgress + 0.3
            
            const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1])
            const y = useTransform(scrollYProgress, [startProgress, endProgress], [100, 0])
            const scale = useTransform(scrollYProgress, [startProgress, endProgress], [0.8, 1])

            return (
              <motion.div
                key={stat.label}
                className="relative group"
                style={{
                  opacity,
                  y,
                  scale
                }}
              >
                {/* Holographic Glass Card - Matching Demo Style */}
                <motion.div 
                  className="relative overflow-hidden rounded-3xl p-8 border border-white/20"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                  whileHover={{
                    boxShadow: '0 16px 48px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.2)',
                    y: -8
                  }}
                  transition={{ duration: 0.3 }}
                >

                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Number badge */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 mb-4 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{index + 1}</span>
                    </div>

                    {/* Stat label */}
                    <h3 className="text-white font-bold text-2xl mb-2">
                    {stat.label}
                    </h3>
                    
                    {/* Stat value */}
                    <p className="text-white/80 text-sm mb-4">
                      Glass morphism with 15px blur and dynamic transparency
                    </p>

                    {/* Large value display */}
                    <p className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {stat.value}
                    </p>

                    {/* Change indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <span 
                        className={`text-lg font-semibold ${
                          stat.changeType === "positive" 
                            ? "text-green-400" 
                            : "text-red-400"
                        }`}
                      >
                        {stat.changeType === "positive" ? "↗" : "↘"} {stat.change}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">Holographic</div>
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs">Live</div>
                    </div>
                  </div>

                  {/* Decorative glow element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Baconomics Section with Spiral Parallax Animation
function BaconomicsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const baconomics = [
    {
      label: "Total Supply",
      value: "900,000,000",
      change: "-10%",
      changeType: "negative" as const,
      animationType: "spiral-in" as const,
      gradient: "from-orange-600/20 to-red-600/20"
    },
    {
      label: "Burned",
      value: "100,000,000",
      change: "+10%",
      changeType: "positive" as const,
      animationType: "portal-emerge" as const,
      gradient: "from-purple-600/20 to-pink-600/20"
    },
    {
      label: "Days Since Launch",
      value: "31",
      change: "",
      changeType: "" as const,
      animationType: "liquid-rise" as const,
      gradient: "from-cyan-600/20 to-blue-600/20"
    },
    {
      label: "Top Liquidity Pair",
      value: "BACON/WPLS",
      change: "$36,000",
      changeType: "" as const,
      animationType: "magnetic-snap" as const,
      gradient: "from-emerald-600/20 to-teal-600/20"
    }
  ]

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/baconbg.png" 
            alt="Background" 
            fill 
            className="object-cover"
          />
        </div>
        
        {/* Section title */}
        <motion.div 
          className="absolute top-16 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.2], [50, 0])
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">Baconomics</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full px-8 relative z-10">
          {baconomics.map((stat, index) => {
            // Spiral in from edges animation - cards rest fully before parallax ends
            const spiralStart = 0.05 + (index * 0.12)
            const spiralEnd = spiralStart + 0.25
            
            // Starting positions from edges (top-left, top-right, bottom-left, bottom-right)
            const edgePositions = [
              { x: -400, y: -300, rotate: -180 }, // Top-left
              { x: 400, y: -300, rotate: 180 },   // Top-right
              { x: -400, y: 300, rotate: -90 },   // Bottom-left
              { x: 400, y: 300, rotate: 90 }      // Bottom-right
            ]
            
            // Final grid positions (2x2) - match Stats section spacing
            const gridPositions = [
              { x: 0, y: 0 },     // Top-left (grid handles positioning)
              { x: 0, y: 0 },     // Top-right (grid handles positioning)
              { x: 0, y: 0 },     // Bottom-left (grid handles positioning)
              { x: 0, y: 0 }      // Bottom-right (grid handles positioning)
            ]
            
            const edgePos = edgePositions[index]
            const gridPos = gridPositions[index]
            
            const opacity = useTransform(scrollYProgress, [spiralStart, spiralEnd], [0, 1])
            const x = useTransform(scrollYProgress, [spiralStart, spiralEnd], [edgePos.x, gridPos.x])
            const y = useTransform(scrollYProgress, [spiralStart, spiralEnd], [edgePos.y, gridPos.y])
            const rotate = useTransform(scrollYProgress, [spiralStart, spiralEnd], [edgePos.rotate, 0])
            const scale = useTransform(scrollYProgress, [spiralStart, spiralEnd], [0.5, 1])

            return (
              <motion.div
                key={stat.label}
                className="relative group"
                style={{
                  opacity,
                  x,
                  y,
                  rotate,
                  scale
                }}
              >
                {/* Glass Card - match Stats section sizing */}
                <motion.div 
                  className="relative overflow-hidden rounded-3xl p-8 border border-white/20"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                  whileHover={{
                    boxShadow: '0 16px 48px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.2)',
                    y: -8
                  }}
                  transition={{ duration: 0.3 }}
                >

                  {/* Card content */}
                  <div className="relative z-10">
                    {/* Number badge */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 mb-4 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{index + 1}</span>
                    </div>

                    {/* Stat label */}
                    <h3 className="text-white font-bold text-2xl mb-2">
                      {stat.label}
                    </h3>
                    
                    {/* Large value display */}
                    <p className="text-4xl md:text-5xl font-bold text-white mb-3">
                      {stat.value}
                    </p>

                    {/* Change indicator */}
                    {stat.change && (
                      <div className="flex items-center gap-2 mb-4">
                      <span 
                          className={`text-lg font-semibold ${
                          stat.changeType === "positive" 
                            ? "text-green-400" 
                            : stat.changeType === "negative" 
                            ? "text-red-400" 
                            : "text-white/60"
                        }`}
                      >
                          {stat.changeType === "positive" && "↗ "}
                          {stat.changeType === "negative" && "↘ "}
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>

                  {/* Decorative glow element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </motion.div>
              </motion.div>
            )
          })}
              </div>
          </div>
        </div>
  )
}

export function Stats() {
  return (
    <>
      <TelescopeZoomParallax />
      <HolographicStatsCards />
      <BaconomicsSection />
      {/* Contract Address Section with Wavy Background */}
      <section id="tokenomics" className="relative bg-black scroll-mt-24">
        <BuyNowSection />
    </section>
    </>
  )
}
