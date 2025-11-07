"use client"

import React, { useRef } from "react"
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel"
import { LinkPreview } from "@/components/ui/link-preview"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

// Accordion Fold-Out Parallax Component
function AccordionFoldOutParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const panels = Array.from({ length: 6 }, (_, i) => ({
    src: `/artcoin${(i % 6) + 1}.png`,
    direction: i % 2 === 0 ? 1 : -1
  }))

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" style={{ perspective: "1200px" }}>
        {/* Fading "How To Buy" text in center with zoom effect */}
        <motion.div 
          className="absolute z-30 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.695, 0.85], [0, 0.9]),
            scale: useTransform(scrollYProgress, [0.695, 0.85], [0.5, 1])
          }}
        >
          <h2 className="text-6xl md:text-8xl font-bold text-white">How To Buy</h2>
        </motion.div>

        <div className="flex">
          {panels.map((panel, index) => {
            // Unfold timing: one card at a time, each completes before next starts
            const rotateY = useTransform(scrollYProgress, [index * 0.1, (index + 1) * 0.1], [panel.direction * 90, 0])
            // Fade out starts after all panels are fully unfolded (after 0.6)
            const panelOpacity = useTransform(
              scrollYProgress, 
              [0.6 + (index * 0.03), 0.63 + (index * 0.03)], 
              [1, 0]
            )

            return (
              <motion.div
                key={index}
                className="w-32 h-48 bg-orange-600 border-r-2 border-orange-800"
                style={{ 
                  rotateY, 
                  transformOrigin: panel.direction === 1 ? "left" : "right", 
                  transformStyle: "preserve-3d",
                  opacity: panelOpacity
                }}
              >
                <div className="relative w-full h-full">
                  <Image src={panel.src} alt={`Panel ${index}`} fill className="object-cover" />
                </div>
              </motion.div>
            )
          })}
        </div>

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

const cards = [
  {
    src: "/Apple-Cards/apple-card-1.png",
    title: "Set up wallet",
    category: "Step 1",
    content: (
      <div className="max-w-none">
        <p className="abeezee-regular how-to-buy-card-text text-lg md:text-xl leading-relaxed">
          We recommend using the
          {" "}
          <LinkPreview url="https://internetmoney.io/" className="text-orange-600 font-semibold">Internet Money Wallet</LinkPreview>
          . It supports
          {" "}
          <LinkPreview url="https://pulsechain.com/" className="text-orange-600 font-semibold">PulseChain</LinkPreview>
          {" "}
          natively and allows cross-chain swaps, buying directly with credit card, and an in‑app browser for easy bridging via
          {" "}
          <LinkPreview url="https://libertyswap.finance/" className="text-orange-600 font-semibold">LibertySwap</LinkPreview>
          .
        </p>
      </div>
    ),
    imageClassName: "blur-[2px] sm:blur-[3px]",
    overlayClassName: "bg-black/60",
  },
  {
    src: "/Apple-Cards/apple-card-2.png",
    title: "Get PLS for Gas",
    category: "Step 2",
    content: (
      <div className="max-w-none">
        <p className="abeezee-regular how-to-buy-card-text text-base md:text-lg leading-relaxed">
          You need PLS (PulseChain's native coin) for swaps and gas fees. Inside IMW, you can:
          <br /><br />
          Buy PLS directly through the wallet's fiat on-ramp, or
          <br /><br />
          Bridge/swap from other supported chains (Ethereum, BSC, Avalanche, etc.) into PulseChain.
        </p>
      </div>
    ),
  },
  {
    src: "/Apple-Cards/apple-card-3.png",
    title: "Find a DEX",
    category: "Step 3",
    content: (
      <div className="max-w-none">
        <p className="abeezee-regular how-to-buy-card-text text-base md:text-lg leading-relaxed">
          Use IMW's in-app aggregator to swap PLS → Bacon Wrapped Bitcoin at the best available rate, or open the in-app browser to trade on a specific DEX like PulseX.
        </p>
      </div>
    ),
  },
  {
    src: "/Apple-Cards/apple-card-4.png",
    title: "Verify & Swap",
    category: "Step 4",
    content: (
      <div className="max-w-none">
        <p className="abeezee-regular how-to-buy-card-text text-base md:text-lg leading-relaxed">
          Copy the official Bacon Wrapped Bitcoin contract address and proceed with your swap. Start small to test, then go bigger once confirmed. After it clears—sit back and smell the bacon! 🥓
        </p>
      </div>
    ),
  },
]

export function HowToBuy() {
  const carouselSectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress: carouselFadeProgress } = useScroll({
    target: carouselSectionRef,
    offset: ["start start", "end start"] // Extended to overlap with Stats
  })

  return (
    <>
      <AccordionFoldOutParallax />
      {/* Cards Section with Parallax and Extended Fade Out */}
      <section ref={carouselSectionRef} id="how-to-buy" className="relative h-[125vh] bg-black scroll-mt-24">
        <motion.div 
          className="sticky top-0 h-screen w-full flex items-center justify-center bg-black overflow-y-auto"
          style={{
            opacity: useTransform(carouselFadeProgress, [0, 0.25, 1], [1, 1, 0])
          }}
        >
          <div className="max-w-7xl mx-auto w-full pt-24 pb-20">
            <Carousel
              items={cards.map((card, idx) => (
                <AppleCard key={idx} card={card as any} index={idx} layout />
              ))}
            />
          </div>
        </motion.div>
      </section>
    </>
  )
}
