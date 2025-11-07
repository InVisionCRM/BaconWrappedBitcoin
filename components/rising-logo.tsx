"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

export function RisingLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const slats = Array.from({ length: 12 }, (_, i) => i)


  return (
    <>
      {/* First Accordion - Bitcoin Coins */}
      <section id="rising-logo" className="relative h-[400vh] bg-black">
        <div ref={containerRef} className="relative h-full">
          <motion.div 
            className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" 
            style={{ 
              perspective: "1000px",
              opacity: useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
            }}
          >
            {/* Background - Bacon Wrapped Bitcoin (revealed when blinds open) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image src="/accordian2.png" alt="Bacon Wrapped Bitcoin Revealed" fill className="object-contain" />
              </div>
            </div>

            {/* Slats with Bitcoin Coin - split across accordion slats */}
            <div className="absolute inset-0 flex flex-col">
              {slats.map((index) => {
                // Each slat gets 8.33% of scroll (100% / 12 slats), flips one at a time
                const startProgress = index * 0.0833
                const endProgress = (index + 1) * 0.0833
                const rotateX = useTransform(scrollYProgress, [startProgress, endProgress], [0, 90])
                const slatHeight = 100 / slats.length

                return (
                  <motion.div
                    key={index}
                    className="flex-1 relative overflow-hidden"
                    style={{ rotateX, transformOrigin: "top", transformStyle: "preserve-3d" }}
                  >
                    {/* Slat showing horizontal slice of Bitcoin Coin */}
                    <div className="absolute inset-0 bg-black overflow-hidden">
                      {/* Position the full image and show only this slat's slice */}
                      <div
                        className="absolute left-1/2 top-0 w-screen h-screen flex items-center justify-center"
                        style={{
                          transform: `translate(-50%, ${-index * slatHeight}%)`,
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src="/accordian1.png"
                            alt="Bitcoin Coin"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      {/* Slat border */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}
