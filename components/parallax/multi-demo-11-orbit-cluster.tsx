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
  { title: "Orbit 1", description: "Circular trajectory", gradient: "from-blue-600/20 to-cyan-600/20", image: "/artcoin1.png" },
  { title: "Orbit 2", description: "Synchronized rotation", gradient: "from-cyan-600/20 to-teal-600/20", image: "/artcoin2.png" },
  { title: "Orbit 3", description: "Planetary motion", gradient: "from-teal-600/20 to-green-600/20", image: "/artcoin3.png" },
  { title: "Orbit 4", description: "Orbital convergence", gradient: "from-green-600/20 to-lime-600/20", image: "/artcoin4.png" },
  { title: "Orbit 5", description: "Centripetal force", gradient: "from-purple-600/20 to-pink-600/20", image: "/artcoin5.png" },
  { title: "Orbit 6", description: "Elliptical paths", gradient: "from-pink-600/20 to-rose-600/20", image: "/artcoin6.png" },
  { title: "Orbit 7", description: "Spiral approach", gradient: "from-orange-600/20 to-amber-600/20", image: "/pigbtc.png" },
  { title: "Orbit 8", description: "Final assembly", gradient: "from-indigo-600/20 to-violet-600/20", image: "/bitcoincoin.png" }
]

interface MultiCardProps {
  cardCount?: number
}

export function MultiDemo11OrbitCluster({ cardCount = 8 }: MultiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const displayCards = cards.slice(0, cardCount)

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black py-20">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center text-white mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Orbit Cluster
        </motion.h2>

        <div className="relative h-[600px]">
          {displayCards.map((card, index) => {
            const angle = (index / cardCount) * Math.PI * 2
            const radius = useTransform(scrollYProgress, [0, 0.5, 1], [400, 200, 0])
            const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1])
            const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1])

            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  x: useTransform(radius, (r) => Math.cos(angle) * r - 120),
                  y: useTransform(radius, (r) => Math.sin(angle) * r - 160),
                  scale,
                  opacity
                }}
              >
                <div className={`w-60 h-80 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl`}>
                  <div className="relative h-48 overflow-hidden">
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
