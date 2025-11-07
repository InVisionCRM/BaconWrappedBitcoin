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
  { title: "Slide 1", description: "Horizontal motion", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Slide 2", description: "Carousel effect", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Slide 3", description: "Smooth transitions", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Slide 4", description: "Flowing sequence", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Slide 5", description: "Lateral movement", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Slide 6", description: "Synchronized drift", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Slide 7", description: "Gliding cards", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Slide 8", description: "Perfect alignment", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo13SlideCarousel({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-black py-20 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Slide Carousel
        </motion.h2>

        <div className="relative flex items-center justify-center h-[500px] overflow-hidden">
          {displayCards.map((card, index) => {
            const xOffset = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [index * 400 - 1200, index * 100 - (cardCount - 1) * 50, index * 300 - (cardCount - 1) * 150]
            )
            const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.7, 1, 0.7])
            const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  x: xOffset,
                  scale,
                  opacity
                }}
              >
                <div className={`w-64 h-96 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl`}>
                  <div className="relative h-56 overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
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
