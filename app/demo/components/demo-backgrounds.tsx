/* eslint-disable react/no-inline-styles */
"use client"

import { useState } from "react"
import { motion } from "motion/react"
import PromptOverlay from "./prompt-overlay"

const backgroundPrompts = {
  animated: [
    "Create animated gradient background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3). Use CSS animation to rotate hue-rotate(360deg) over 10s infinite. Apply to body or container with fixed position, full coverage.",
    "Create floating particles background: Use CSS animation with multiple pseudo-elements (::before, ::after) or div elements. Each particle has random position, size (2-8px), opacity (0.1-0.8), and animation duration (3-15s). Use transform: translateY and opacity for floating effect. Infinite animation.",
    "Create wave animation background: Use SVG wave path with CSS animation on stroke-dasharray or path data. Multiple wave layers with different speeds create parallax effect. Use transform: translateX with different animation durations. Background color gradient complements wave colors.",
    "Create geometric pattern background: CSS grid with animated geometric shapes (circles, squares, triangles). Each shape has random rotation, scale, and position animations. Use transform: rotate, scale, translate with staggered animation delays. Shapes have semi-transparent colors.",
    "Create liquid blob background: Use CSS border-radius with extreme values (50% 30% 70% 40%) and animate border-radius values. Multiple blob layers with different sizes and speeds. Use filter: blur for organic effect. Colors transition smoothly with CSS custom properties.",
    "Create matrix rain background: Vertical text columns falling down with CSS animation. Use monospace font, green color (#00ff00), random characters. Animation: translateY from -100% to 100vh. Multiple columns with staggered delays. Opacity fade at top and bottom.",
    "Create morphing gradient background: Radial gradients with animated center positions and sizes. Use CSS custom properties for gradient center coordinates. Animation moves centers in circular or figure-8 patterns. Colors blend smoothly between stops.",
    "Create rotating shapes background: CSS shapes (circles, polygons) rotating at different speeds around invisible centers. Use transform-origin for rotation points. Multiple layers create depth. Shapes have gradient fills and subtle shadows.",
    "Create flowing lines background: Animated SVG paths or CSS borders creating flowing, organic line patterns. Lines have stroke-dasharray animation for flowing effect. Multiple line layers with different colors and speeds. Use path animation or transform: translateX.",
    "Create pulsing orbs background: Circular elements with scale and glow animations. Each orb has different size, color, and animation timing. Use box-shadow for glow effect with animated blur and spread. Orbs move slowly with transform: translate for ambient motion.",
    "Create aurora borealis background: Multiple overlapping layers with CSS linear-gradients at different angles. Animate opacity, transform: translateX/Y, and hue-rotate. Use mix-blend-mode: screen for realistic light blending. Colors: greens, blues, purples with high saturation.",
    "Create constellation stars background: Small dots (1-3px) positioned randomly with twinkling opacity animation. Connect nearby stars with SVG lines that fade in/out. Use filter: blur on some stars for depth. Animate line stroke-dasharray for connecting effect.",
    "Create digital circuit board background: Grid pattern with animated lines connecting nodes. Use SVG paths for circuit traces with glowing effect (filter: drop-shadow). Animate stroke-dashoffset for electricity flow. Nodes pulse with scale animation. Neon colors.",
    "Create lava lamp background: Large blobs with extreme border-radius values floating up and down. Use filter: blur(40px) for organic merging. Multiple layers with different speeds and colors. Animate transform: translateY and border-radius simultaneously.",
    "Create northern lights curtain background: Vertical gradient curtains that wave horizontally. Use clip-path or skewX for curtain shape. Animate transform: translateX and scaleY for flowing motion. Multiple layers with opacity and color variation.",
    "Create cosmic nebula background: Large radial gradients with animated position, size, and rotation. Use filter: blur for soft edges and mix-blend-mode: screen for color mixing. Animate opacity and transform for depth. Colors: deep purples, blues, pinks.",
    "Create electric storm background: Animated lightning bolts using SVG paths with stroke-dasharray. Random appearance timing. Background flashes with animated brightness. Use filter: drop-shadow for glow. Bolts branch from center to edges.",
    "Create holographic shimmer background: Diagonal stripes with linear-gradient using metallic colors. Animate background-position for moving shimmer effect. Use mix-blend-mode: overlay. Add secondary layer with different angle for crosshatch effect.",
    "Create fiber optic background: Thin lines (1-2px) emanating from center point. Animate length and opacity from center outward. Use radial-gradient for glow at center. Lines rotate slowly around center. Multiple color variations.",
    "Create plasma ball background: Central glowing orb with animated tendrils extending outward. Use SVG paths for tendrils with animated stroke-dashoffset. Center has pulsing radial-gradient. Tendrils randomly appear/disappear. Electric purple/blue colors.",
    "Create quantum field background: Grid of small particles that distort when near each other. Particles have wave animation (sine/cosine movement). Use transform: translate with calculated distances. Grid lines bend near particles. Sci-fi aesthetic.",
    "Create crystalline fractal background: Triangular shapes arranged in fractal pattern. Each triangle rotates independently. Use clip-path: polygon for triangle shapes. Animate rotation, opacity, and scale. Gradient fills create depth. Icy blue/white colors.",
    "Create binary rain background: Falling columns of 0s and 1s with varying speeds. Use text shadows for glow. Animate color between green, blue, cyan. Random character changes mid-fall. Background: dark with subtle grid pattern.",
    "Create warp speed stars background: Lines stretching from center to edges (star trails). Animate length and opacity from center outward. Use transform: scaleX for stretching effect. New stars appear at center, fade at edges. Speed up/slow down variation.",
    "Create DNA helix background: Double helix structure with rotating particles. Use 3D transforms (rotateY, translateZ) for helix motion. Connecting lines between helixes. Particles have different colors. Animate full rotation over time with perspective."
  ],
  interactive: [
    "Create cursor-following particles: JavaScript tracks mouse position, creates particles that follow with delay and easing. Particles fade out over time. Use transform: translate3d for performance. Random particle sizes and colors. Smooth following animation with requestAnimationFrame.",
    "Create interactive gradient: Background gradient changes based on mouse position. Use CSS custom properties updated via JavaScript. Map mouse coordinates to hue, saturation, or gradient angle. Smooth transitions between gradient states. Works with touch events on mobile.",
    "Create ripple effect background: Click/touch creates expanding ripple waves from interaction point. Use CSS animation with transform: scale and opacity. Multiple ripples can overlap. JavaScript handles event listeners and creates ripple elements dynamically.",
    "Create parallax scrolling background: Background elements move at different speeds during scroll. Use transform: translateY with different multipliers based on scroll position. JavaScript calculates scroll progress and updates transforms. Smooth performance with will-change property.",
    "Create magnetic attraction background: Background elements are attracted to mouse cursor with physics simulation. Use JavaScript to calculate distance and apply magnetic force. Elements have mass and velocity properties. Smooth animation with easing functions.",
    "Create interactive mesh background: Background consists of connected points that respond to mouse proximity. Use SVG or canvas for smooth lines between points. JavaScript calculates distances and adjusts line opacity/width. Points can have slight movement for organic feel.",
    "Create scroll-triggered animations: Background elements animate based on scroll position and viewport intersection. Use Intersection Observer API for performance. Different elements trigger at different scroll percentages. Smooth transitions with CSS transforms.",
    "Create hover-activated zones: Background has invisible zones that activate different animations on hover. Use JavaScript event listeners for mouseenter/mouseleave. Each zone triggers unique background effect (color change, particle burst, shape morphing).",
    "Create touch-responsive background: Background responds to touch gestures (swipe, pinch, rotate). Use touch event listeners to detect gestures. Background elements transform based on gesture data. Smooth animations with CSS transitions and transforms.",
    "Create dynamic lighting background: Mouse cursor acts as light source affecting background brightness and shadows. Use CSS filter: brightness and box-shadow. JavaScript calculates distance from cursor to background elements. Creates realistic lighting simulation."
  ]
}

function AnimatedGradientBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)",
          backgroundSize: "400% 400%"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <PromptOverlay effectNumber={1} effectName="Animated Gradient" prompt={backgroundPrompts.animated[0]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Animated Gradient</h3>
        <p className="text-white/90 text-sm">Flowing color transitions</p>
      </div>
    </div>
  )
}

function FloatingParticlesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [-20, -300],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}
      <PromptOverlay effectNumber={2} effectName="Floating Particles" prompt={backgroundPrompts.animated[1]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Floating Particles</h3>
        <p className="text-white/90 text-sm">Ambient particle motion</p>
      </div>
    </div>
  )
}

function WaveAnimationBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-400 to-purple-600">
      <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1200 120">
        <motion.path
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="rgba(255,255,255,0.1)"
          animate={{
            d: [
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
              "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,80C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z",
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
      <PromptOverlay effectNumber={3} effectName="Wave Animation" prompt={backgroundPrompts.animated[2]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Wave Animation</h3>
        <p className="text-white/90 text-sm">Flowing wave patterns</p>
      </div>
    </div>
  )
}

function GeometricPatternBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-800">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 opacity-30"
          style={{
            left: `${20 + (i * 7)}%`,
            top: `${10 + (i * 6)}%`,
            borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "0%" : "20%"
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear"
          }}
        />
      ))}
      <PromptOverlay effectNumber={4} effectName="Geometric Pattern" prompt={backgroundPrompts.animated[3]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Geometric Pattern</h3>
        <p className="text-white/90 text-sm">Rotating shapes</p>
      </div>
    </div>
  )
}

function LiquidBlobBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600">
      <motion.div
        className="absolute inset-4 bg-white/20"
        animate={{
          borderRadius: [
            "50% 30% 70% 40%",
            "40% 60% 30% 70%",
            "60% 40% 50% 60%",
            "30% 70% 40% 50%",
            "50% 30% 70% 40%"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute inset-8 bg-white/10"
        animate={{
          borderRadius: [
            "40% 60% 50% 30%",
            "60% 40% 70% 60%",
            "30% 70% 40% 50%",
            "50% 30% 60% 70%",
            "40% 60% 50% 30%"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <PromptOverlay effectNumber={5} effectName="Liquid Blob" prompt={backgroundPrompts.animated[4]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Liquid Blob</h3>
        <p className="text-white/90 text-sm">Morphing organic shapes</p>
      </div>
    </div>
  )
}

function MatrixRainBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 text-xs font-mono"
          style={{
            left: `${i * 5}%`,
            top: "-20px"
          }}
          animate={{
            y: [0, 300]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {Array.from({ length: 10 }).map((_, j) => (
            <div key={j} className="opacity-80">
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </motion.div>
      ))}
      <PromptOverlay effectNumber={6} effectName="Matrix Rain" prompt={backgroundPrompts.animated[5]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Matrix Rain</h3>
        <p className="text-white/90 text-sm">Digital rain effect</p>
      </div>
    </div>
  )
}

function MorphingGradientBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, #ff6b6b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4ecdc4 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #ff6b6b 0%, transparent 50%), radial-gradient(circle at 20% 80%, #4ecdc4 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #ff6b6b 0%, transparent 50%), radial-gradient(circle at 50% 50%, #4ecdc4 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, #ff6b6b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4ecdc4 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <PromptOverlay effectNumber={7} effectName="Morphing Gradient" prompt={backgroundPrompts.animated[6]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Morphing Gradient</h3>
        <p className="text-white/90 text-sm">Moving gradient centers</p>
      </div>
    </div>
  )
}

function RotatingShapesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-40"
          style={{
            left: "50%",
            top: "50%",
            transformOrigin: `${100 + i * 30}px 0px`,
            marginLeft: "-24px",
            marginTop: "-24px"
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      <PromptOverlay effectNumber={8} effectName="Rotating Shapes" prompt={backgroundPrompts.animated[7]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Rotating Shapes</h3>
        <p className="text-white/90 text-sm">Orbital motion</p>
      </div>
    </div>
  )
}

function FlowingLinesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M0,${100 + i * 20} Q200,${80 + i * 20} 400,${100 + i * 20} T800,${100 + i * 20}`}
            stroke={`hsl(${200 + i * 40}, 70%, 60%)`}
            strokeWidth="2"
            fill="none"
            opacity="0.6"
            strokeDasharray="10 5"
            animate={{
              strokeDashoffset: [0, -30]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>
      <PromptOverlay effectNumber={9} effectName="Flowing Lines" prompt={backgroundPrompts.animated[8]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Flowing Lines</h3>
        <p className="text-white/90 text-sm">Animated line patterns</p>
      </div>
    </div>
  )
}

function PulsingOrbsBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-800">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full ${i % 2 === 0 ? "shadow-lg shadow-orange-400/50" : ""}`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      <PromptOverlay effectNumber={10} effectName="Pulsing Orbs" prompt={backgroundPrompts.animated[9]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Pulsing Orbs</h3>
        <p className="text-white/90 text-sm">Glowing energy spheres</p>
      </div>
    </div>
  )
}

function InteractiveGradientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="relative w-full h-64 rounded-2xl overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)`
        }}
      />
      <PromptOverlay effectNumber={1} effectName="Interactive Gradient" prompt={backgroundPrompts.interactive[1]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Interactive Gradient</h3>
        <p className="text-white/90 text-sm">Move mouse to control gradient</p>
      </div>
    </div>
  )
}

function RippleEffectBackground() {
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = { id: Date.now(), x, y }
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 1000)
  }

  return (
    <div 
      className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 cursor-pointer"
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute border-2 border-white rounded-full"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10
          }}
          initial={{ width: 20, height: 20, opacity: 1 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
      <PromptOverlay effectNumber={2} effectName="Ripple Effect" prompt={backgroundPrompts.interactive[2]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Ripple Effect</h3>
        <p className="text-white/90 text-sm">Click to create ripples</p>
      </div>
    </div>
  )
}

function MagneticAttractionBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const baseX = 50 + Math.cos(i * Math.PI / 4) * 100
        const baseY = 50 + Math.sin(i * Math.PI / 4) * 100
        
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - baseX, 2) + Math.pow(mousePosition.y - baseY, 2)
        )
        const attraction = Math.max(0, 100 - distance) / 100
        
        return (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-orange-400 rounded-full"
            style={{
              left: baseX - attraction * (mousePosition.x - baseX) * 0.3,
              top: baseY - attraction * (mousePosition.y - baseY) * 0.3
            } as React.CSSProperties}
            animate={{
              scale: 1 + attraction * 0.5
            }}
            transition={{ duration: 0.1 }}
          />
        )
      })}
      <PromptOverlay effectNumber={3} effectName="Magnetic Attraction" prompt={backgroundPrompts.interactive[4]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Magnetic Attraction</h3>
        <p className="text-white/90 text-sm">Particles attracted to cursor</p>
      </div>
    </div>
  )
}

function DynamicLightingBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div 
      className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 transition-all duration-200"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)`
        }}
      />
      <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
      <PromptOverlay effectNumber={4} effectName="Dynamic Lighting" prompt={backgroundPrompts.interactive[9]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Dynamic Lighting</h3>
        <p className="text-white/90 text-sm">Cursor acts as light source</p>
      </div>
    </div>
  )
}

function AuroraBorealisBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${60 + i * 30}deg, transparent, ${i === 0 ? '#00ff88' : i === 1 ? '#0088ff' : '#aa00ff'}, transparent)`,
            mixBlendMode: 'screen'
          }}
          animate={{
            x: ['-20%', '20%', '-20%'],
            opacity: [0.3, 0.7, 0.3],
            rotateZ: [0, 10, 0]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <PromptOverlay effectNumber={11} effectName="Aurora Borealis" prompt={backgroundPrompts.animated[10]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Aurora Borealis</h3>
        <p className="text-white/90 text-sm">Northern lights effect</p>
      </div>
    </div>
  )
}

function ConstellationStarsBackground() {
  const stars = Array.from({ length: 50 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1
  }))

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      <PromptOverlay effectNumber={12} effectName="Constellation Stars" prompt={backgroundPrompts.animated[11]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Constellation Stars</h3>
        <p className="text-white/90 text-sm">Twinkling starfield</p>
      </div>
    </div>
  )
}

function DigitalCircuitBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.line
            key={i}
            x1={i * 15 + '%'}
            y1="0"
            x2={i * 15 + '%'}
            y2="100%"
            stroke="cyan"
            strokeWidth="1"
            opacity="0.3"
            strokeDasharray="5 10"
            animate={{
              strokeDashoffset: [0, -30]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={20 + i * 12 + '%'}
            cy={30 + (i % 3) * 25 + '%'}
            r="3"
            fill="cyan"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </svg>
      <PromptOverlay effectNumber={13} effectName="Digital Circuit" prompt={backgroundPrompts.animated[12]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Digital Circuit</h3>
        <p className="text-white/90 text-sm">Electric flow pattern</p>
      </div>
    </div>
  )
}

function LavaLampBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-red-900 to-orange-900">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-32 h-32 ${i % 2 === 0 ? 'bg-red-500' : 'bg-orange-500'}`}
          style={{
            left: `${20 + i * 20}%`,
            filter: 'blur(40px)',
            opacity: 0.6
          }}
          animate={{
            y: ['100%', '-20%', '100%'],
            borderRadius: [
              '60% 40% 30% 70%',
              '30% 60% 70% 40%',
              '60% 40% 30% 70%'
            ],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
      <PromptOverlay effectNumber={14} effectName="Lava Lamp" prompt={backgroundPrompts.animated[13]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Lava Lamp</h3>
        <p className="text-white/90 text-sm">Floating blobs</p>
      </div>
    </div>
  )
}

function NorthernLightsCurtainBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-20"
          style={{
            left: `${i * 20}%`,
            background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? '#00ff88' : '#00ccff'}, transparent)`,
            opacity: 0.4,
            mixBlendMode: 'screen'
          }}
          animate={{
            skewX: [-10, 10, -10],
            scaleY: [0.8, 1.2, 0.8],
            x: [-20, 20, -20]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <PromptOverlay effectNumber={15} effectName="Northern Lights" prompt={backgroundPrompts.animated[14]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Northern Lights</h3>
        <p className="text-white/90 text-sm">Curtain waves</p>
      </div>
    </div>
  )
}

function CosmicNebulaBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(ellipse at ${50 + i * 20}% ${50 - i * 15}%, ${i === 0 ? '#aa00ff' : i === 1 ? '#0066ff' : '#ff0088'}, transparent)`,
            mixBlendMode: 'screen',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <PromptOverlay effectNumber={16} effectName="Cosmic Nebula" prompt={backgroundPrompts.animated[15]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Cosmic Nebula</h3>
        <p className="text-white/90 text-sm">Deep space clouds</p>
      </div>
    </div>
  )
}

function ElectricStormBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{
          opacity: [0, 0.3, 0, 0, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.5, 1]
        }}
      />
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M${50 + i * 10},0 L${40 + i * 15},40 L${60 + i * 10},40 L${45 + i * 12},80 L${70 + i * 8},80 L${55 + i * 10},120`}
            stroke="#ffff00"
            strokeWidth="2"
            fill="none"
            filter="drop-shadow(0 0 10px #ffff00)"
            animate={{
              opacity: [0, 1, 0],
              pathLength: [0, 1]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 2 + i,
              delay: i * 0.5
            }}
          />
        ))}
      </svg>
      <PromptOverlay effectNumber={17} effectName="Electric Storm" prompt={backgroundPrompts.animated[16]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Electric Storm</h3>
        <p className="text-white/90 text-sm">Lightning strikes</p>
      </div>
    </div>
  )
}

function HolographicShimmerBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(0,255,255,0.1) 15px, rgba(0,255,255,0.1) 30px)',
          mixBlendMode: 'overlay'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '-60px 60px']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <PromptOverlay effectNumber={18} effectName="Holographic Shimmer" prompt={backgroundPrompts.animated[17]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Holographic Shimmer</h3>
        <p className="text-white/90 text-sm">Metallic rainbow effect</p>
      </div>
    </div>
  )
}

function FiberOpticBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * 360
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 origin-left"
            style={{
              height: '2px',
              background: `linear-gradient(to right, ${i % 3 === 0 ? '#ff00ff' : i % 3 === 1 ? '#00ffff' : '#ffff00'}, transparent)`,
              transform: `rotate(${angle}deg)`
            }}
            animate={{
              scaleX: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        )
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, #ffffff, transparent)',
          filter: 'blur(4px)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
      <PromptOverlay effectNumber={19} effectName="Fiber Optic" prompt={backgroundPrompts.animated[18]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Fiber Optic</h3>
        <p className="text-white/90 text-sm">Light rays burst</p>
      </div>
    </div>
  )
}

function PlasmaBallBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      <motion.div
        className="absolute left-1/2 top-1/2 w-20 h-20 -ml-10 -mt-10 rounded-full"
        style={{
          background: 'radial-gradient(circle, #aa00ff, #6600ff)',
          filter: 'blur(8px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * 360
          const x2 = 50 + Math.cos((angle * Math.PI) / 180) * 40
          const y2 = 50 + Math.sin((angle * Math.PI) / 180) * 40
          return (
            <motion.line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#aa00ff"
              strokeWidth="2"
              filter="drop-shadow(0 0 5px #aa00ff)"
              animate={{
                opacity: [0, 1, 0],
                strokeDashoffset: [100, 0]
              }}
              strokeDasharray="100"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          )
        })}
      </svg>
      <PromptOverlay effectNumber={20} effectName="Plasma Ball" prompt={backgroundPrompts.animated[19]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Plasma Ball</h3>
        <p className="text-white/90 text-sm">Electric tendrils</p>
      </div>
    </div>
  )
}

function QuantumFieldBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (i % 6) * 16 + 10,
    y: Math.floor(i / 6) * 20 + 10
  }))

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`
          }}
          animate={{
            x: [0, Math.sin(i) * 10, 0],
            y: [0, Math.cos(i) * 10, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <PromptOverlay effectNumber={21} effectName="Quantum Field" prompt={backgroundPrompts.animated[20]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Quantum Field</h3>
        <p className="text-white/90 text-sm">Particle wave motion</p>
      </div>
    </div>
  )
}

function CrystallineFractalBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 to-cyan-950">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-400/30"
          style={{
            left: `${20 + (i % 4) * 20}%`,
            top: `${20 + Math.floor(i / 4) * 25}%`,
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
          }}
          animate={{
            rotate: [0, 120, 240, 360],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      <PromptOverlay effectNumber={22} effectName="Crystalline Fractal" prompt={backgroundPrompts.animated[21]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Crystalline Fractal</h3>
        <p className="text-white/90 text-sm">Rotating triangles</p>
      </div>
    </div>
  )
}

function BinaryRainBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono"
          style={{
            left: `${i * 6.5}%`,
            top: '-20px',
            color: `hsl(${180 + i * 10}, 70%, 60%)`
          }}
          animate={{
            y: [0, 280],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </motion.div>
      ))}
      <PromptOverlay effectNumber={23} effectName="Binary Rain" prompt={backgroundPrompts.animated[22]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Binary Rain</h3>
        <p className="text-white/90 text-sm">Falling code</p>
      </div>
    </div>
  )
}

function WarpSpeedStarsBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = Math.random() * 360
        const distance = Math.random() * 50
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1 h-0.5 bg-white origin-left"
            style={{
              transform: `rotate(${angle}deg)`,
              marginLeft: `${distance}%`
            }}
            animate={{
              scaleX: [0, 3, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        )
      })}
      <PromptOverlay effectNumber={24} effectName="Warp Speed Stars" prompt={backgroundPrompts.animated[23]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Warp Speed Stars</h3>
        <p className="text-white/90 text-sm">Hyperspace jump</p>
      </div>
    </div>
  )
}

function DNAHelixBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950" style={{ perspective: '500px' }}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              backgroundColor: i % 2 === 0 ? '#ff0088' : '#00ffff'
            }}
            animate={{
              x: [Math.cos(angle) * 80, Math.cos(angle + Math.PI * 2) * 80],
              y: [(i - 10) * 10, (i - 10) * 10],
              z: [Math.sin(angle) * 80, Math.sin(angle + Math.PI * 2) * 80]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )
      })}
      <PromptOverlay effectNumber={25} effectName="DNA Helix" prompt={backgroundPrompts.animated[24]} position="top-right" />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">DNA Helix</h3>
        <p className="text-white/90 text-sm">3D double helix</p>
      </div>
    </div>
  )
}

function NeonPulseBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-4 rounded-2xl"
          style={{
            borderColor: `hsl(${i * 60}, 100%, 50%)`,
            margin: `${i * 8}px`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Neon Pulse</h3>
        <p className="text-white/90 text-sm">Expanding neon rings</p>
      </div>
    </div>
  )
}

function PerlinNoiseBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${(i % 10) * 10}%`,
            top: `${Math.floor(i / 10) * 10}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.8, 0.2],
            y: [0, Math.sin(i) * 20, 0]
          }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            delay: (i % 10) * 0.1
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Perlin Noise</h3>
        <p className="text-white/90 text-sm">Organic flow pattern</p>
      </div>
    </div>
  )
}

function GlitchEffectBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-magenta-500"
        animate={{
          x: [0, -5, 5, -3, 3, 0],
          opacity: [1, 0.8, 0.9, 0.7, 1]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 mix-blend-screen"
        animate={{
          x: [0, 3, -3, 2, -2, 0],
          y: [0, -2, 2, -1, 1, 0]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Glitch Effect</h3>
        <p className="text-white/90 text-sm">Digital distortion</p>
      </div>
    </div>
  )
}

function VortexSpiralBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {Array.from({ length: 12 }).map((_, i) => {
        const radius = 20 + i * 15
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 border-2 border-purple-500/50 rounded-full"
            style={{
              width: radius * 2,
              height: radius * 2,
              marginLeft: -radius,
              marginTop: -radius
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 - i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )
      })}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Vortex Spiral</h3>
        <p className="text-white/90 text-sm">Hypnotic spiral</p>
      </div>
    </div>
  )
}

function MosaicTilesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-800">
      <div className="grid grid-cols-8 grid-rows-4 gap-1 h-full">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-br from-orange-400 to-pink-500"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Mosaic Tiles</h3>
        <p className="text-white/90 text-sm">Pulsing grid pattern</p>
      </div>
    </div>
  )
}

function ScanlineBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-green-900 to-cyan-900">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-0.5 bg-white/30"
          style={{ top: `${i * 5}%` }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleY: [1, 1.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{
          y: ['-100%', '200%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Scanline</h3>
        <p className="text-white/90 text-sm">CRT monitor effect</p>
      </div>
    </div>
  )
}

function ParticleExplosionBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * 360
        const distance = 100
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 bg-orange-400 rounded-full"
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * distance],
              y: [0, Math.sin((angle * Math.PI) / 180) * distance],
              opacity: [1, 0],
              scale: [1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        )
      })}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Particle Explosion</h3>
        <p className="text-white/90 text-sm">Burst effect</p>
      </div>
    </div>
  )
}

function RainbowWaveBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-black">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(${i * 50}, 100%, 50%), transparent)`
          }}
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear"
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Rainbow Wave</h3>
        <p className="text-white/90 text-sm">Flowing spectrum</p>
      </div>
    </div>
  )
}

function HexagonGridBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-900">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 24 }).map((_, i) => {
          const col = i % 6
          const row = Math.floor(i / 6)
          const x = col * 50 + (row % 2) * 25
          const y = row * 40
          return (
            <motion.polygon
              key={i}
              points="25,0 50,15 50,35 25,50 0,35 0,15"
              transform={`translate(${x}, ${y})`}
              fill="none"
              stroke="cyan"
              strokeWidth="2"
              animate={{
                opacity: [0.3, 1, 0.3],
                fill: [`hsl(180, 70%, ${30 + i * 2}%)`, `hsl(180, 70%, ${50 + i * 2}%)`, `hsl(180, 70%, ${30 + i * 2}%)`]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          )
        })}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Hexagon Grid</h3>
        <p className="text-white/90 text-sm">Honeycomb pattern</p>
      </div>
    </div>
  )
}

function TriangleMeshBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i % 6) * 80 + Math.random() * 20
          const y = Math.floor(i / 6) * 60 + Math.random() * 20
          return (
            <motion.polygon
              key={i}
              points={`${x},${y} ${x+40},${y+10} ${x+20},${y+35}`}
              fill="none"
              stroke={`hsl(${220 + i * 5}, 60%, 50%)`}
              strokeWidth="1"
              opacity="0.4"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                strokeWidth: [1, 2, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          )
        })}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Triangle Mesh</h3>
        <p className="text-white/90 text-sm">Geometric network</p>
      </div>
    </div>
  )
}

function DotMatrixBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-indigo-400/40 rounded-full"
          style={{
            left: `${(i % 10) * 10 + 5}%`,
            top: `${Math.floor(i / 10) * 10 + 5}%`
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3 + (i % 7) * 0.3,
            repeat: Infinity,
            delay: (i % 13) * 0.1
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Dot Matrix</h3>
        <p className="text-white/90 text-sm">Subtle pulse grid</p>
      </div>
    </div>
  )
}

function SubtleWavesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-32 opacity-20"
          style={{
            top: `${i * 20}%`,
            background: `linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)`
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Subtle Waves</h3>
        <p className="text-white/90 text-sm">Gentle flow</p>
      </div>
    </div>
  )
}

function CircleRippleBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 border border-teal-500/30 rounded-full"
          style={{
            width: 50 + i * 40,
            height: 50 + i * 40,
            marginLeft: -(25 + i * 20),
            marginTop: -(25 + i * 20)
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.1, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.8
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Circle Ripple</h3>
        <p className="text-white/90 text-sm">Concentric rings</p>
      </div>
    </div>
  )
}

function LinePatternBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.line
            key={i}
            x1="0"
            y1={i * 20}
            x2="100%"
            y2={i * 20}
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
            animate={{
              opacity: [0.1, 0.4, 0.1],
              strokeWidth: [1, 2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Line Pattern</h3>
        <p className="text-white/90 text-sm">Horizontal stripes</p>
      </div>
    </div>
  )
}

function DiagonalLinesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.line
            key={i}
            x1={i * 30 - 50}
            y1="0"
            x2={i * 30 + 250}
            y2="100%"
            stroke={`rgba(96, 165, 250, ${0.1 + (i % 3) * 0.1})`}
            strokeWidth="2"
            animate={{
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Diagonal Lines</h3>
        <p className="text-white/90 text-sm">Slanted pattern</p>
      </div>
    </div>
  )
}

function SquareTilesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950">
      <div className="grid grid-cols-8 grid-rows-8 h-full">
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="border border-slate-700/30"
            animate={{
              backgroundColor: [
                `rgba(59, 130, 246, ${0.05})`,
                `rgba(59, 130, 246, ${0.15})`,
                `rgba(59, 130, 246, ${0.05})`
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: (i % 11) * 0.15
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Square Tiles</h3>
        <p className="text-white/90 text-sm">Grid fade pattern</p>
      </div>
    </div>
  )
}

function ConcentricSquaresBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 border border-emerald-500/20"
          style={{
            width: 50 + i * 30,
            height: 50 + i * 30,
            marginLeft: -(25 + i * 15),
            marginTop: -(25 + i * 15)
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Concentric Squares</h3>
        <p className="text-white/90 text-sm">Rotating frames</p>
      </div>
    </div>
  )
}

function CrosshatchBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <g key={i}>
            <motion.line
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="100%"
              stroke="rgba(168, 85, 247, 0.15)"
              strokeWidth="1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
            />
            <motion.line
              x1="0"
              y1={i * 30}
              x2="100%"
              y2={i * 30}
              stroke="rgba(168, 85, 247, 0.15)"
              strokeWidth="1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
            />
          </g>
        ))}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Crosshatch</h3>
        <p className="text-white/90 text-sm">Grid overlay</p>
      </div>
    </div>
  )
}

function OctagonPatternBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const x = col * 100 + 50
          const y = row * 80 + 40
          return (
            <motion.polygon
              key={i}
              points="20,0 40,0 60,20 60,40 40,60 20,60 0,40 0,20"
              transform={`translate(${x}, ${y})`}
              fill="none"
              stroke={`hsl(${200 + i * 10}, 60%, 50%)`}
              strokeWidth="1.5"
              opacity="0.3"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          )
        })}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Octagon Pattern</h3>
        <p className="text-white/90 text-sm">Geometric tiles</p>
      </div>
    </div>
  )
}

function StarfieldBackground() {
  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5
  }))

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Starfield</h3>
        <p className="text-white/90 text-sm">Twinkling stars</p>
      </div>
    </div>
  )
}

function PlusSignGridBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-950">
      {Array.from({ length: 35 }).map((_, i) => {
        const x = (i % 7) * 14 + 7
        const y = Math.floor(i / 7) * 20 + 10
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <motion.svg width="20" height="20" viewBox="0 0 20 20">
              <motion.path
                d="M10,0 L10,20 M0,10 L20,10"
                stroke="rgba(56, 189, 248, 0.3)"
                strokeWidth="2"
                animate={{
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.08
                }}
              />
            </motion.svg>
          </motion.div>
        )
      })}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Plus Sign Grid</h3>
        <p className="text-white/90 text-sm">Cross pattern</p>
      </div>
    </div>
  )
}

function DiamondPatternBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950">
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => {
          const col = i % 5
          const row = Math.floor(i / 5)
          const x = col * 80 + 40
          const y = row * 60 + 30
          return (
            <motion.polygon
              key={i}
              points={`${x},${y-20} ${x+20},${y} ${x},${y+20} ${x-20},${y}`}
              fill="none"
              stroke={`rgba(147, 197, 253, 0.3)`}
              strokeWidth="1.5"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 45, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          )
        })}
      </svg>
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Diamond Pattern</h3>
        <p className="text-white/90 text-sm">Rhombus grid</p>
      </div>
    </div>
  )
}

function MinimalParticlesBackground() {
  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 to-gray-950">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      <div className="relative z-10 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Minimal Particles</h3>
        <p className="text-white/90 text-sm">Floating specks</p>
      </div>
    </div>
  )
}

export default function DemoBackgrounds() {
  const [activeCategory, setActiveCategory] = useState("animated")
  const [selectedBackground, setSelectedBackground] = useState<{ Component: React.ComponentType, index: number } | null>(null)

  const categories = [
    { id: "animated", name: "Animated Backgrounds", count: 50 },
    { id: "interactive", name: "Interactive Backgrounds", count: 4 },
  ]

  const animatedBackgrounds = [
    AnimatedGradientBackground,
    FloatingParticlesBackground,
    WaveAnimationBackground,
    GeometricPatternBackground,
    LiquidBlobBackground,
    MatrixRainBackground,
    MorphingGradientBackground,
    RotatingShapesBackground,
    FlowingLinesBackground,
    PulsingOrbsBackground,
    AuroraBorealisBackground,
    ConstellationStarsBackground,
    DigitalCircuitBackground,
    LavaLampBackground,
    NorthernLightsCurtainBackground,
    CosmicNebulaBackground,
    ElectricStormBackground,
    HolographicShimmerBackground,
    FiberOpticBackground,
    PlasmaBallBackground,
    QuantumFieldBackground,
    CrystallineFractalBackground,
    BinaryRainBackground,
    WarpSpeedStarsBackground,
    DNAHelixBackground,
    NeonPulseBackground,
    PerlinNoiseBackground,
    GlitchEffectBackground,
    VortexSpiralBackground,
    MosaicTilesBackground,
    ScanlineBackground,
    ParticleExplosionBackground,
    RainbowWaveBackground,
    HexagonGridBackground,
    TriangleMeshBackground,
    DotMatrixBackground,
    SubtleWavesBackground,
    CircleRippleBackground,
    LinePatternBackground,
    DiagonalLinesBackground,
    SquareTilesBackground,
    ConcentricSquaresBackground,
    CrosshatchBackground,
    OctagonPatternBackground,
    StarfieldBackground,
    PlusSignGridBackground,
    DiamondPatternBackground,
    MinimalParticlesBackground
  ]

  const interactiveBackgrounds = [
    InteractiveGradientBackground,
    RippleEffectBackground,
    MagneticAttractionBackground,
    DynamicLightingBackground
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Background Animations
          </h1>
          <p className="text-xl text-gray-300 mb-6">54 Different Background Animation Effects with AI Implementation Prompts</p>
          <p className="text-sm text-gray-400">Explore animated and interactive background patterns • Click any card for larger preview</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/50"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.name}
              <span className="ml-2 text-sm opacity-75">({cat.count})</span>
            </motion.button>
          ))}
        </div>

        {/* Background Grid */}
        <div className="grid grid-cols-4 gap-6 min-w-0">
          {activeCategory === "animated" && animatedBackgrounds.map((BackgroundComponent, index) => (
            <div
              key={index}
              onClick={() => setSelectedBackground({ Component: BackgroundComponent, index })}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <BackgroundComponent />
            </div>
          ))}
          {activeCategory === "interactive" && interactiveBackgrounds.map((BackgroundComponent, index) => (
            <div
              key={index}
              onClick={() => setSelectedBackground({ Component: BackgroundComponent, index })}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <BackgroundComponent />
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Showing: {categories.find(c => c.id === activeCategory)?.name}</h2>
            <p className="text-gray-300 mb-2">Each background includes an AI prompt for implementation</p>
            <p className="text-gray-400 text-sm">Click any card to view in fullscreen • Click "AI Prompt" to copy implementation instructions</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedBackground && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8"
          onClick={() => setSelectedBackground(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-6xl h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBackground(null)}
              className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              ×
            </button>
            <div className="w-full h-full">
              <selectedBackground.Component />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
