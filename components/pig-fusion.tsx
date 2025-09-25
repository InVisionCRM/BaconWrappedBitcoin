"use client"

import React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

export function PigFusionSection() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const xRight = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0.5, 0.5])

  return (
    <section id="pig-fusion" className="relative bg-black py-24 px-0">
      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Animated pig backgrounds (above video) */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[76vw] max-w-[850px] sm:w-[50vw] sm:max-w-[567px] overflow-hidden">
            <motion.div style={{ x: xRight, opacity }}>
              <Image src="/pigright.png" alt="Pig right" width={720} height={360} className="w-full h-auto object-contain" />
            </motion.div>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[76vw] max-w-[850px] sm:w-[50vw] sm:max-w-[567px] overflow-hidden">
            <motion.div style={{ x: xLeft, opacity }}>
              <Image src="/pigleft.png" alt="Pig left" width={720} height={360} className="w-full h-auto object-contain" />
            </motion.div>
          </div>
        </div>

        {/* Video */}
        <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-center">
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
        </div>
      </div>
    </section>
  )
}


