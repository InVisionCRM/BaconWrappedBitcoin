"use client"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

// NFT Art Section with Telescope Zoom intro and animated portfolio grid
export function NFTArt() {
  return (
    <section id="nft-art" className="relative bg-black text-white scroll-mt-24">
      <TelescopeZoomIntro />
      <AnimatedPortfolioGrid />
    </section>
  )
}

function TelescopeZoomIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const cards = useMemo(
    () => [
      {
        title: "Phase 1",
        description: "BACON Gaming",
        image: "/stock-images-with-bacon/Generated Image October 07, 2025 - 10_49AM.png",
      },
      {
        title: "Phase 2",
        description: "BACON ATMs",
        image: "/stock-images-with-bacon/Generated Image October 07, 2025 - 10_35AM.png",
      },
      {
        title: "Phase 3",
        description: "Marketing & Partnerships",
        image: "/stock-images-with-bacon/Generated Image October 07, 2025 - 10_43AM.png",
      },
      {
        title: "Phase 4",
        description: "BACON Wallet",
        image: "/stock-images-with-bacon/Generated Image October 07, 2025 - 10_25AM.png",
      },
      {
        title: "Phase 5",
        description: "NFTs",
        image: "/NFT/Generated Image October 07, 2025 - 3_01AM.png",
      },
    ],
    []
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <motion.div 
            className="text-center space-y-4"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
            }}
          >
            <h1 className="text-7xl font-bold text-white">Roadmap</h1>
            <p className="text-sm text-white/40 mt-8"></p>
          </motion.div>
        </div>
        {cards.map((card, index) => (
          <SpiralCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}

interface SpiralCardProps {
  title: string
  description: string
  image: string
  index: number
}

function SpiralCard({ title, description, image, index }: SpiralCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-180, 0, 180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-50%", "0%", "50%"])

  return (
    <div ref={containerRef} className="relative h-[200vh] flex items-center justify-center px-4">
      <div className="sticky top-1/2 -translate-y-1/2 w-full flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
          style={{ rotate, scale, opacity, x, perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {/* Background Image - no dark overlay */}
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 p-12 min-h-[400px] flex flex-col justify-end items-end">
            <h2 
              className="text-5xl font-bold text-white mb-2"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8), 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
              }}
            >
              {title}
            </h2>
            <p 
              className="text-xl text-white/90 leading-relaxed"
              style={{
                textShadow: '0 0 15px rgba(255,255,255,0.6), 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'
              }}
            >
              {description}
            </p>
          </div>

          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  )
}

function AnimatedPortfolioGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const images: string[] = useMemo(
    () => [
      "/NFT/Generated Image October 07, 2025 - 3_01AM.png",
      "/NFT/Generated Image October 07, 2025 - 3_05AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_15AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_30AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_31AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_32AM (1).png",
      "/NFT/Generated Image October 07, 2025 - 4_32AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_33AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_36AM (1).png",
      "/NFT/Generated Image October 07, 2025 - 4_36AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_37AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_39AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_49AM (1).png",
      "/NFT/Generated Image October 07, 2025 - 4_49AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_50AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_52AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_55AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_56AM.png",
      "/NFT/Generated Image October 07, 2025 - 4_59AM.png",
      "/NFT/Generated Image October 07, 2025 - 5_00AM.png",
      "/NFT/Generated Image October 07, 2025 - 5_20AM.png",
    ],
    []
  )

  return (
    <div ref={gridRef} className="relative py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-5xl font-bold">NFT Art Portfolio</h3>
          <p className="text-white/60 mt-2">A clean grid with parallax scroll reveal and playful hovers</p>
        </div>

        {/* Fixed-structure grid (scales via viewport rules) */}
        <div className="grid grid-cols-4 gap-6">
          {images.map((src, index) => (
            <motion.figure
              key={src}
              className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
              whileHover={{ y: -6 }}
            >
              {/* Parallax inner image */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <Image src={src} alt="NFT" fill className="object-cover" />
              </motion.div>

              {/* Overlay + fun labels */}
              <div className="relative z-10 p-3 flex items-end h-[18rem] bg-gradient-to-t from-black/70 via-black/0 to-transparent">
                <div className="backdrop-blur-sm bg-white/5 px-3 py-1 rounded-full text-xs tracking-wide">
                  #{index + 1}
                </div>
              </div>

              {/* Glow on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_0_rgba(255,255,255,0.0)]"
                whileHover={{ boxShadow: "0 0 60px rgba(255,255,255,0.15) inset, 0 20px 60px rgba(255,255,255,0.06)" }}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  )
}


