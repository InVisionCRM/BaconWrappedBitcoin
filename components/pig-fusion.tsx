"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

export function PigFusionSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getProgress = () => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const start = rect.top + scrollY - windowHeight
    const end = rect.top + scrollY + rect.height
    const progress = (scrollY - start) / (end - start)
    return Math.max(0, Math.min(1, progress))
  }

  const progress = getProgress()

  return (
    <section id="pig-fusion" className="relative bg-black py-24 px-0">
      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Title and Description */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 zilla-slab-highlight-bold">
            Superior NASA like Technology
          </h2>
          <div className="max-w-2xl mx-auto">
            <TypewriterEffect
              words={[
                { text: "Someone", className: "text-white/80 text-lg" },
                { text: "from", className: "text-white/80 text-lg" },
                { text: "NASA", className: "text-white/80 text-lg" },
                { text: "said", className: "text-white/80 text-lg" },
                { text: "we", className: "text-white/80 text-lg" },
                { text: "have", className: "text-white/80 text-lg" },
                { text: "the", className: "text-white/80 text-lg" },
                { text: "most", className: "text-white/80 text-lg" },
                { text: "innovative", className: "text-white/80 text-lg" },
                { text: "crypto", className: "text-white/80 text-lg" },
                { text: "technology", className: "text-white/80 text-lg" },
                { text: "on", className: "text-white/80 text-lg" },
                { text: "the", className: "text-white/80 text-lg" },
                { text: "planet!", className: "text-white/80 text-lg" }
              ]}
              className="text-center"
              cursorClassName="bg-white/80"
            />
          </div>
        </div>

        {/* Animated Pigs and Video */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          {/* Left Pig - slides in from left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] overflow-hidden">
            <motion.div
              style={{
                transform: `translateX(${(1 - progress) * -100}%)`,
                opacity: progress,
              }}
            >
              <Image 
                src="/pigleft.png" 
                alt="Pig left" 
                width={300} 
                height={300} 
                className="w-full h-auto object-contain" 
              />
            </motion.div>
          </div>

          {/* Right Pig - slides in from right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[250px] overflow-hidden">
            <motion.div
              style={{
                transform: `translateX(${(1 - progress) * 100}%)`,
                opacity: progress,
              }}
            >
              <Image 
                src="/pigright.png" 
                alt="Pig right" 
                width={300} 
                height={300} 
                className="w-full h-auto object-contain" 
              />
            </motion.div>
          </div>

          {/* Video - slides up from bottom */}
          <motion.div
            className="relative z-10"
            style={{
              transform: `translateY(${(1 - progress) * 100}%)`,
              opacity: progress,
            }}
          >
            <div className="w-[220px] sm:w-[260px] md:w-[320px] overflow-hidden rounded-xl shadow-2xl">
              <video
                src="/btcfusiontubeloop.mp4"
                className="h-auto w-full"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


