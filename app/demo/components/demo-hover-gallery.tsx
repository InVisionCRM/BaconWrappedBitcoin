"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

const hoverEffects = [
  {
    id: 1,
    name: "Scale & Glow",
    description: "Image scales up with orange glow on hover",
    prompt: "Add a hover effect to my image that scales it to 1.1x and adds an orange glow shadow (0 0 30px rgba(255, 107, 53, 0.6)) when the user hovers over it. Use framer-motion for smooth transitions with 0.3s duration.",
    component: ({ src, title }: any) => {
      const [isHovered, setIsHovered] = useState(false)
      return (
        <motion.div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={src} alt={title} fill className="object-cover" />
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ boxShadow: "0 0 30px rgba(255, 107, 53, 0.6)" }}
            />
          )}
        </motion.div>
      )
    }
  },
  {
    id: 2,
    name: "Tilt 3D",
    description: "Card tilts in 3D based on mouse position",
    prompt: "Create a 3D tilt effect where the card rotates based on mouse position within the element. Calculate rotateX and rotateY based on mouse coordinates relative to the card center, with max rotation of ±15 degrees. Add perspective: 1000px to parent.",
    component: ({ src, title }: any) => {
      const [rotation, setRotation] = useState({ x: 0, y: 0 })
      return (
        <motion.div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          style={{ perspective: "1000px" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientY - rect.top - rect.height / 2) / 10
            const y = (e.clientX - rect.left - rect.width / 2) / 10
            setRotation({ x: -x, y })
          }}
          onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        >
          <motion.div
            className="w-full h-full"
            animate={{ rotateX: rotation.x, rotateY: rotation.y }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image src={src} alt={title} fill className="object-cover" />
          </motion.div>
        </motion.div>
      )
    }
  },
  {
    id: 3,
    name: "Overlay Slide Up",
    description: "Text overlay slides up from bottom on hover",
    prompt: "Add an overlay that slides up from the bottom on hover. Create a gradient overlay (bg-gradient-to-t from-black/90 to-transparent) that starts at translateY(100%) and animates to translateY(0) on hover with 0.3s ease-in-out transition.",
    component: ({ src, title }: any) => {
      const [isHovered, setIsHovered] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image src={src} alt={title} fill className="object-cover" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6"
            initial={{ y: "100%" }}
            animate={{ y: isHovered ? 0 : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text-white text-2xl font-bold">{title}</h3>
          </motion.div>
        </div>
      )
    }
  },
  {
    id: 4,
    name: "Border Spin",
    description: "Animated border rotates around image",
    prompt: "Create a rotating border effect using a pseudo-element or separate div with conic-gradient. Animate rotation from 0deg to 360deg infinitely with 3s duration. Use border-radius to match the image corners.",
    component: ({ src, title }: any) => (
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: "conic-gradient(from 0deg, #ff6b35, #f7931e, #ff6b35)",
            padding: "3px"
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden">
            <Image src={src} alt={title} fill className="object-cover" />
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 5,
    name: "Zoom Blur",
    description: "Image zooms and blurs on hover",
    prompt: "Add a zoom and blur effect on hover. Scale the image to 1.2x and add filter: blur(4px) using framer-motion. Transition duration should be 0.4s with ease-out timing.",
    component: ({ src, title }: any) => (
      <motion.div className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.2, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image src={src} alt={title} fill className="object-cover" />
        </motion.div>
      </motion.div>
    )
  },
  {
    id: 6,
    name: "Flip Card",
    description: "Card flips 180° to reveal back content",
    prompt: "Create a flip card effect using rotateY transformation. On click/hover, animate from rotateY(0deg) to rotateY(180deg). Use transformStyle: 'preserve-3d' on parent and backfaceVisibility: 'hidden' on front/back faces.",
    component: ({ src, title }: any) => {
      const [isFlipped, setIsFlipped] = useState(false)
      return (
        <div
          className="relative w-full h-64 cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
              <Image src={src} alt={title} fill className="object-cover" />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <p className="text-white text-2xl font-bold">{title}</p>
            </div>
          </motion.div>
        </div>
      )
    }
  },
  {
    id: 7,
    name: "Color Shift",
    description: "Image shifts through color filters on hover",
    prompt: "Add a color shift effect using CSS filters. On hover, animate through hue-rotate(0deg) to hue-rotate(90deg) with 0.5s duration. Combine with brightness(1.1) for enhanced effect.",
    component: ({ src, title }: any) => (
      <motion.div
        className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ filter: "hue-rotate(90deg) brightness(1.1)" }}
        transition={{ duration: 0.5 }}
      >
        <Image src={src} alt={title} fill className="object-cover" />
      </motion.div>
    )
  },
  {
    id: 8,
    name: "Corner Peel",
    description: "Corner of image peels back to reveal content",
    prompt: "Create a corner peel effect using clip-path or transform-origin. Animate a triangular corner from top-right that rotates on Y-axis to reveal underlying content. Use gradient shadows for depth.",
    component: ({ src, title }: any) => {
      const [isPeeled, setIsPeeled] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsPeeled(true)}
          onMouseLeave={() => setIsPeeled(false)}
        >
          <Image src={src} alt={title} fill className="object-cover" />
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-orange-500 origin-top-right"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 100% 0)" }}
            animate={{ rotateY: isPeeled ? -120 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )
    }
  },
  {
    id: 9,
    name: "Glitch Effect",
    description: "Image glitches with RGB split on hover",
    prompt: "Create a glitch effect by duplicating the image 3 times with different blend modes (mix-blend-mode). Apply small random translateX/Y offsets to red, green, and blue channels on hover. Animate with rapid transitions.",
    component: ({ src, title }: any) => {
      const [isGlitching, setIsGlitching] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsGlitching(true)}
          onMouseLeave={() => setIsGlitching(false)}
        >
          <div className="absolute inset-0">
            <Image src={src} alt={title} fill className="object-cover" />
          </div>
          {isGlitching && (
            <>
              <motion.div
                className="absolute inset-0 opacity-50"
                animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                style={{ mixBlendMode: "screen" }}
              >
                <Image src={src} alt={title} fill className="object-cover" style={{ filter: "hue-rotate(90deg)" }} />
              </motion.div>
            </>
          )}
        </div>
      )
    }
  },
  {
    id: 10,
    name: "Ripple Effect",
    description: "Circular ripple emanates from hover point",
    prompt: "Create a ripple effect by spawning circular divs at mouse position that scale from 0 to 2x and fade out. Use absolute positioning, border-radius: 50%, and animate scale + opacity over 0.6s.",
    component: ({ src, title }: any) => {
      const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setRipples([...ripples, { x, y, id: Date.now() }])
            setTimeout(() => setRipples((r) => r.slice(1)), 600)
          }}
        >
          <Image src={src} alt={title} fill className="object-cover" />
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute w-20 h-20 border-2 border-orange-500 rounded-full pointer-events-none"
              style={{ left: ripple.x - 40, top: ripple.y - 40 }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </div>
      )
    }
  },
  {
    id: 11,
    name: "Magnetic Pull",
    description: "Image follows cursor with magnetic effect",
    prompt: "Make the image follow the cursor with a magnetic effect. Calculate the distance between cursor and image center, then apply translateX/Y proportional to distance (divide by 20 for smoothness). Use spring animation for natural movement.",
    component: ({ src, title }: any) => {
      const [position, setPosition] = useState({ x: 0, y: 0 })
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left - rect.width / 2) / 20
            const y = (e.clientY - rect.top - rect.height / 2) / 20
            setPosition({ x, y })
          }}
          onMouseLeave={() => setPosition({ x: 0, y: 0 })}
        >
          <motion.div
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <Image src={src} alt={title} fill className="object-cover" />
          </motion.div>
        </div>
      )
    }
  },
  {
    id: 12,
    name: "Shatter Glass",
    description: "Image shatters into pieces on click",
    prompt: "Create a shatter effect by dividing the image into a grid of smaller pieces. On click, animate each piece with random translateX/Y/rotate values and opacity to 0. Use different delays for cascading effect.",
    component: ({ src, title }: any) => {
      const [isShattered, setIsShattered] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer bg-gray-900"
          onClick={() => setIsShattered(!isShattered)}
        >
          <div className="grid grid-cols-4 grid-rows-4 w-full h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={
                  isShattered
                    ? {
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        rotate: Math.random() * 360,
                        opacity: 0
                      }
                    : { x: 0, y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.8, delay: i * 0.03 }}
              >
                <Image src={src} alt={title} fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  },
  {
    id: 13,
    name: "Neon Glow Pulse",
    description: "Pulsing neon border on hover",
    prompt: "Add a pulsing neon glow effect. Create an animated box-shadow that pulses between two intensities: '0 0 20px rgba(255,107,53,0.5)' and '0 0 40px rgba(255,107,53,1)'. Animate with 1.5s duration and infinite repeat.",
    component: ({ src, title }: any) => (
      <motion.div
        className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
        whileHover={{
          boxShadow: [
            "0 0 20px rgba(255,107,53,0.5)",
            "0 0 40px rgba(255,107,53,1)",
            "0 0 20px rgba(255,107,53,0.5)"
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Image src={src} alt={title} fill className="object-cover" />
      </motion.div>
    )
  },
  {
    id: 14,
    name: "Kaleidoscope",
    description: "Image rotates in kaleidoscope pattern",
    prompt: "Create a kaleidoscope effect by duplicating the image 8 times in a circular pattern. Each copy should be rotated by 45deg increments around a center point. Animate rotation on hover with different speeds.",
    component: ({ src, title }: any) => {
      const [isRotating, setIsRotating] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsRotating(true)}
          onMouseLeave={() => setIsRotating(false)}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 origin-center opacity-30"
              animate={{ rotate: isRotating ? 360 + i * 45 : i * 45 }}
              transition={{ duration: 2, ease: "linear" }}
            >
              <Image src={src} alt={title} fill className="object-cover" />
            </motion.div>
          ))}
        </div>
      )
    }
  },
  {
    id: 15,
    name: "Liquid Distort",
    description: "Image warps like liquid on hover",
    prompt: "Create a liquid distortion effect using CSS filter: url(#turbulence). Define an SVG filter with feTurbulence and animate the baseFrequency attribute on hover from 0 to 0.02 for a wavy effect.",
    component: ({ src, title }: any) => (
      <motion.div
        className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ filter: "url(#liquid)" }}
      >
        <svg className="absolute w-0 h-0">
          <filter id="liquid">
            <feTurbulence baseFrequency="0.02" numOctaves="3" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" />
          </filter>
        </svg>
        <Image src={src} alt={title} fill className="object-cover" />
      </motion.div>
    )
  },
  {
    id: 16,
    name: "Particle Reveal",
    description: "Image reveals through particles",
    prompt: "Create a particle reveal effect where small circles or squares appear randomly across the image on hover, eventually revealing it fully. Spawn 50+ particles at random positions with staggered delays.",
    component: ({ src, title }: any) => {
      const [reveal, setReveal] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer bg-gray-900"
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
        >
          <motion.div animate={{ opacity: reveal ? 1 : 0 }} transition={{ duration: 0.6 }}>
            <Image src={src} alt={title} fill className="object-cover" />
          </motion.div>
          {reveal &&
            Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-orange-500 rounded-full"
                initial={{ scale: 0, x: "50%", y: "50%" }}
                animate={{
                  scale: 1,
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
                }}
                transition={{ delay: i * 0.02, duration: 0.4 }}
              />
            ))}
        </div>
      )
    }
  },
  {
    id: 17,
    name: "Holographic",
    description: "Rainbow holographic shimmer effect",
    prompt: "Create a holographic effect using a linear-gradient overlay that moves across the image. Animate background-position from 0% to 200% with a rainbow gradient (red, yellow, green, cyan, blue, magenta). Set mix-blend-mode to overlay.",
    component: ({ src, title }: any) => (
      <div className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer">
        <Image src={src} alt={title} fill className="object-cover" />
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, red, yellow, green, cyan, blue, magenta, red)",
            backgroundSize: "200% 100%",
            mixBlendMode: "overlay",
            opacity: 0.6
          }}
        />
      </div>
    )
  },
  {
    id: 18,
    name: "Zoom Corners",
    description: "Corners zoom out revealing content",
    prompt: "Create an effect where all 4 corners zoom outward on hover using clip-path. Animate from clip-path: inset(0) to clip-path: inset(-20px). Combine with scale transformation for enhanced effect.",
    component: ({ src, title }: any) => (
      <motion.div
        className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ clipPath: "inset(-20px)", scale: 1.1 }}
        transition={{ duration: 0.4 }}
        style={{ clipPath: "inset(0)" }}
      >
        <Image src={src} alt={title} fill className="object-cover" />
      </motion.div>
    )
  },
  {
    id: 19,
    name: "Stack Layers",
    description: "Multiple layers separate on hover",
    prompt: "Create a stack effect with 3 layers of the same image. On hover, separate each layer with different translateZ values (50px, 100px, 150px) and slight translateX/Y offsets for a 3D stack effect. Requires perspective on parent.",
    component: ({ src, title }: any) => {
      const [isHovered, setIsHovered] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          style={{ perspective: "1000px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={
                isHovered
                  ? { z: i * 50, x: i * 10, y: i * 10, opacity: 1 - i * 0.2 }
                  : { z: 0, x: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.4 }}
            >
              <Image src={src} alt={title} fill className="object-cover" />
            </motion.div>
          ))}
        </div>
      )
    }
  },
  {
    id: 20,
    name: "Vignette Expand",
    description: "Dark vignette expands from center",
    prompt: "Create a vignette effect that expands on hover. Use radial-gradient for the vignette overlay and animate the gradient size from 40% to 100%. Position should be at mouse coordinates for interactive effect.",
    component: ({ src, title }: any) => {
      const [vignetteSize, setVignetteSize] = useState(40)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setVignetteSize(100)}
          onMouseLeave={() => setVignetteSize(40)}
        >
          <Image src={src} alt={title} fill className="object-cover" />
          <motion.div
            className="absolute inset-0"
            animate={{
              background: `radial-gradient(circle at center, transparent ${vignetteSize}%, rgba(0,0,0,0.8) 100%)`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )
    }
  },
  {
    id: 21,
    name: "Slice Reveal",
    description: "Image reveals in vertical slices",
    prompt: "Divide image into 10 vertical slices using a grid or clip-path. On hover, stagger animate each slice from scaleX(0) to scaleX(1) with increasing delays. Use transform-origin: left for left-to-right reveal.",
    component: ({ src, title }: any) => {
      const [reveal, setReveal] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
        >
          <div className="flex h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="relative flex-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: reveal ? 1 : 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              >
                <Image src={src} alt={title} fill className="object-cover" style={{ objectPosition: `${i * 11}% 0` }} />
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  },
  {
    id: 22,
    name: "Chromatic Aberration",
    description: "RGB color channels split on hover",
    prompt: "Create chromatic aberration by layering 3 versions of the image with different filter colors (red, green, blue). On hover, offset each layer slightly in different directions (±5px). Use mix-blend-mode: screen for proper color mixing.",
    component: ({ src, title }: any) => {
      const [isHovered, setIsHovered] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: isHovered ? -5 : 0 }}
            style={{ mixBlendMode: "screen" }}
          >
            <Image src={src} alt={title} fill className="object-cover" style={{ filter: "sepia(1) hue-rotate(320deg)" }} />
          </motion.div>
          <motion.div className="absolute inset-0" animate={{ x: isHovered ? 0 : 0 }} style={{ mixBlendMode: "screen" }}>
            <Image src={src} alt={title} fill className="object-cover" style={{ filter: "sepia(1) hue-rotate(100deg)" }} />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ x: isHovered ? 5 : 0 }}
            style={{ mixBlendMode: "screen" }}
          >
            <Image src={src} alt={title} fill className="object-cover" style={{ filter: "sepia(1) hue-rotate(200deg)" }} />
          </motion.div>
        </div>
      )
    }
  },
  {
    id: 23,
    name: "Pixelate Transition",
    description: "Image pixelates then sharpens",
    prompt: "Create a pixelation effect using CSS filter or image-rendering. On hover, animate from filter: blur(0px) to blur(10px) then back to blur(0px), combined with image-rendering: pixelated. Duration should be 0.8s.",
    component: ({ src, title }: any) => {
      const [isPixelated, setIsPixelated] = useState(false)
      return (
        <motion.div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsPixelated(true)}
          onMouseLeave={() => setIsPixelated(false)}
          animate={{ filter: isPixelated ? ["blur(0px)", "blur(10px)", "blur(0px)"] : "blur(0px)" }}
          transition={{ duration: 0.8 }}
        >
          <Image src={src} alt={title} fill className="object-cover" />
        </motion.div>
      )
    }
  },
  {
    id: 24,
    name: "Spiral Zoom",
    description: "Image zooms while rotating in spiral",
    prompt: "Combine zoom and rotation for a spiral effect. On hover, animate both scale (1 to 1.5) and rotate (0deg to 360deg) simultaneously over 0.6s. Add slight blur for depth perception.",
    component: ({ src, title }: any) => (
      <motion.div
        className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.5, rotate: 360, filter: "blur(2px)" }}
        transition={{ duration: 0.6 }}
      >
        <Image src={src} alt={title} fill className="object-cover" />
      </motion.div>
    )
  },
  {
    id: 25,
    name: "Mosaic Shatter",
    description: "Image breaks into mosaic pieces",
    prompt: "Create a mosaic shatter by dividing image into a 6x6 grid of squares. On click, animate each square with random rotation (0-360deg), scale (0.5-1.5), and slight translation. Use different easing for organic feel.",
    component: ({ src, title }: any) => {
      const [isShattered, setIsShattered] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer bg-gray-900"
          onClick={() => setIsShattered(!isShattered)}
        >
          <div className="grid grid-cols-6 grid-rows-6 w-full h-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={
                  isShattered
                    ? {
                        rotate: Math.random() * 360,
                        scale: 0.5 + Math.random(),
                        x: (Math.random() - 0.5) * 50,
                        y: (Math.random() - 0.5) * 50
                      }
                    : { rotate: 0, scale: 1, x: 0, y: 0 }
                }
                transition={{ duration: 0.6, delay: i * 0.01, ease: "easeOut" }}
              >
                <Image src={src} alt={title} fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  },
  {
    id: 26,
    name: "Wave Distortion",
    description: "Sine wave ripples across image",
    prompt: "Create a wave distortion using transform: skewY() that propagates across the image. Divide into horizontal strips and apply skewY with sine wave pattern based on time and strip position. Animate continuously.",
    component: ({ src, title }: any) => (
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="relative h-[5%]"
            animate={{ skewY: [0, 5, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover"
                style={{ objectPosition: `0 ${i * 5}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  },
  {
    id: 27,
    name: "Ink Blot Reveal",
    description: "Image reveals like spreading ink",
    prompt: "Create an ink blot reveal using clip-path with a custom SVG path that resembles an organic ink shape. Animate the path to expand from center on hover. Start with a small circle and morph to full size.",
    component: ({ src, title }: any) => {
      const [reveal, setReveal] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setReveal(true)}
          onMouseLeave={() => setReveal(false)}
        >
          <motion.div
            animate={{
              clipPath: reveal
                ? "circle(150% at 50% 50%)"
                : "circle(0% at 50% 50%)"
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image src={src} alt={title} fill className="object-cover" />
          </motion.div>
        </div>
      )
    }
  },
  {
    id: 28,
    name: "Split Slide",
    description: "Image splits and slides apart",
    prompt: "Split the image vertically into left and right halves. On hover, slide left half to the left and right half to the right using translateX. Add a gradient overlay in the gap for enhanced effect.",
    component: ({ src, title }: any) => {
      const [isSplit, setIsSplit] = useState(false)
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsSplit(true)}
          onMouseLeave={() => setIsSplit(false)}
        >
          <motion.div
            className="absolute inset-0 w-1/2 left-0"
            animate={{ x: isSplit ? -50 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image src={src} alt={title} fill className="object-cover" style={{ objectPosition: "left" }} />
          </motion.div>
          <motion.div
            className="absolute inset-0 w-1/2 right-0"
            animate={{ x: isSplit ? 50 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image src={src} alt={title} fill className="object-cover" style={{ objectPosition: "right" }} />
          </motion.div>
        </div>
      )
    }
  }
]

const images = [
  { src: "/bacon-wrapped-bitcoin.jpg", title: "Bacon Wrapped Bitcoin" },
  { src: "/artcoin1.png", title: "Art Coin 1" },
  { src: "/artcoin2.png", title: "Art Coin 2" },
  { src: "/artcoin3.png", title: "Art Coin 3" },
  { src: "/Baco.jpg", title: "Baco" }
]

export default function DemoHoverGallery() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyPrompt = (prompt: string, id: number) => {
    navigator.clipboard.writeText(prompt)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Hover Gallery Effects
          </h1>
          <p className="text-xl text-gray-400 mb-2">28 Interactive Hover Effects with AI Implementation Prompts</p>
          <p className="text-sm text-gray-500">Click the copy button to get the AI prompt for each effect</p>
        </div>

        <div className="grid grid-cols-2 gap-8 min-w-0">
          {hoverEffects.map((effect, index) => (
            <div key={effect.id} className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-bold text-lg">#{effect.id}</span>
                  <h3 className="text-xl font-bold text-white">{effect.name}</h3>
                </div>
                <motion.button
                  onClick={() => copyPrompt(effect.prompt, effect.id)}
                  className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/40 text-orange-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedId === effect.id ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy AI Prompt
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-gray-400 text-sm mb-4">{effect.description}</p>
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
                {effect.component({ src: images[index % images.length].src, title: images[index % images.length].title })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
