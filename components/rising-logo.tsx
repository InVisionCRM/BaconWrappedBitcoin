"use client"

import React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { GridPattern } from "@/components/ui/grid-pattern"

export function RisingLogo() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  })

  // Fade in/out effect based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.5, 1], [0, 1, 1, 0])
  
  // Optional: Add a subtle scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.5, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="rising-logo" className="relative bg-black py-[200px] px-4 sm:px-6 lg:px-8">
      <GridPattern className="opacity-40 z-0 absolute inset-0 w-full h-full" />
      <div ref={ref} className="relative max-w-7xl mx-auto flex justify-center items-center">
        <motion.div 
          style={{ opacity, scale }}
          className="relative"
        >
          <Image
            src="/bacon-wrapped-bitcoin.jpg"
            alt="Bacon Wrapped Bitcoin Logo"
            width={600}
            height={450}
            className="w-[600px] h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  )
}
