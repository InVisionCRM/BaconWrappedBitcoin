"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

interface GridCard {
  title: string
  description: string
  gradient: string
  image: string
}

const cards: GridCard[] = [
  { title: "Stack 1", description: "Layered depth", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Stack 2", description: "Vertical expansion", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Stack 3", description: "Sequential reveal", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Stack 4", description: "Accordion unfold", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Stack 5", description: "Staggered display", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Stack 6", description: "Depth perception", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Stack 7", description: "Cascade elevation", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Stack 8", description: "Full expansion", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo12StackAccordion({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-black py-20">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Stack Accordion
        </motion.h2>

        <div className="relative flex justify-center items-center min-h-[800px]">
          {displayCards.map((card, index) => {
            const yOffset = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0, index * 100, index * 120]
            )
            const scale = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.8, 0.9 + index * 0.01, 1]
            )
            const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  y: yOffset,
                  scale,
                  opacity,
                  zIndex: cardCount - index
                }}
              >
                <div className={`w-72 h-96 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl`}>
                  <div className="relative h-56 overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-300">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
