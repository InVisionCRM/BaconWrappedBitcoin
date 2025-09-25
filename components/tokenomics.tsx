"use client"

import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import React from "react"

export function Tokenomics() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  // Slide in from right then out to left (and mirrored for left pig)
  const xRight = useTransform(scrollYProgress, [0, 0.5, 1], ["30vw", "0vw", "-30vw"])
  const xLeft = useTransform(scrollYProgress, [0, 0.5, 1], ["-30vw", "0vw", "30vw"])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section id="tokenomics" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black text-white scroll-mt-24">
      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Right pig background */}
          <motion.div style={{ x: xRight, opacity }} className="absolute right-0 top-1/2 -translate-y-1/2 w-[65vw] max-w-[720px]">
            <Image src="/pigright.png" alt="Pig right" width={720} height={360} className="w-full h-auto object-contain" priority />
          </motion.div>
          {/* Left pig foreground */}
          <motion.div style={{ x: xLeft, opacity }} className="absolute left-0 top-1/2 -translate-y-1/2 w-[65vw] max-w-[720px]">
            <Image src="/pigleft.png" alt="Pig left" width={720} height={360} className="w-full h-auto object-contain" priority />
          </motion.div>
        </div>

        <div className="relative text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Tokenomics</h2>
          <p className="mx-auto max-w-2xl text-white/80">
            A delightfully simple breakdown. Supply and allocations will be announced with the contract.
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/60">Total Supply</div>
              <div className="text-xl font-semibold">TBA</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/60">Liquidity</div>
              <div className="text-xl font-semibold">TBA</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white/60">Community</div>
              <div className="text-xl font-semibold">TBA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
