"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export type AnimationType =
  | "spiral-in"
  | "flip-cascade"
  | "origami-unfold"
  | "liquid-rise"
  | "quantum-shift"
  | "kaleidoscope"
  | "gravity-pull"
  | "magnetic-snap"
  | "portal-emerge"
  | "fractal-expand"
  | "wave-crash"
  | "eclipse-reveal"
  | "vortex-spin"
  | "bounce-settle"
  | "curtain-raise"
  | "puzzle-assemble"
  | "ribbon-unfurl"
  | "accordion-expand"
  | "domino-fall"
  | "smoke-disperse"
  | "shatter-reform"
  | "bubble-float"
  | "typewriter-build"
  | "carousel-rotate"
  | "pendulum-swing"

interface ParallaxCardProps {
  title: string
  description: string
  animationType: AnimationType
  index: number
  gradient?: string
  image?: string
}

export function ParallaxCard({
  title,
  description,
  animationType,
  index,
  gradient = "from-orange-500/20 to-pink-500/20",
  image
}: ParallaxCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Card enters from bottom, exits at top
  })

  // Get animation-specific transforms based on scroll progress
  // 0 = card entering viewport from bottom
  // 0.5 = card centered in viewport (resting state)
  // 1 = card exiting viewport at top
  const getAnimationTransforms = () => {
    switch (animationType) {
      case "spiral-in": {
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-180, 0, 180])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-50%", "0%", "50%"])
        return { rotate, scale, opacity, x }
      }

      case "flip-cascade": {
        const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -90])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { rotateY, opacity }
      }

      case "origami-unfold": {
        const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1])
        const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-90, 0, 90])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scaleX, scaleY, rotateX, opacity }
      }

      case "liquid-rise": {
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"])
        const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { y, scaleY, opacity }
      }

      case "quantum-shift": {
        const x = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.45, 0.5, 1], ["0%", "30%", "-15%", "10%", "0%", "50%"])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { x, scale, opacity }
      }

      case "kaleidoscope": {
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [360, 0, -360])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const x = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "0%", "100%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { rotate, scale, x, y, opacity }
      }

      case "gravity-pull": {
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["-150%", "0%", "150%"])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { y, rotate, scale, opacity }
      }

      case "magnetic-snap": {
        const x = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], ["-200%", "-5%", "0%", "5%", "200%"])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { x, rotate, opacity }
      }

      case "portal-emerge": {
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [180, 0, -180])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scale, rotate, opacity }
      }

      case "fractal-expand": {
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 2])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-45, 0, 45])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scale, rotate, opacity }
      }

      case "wave-crash": {
        const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-150%", "0%", "150%"])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "0%", "-50%"])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { x, y, rotate, scale, opacity }
      }

      case "eclipse-reveal": {
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 1.5])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scale, opacity }
      }

      case "vortex-spin": {
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 720, 1440])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const x = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["-100%", "0%", "100%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { rotate, scale, x, y, opacity }
      }

      case "bounce-settle": {
        const y = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], ["-200%", "5%", "0%", "5%", "200%"])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { y, scale, opacity }
      }

      case "curtain-raise": {
        const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scaleY, opacity, transformOrigin: "bottom" as const }
      }

      case "puzzle-assemble": {
        const x = useTransform(scrollYProgress, [0, 0.5, 1],
          index % 2 === 0 ? ["-100%", "0%", "100%"] : ["100%", "0%", "-100%"])
        const y = useTransform(scrollYProgress, [0, 0.5, 1],
          index % 3 === 0 ? ["-50%", "0%", "50%"] : ["50%", "0%", "-50%"])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index * 15, 0, -index * 15])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { x, y, rotate, opacity }
      }

      case "ribbon-unfurl": {
        const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -90])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scaleX, rotateY, opacity, transformOrigin: "left" as const }
      }

      case "accordion-expand": {
        const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["-25%", "0%", "25%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scaleY, y, opacity }
      }

      case "domino-fall": {
        const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -90])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["-50%", "0%", "50%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { rotateX, y, opacity, transformOrigin: "bottom" as const }
      }

      case "smoke-disperse": {
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [2, 1, 2])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "0%", "-50%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scale, y, opacity }
      }

      case "shatter-reform": {
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [180, 0, -180])
        const x = useTransform(scrollYProgress, [0, 0.5, 1],
          index % 2 === 0 ? ["-50%", "0%", "50%"] : ["50%", "0%", "-50%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scale, rotate, x, opacity }
      }

      case "bubble-float": {
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["150%", "0%", "-150%"])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { y, scale, rotate, opacity }
      }

      case "typewriter-build": {
        const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { scaleX, opacity, transformOrigin: "left" as const }
      }

      case "carousel-rotate": {
        const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [180, 0, -180])
        const x = useTransform(scrollYProgress, [0, 0.5, 1], ["150%", "0%", "-150%"])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { rotateY, x, scale, opacity }
      }

      case "pendulum-swing": {
        const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45])
        const y = useTransform(scrollYProgress, [0, 0.5, 1], ["-50%", "0%", "50%"])
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        return { rotate, y, opacity, transformOrigin: "top" as const }
      }

      default: {
        const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
        return { opacity, scale }
      }
    }
  }

  const transforms = getAnimationTransforms()

  return (
    <div ref={containerRef} className="relative h-[200vh] flex items-center justify-center px-4">
      <div className="sticky top-1/2 -translate-y-1/2 w-full flex items-center justify-center">
        <motion.div
          className={`relative w-full max-w-3xl rounded-3xl bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden`}
          style={{ ...transforms, perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {/* Background Image */}
          {image && (
            <div className="absolute inset-0 opacity-30">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

          <div className="relative z-10 p-12 min-h-[400px] flex flex-col justify-center">
            <h2 className="text-5xl font-bold text-white mb-6">{title}</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-6">{description}</p>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-mono">
                {animationType}
              </div>
              <div className="px-4 py-2 bg-orange-500/30 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                Card {index + 1}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  )
}
