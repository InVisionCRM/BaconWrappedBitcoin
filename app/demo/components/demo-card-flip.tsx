"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import PromptOverlay from "./prompt-overlay"

const cardFlipPrompts = [
  "Create a 3D card flip effect on click. Use framer-motion with rotateY transform: 0deg (front) to 180deg (back). Set container style transformStyle: 'preserve-3d'. Front face has normal position, back face has transform: rotateY(180deg) and backface-visibility: hidden. Duration 0.6s with spring animation (stiffness: 100).",
  "Create 3D flip card with two images (front/back). On click, toggle isFlipped state to animate rotateY between 0 and 180 degrees. Both card faces are absolutely positioned with backface-hidden class. Use perspective-1000 on parent container for 3D depth effect. Add gradient overlay on both sides.",
  "Implement flip card animation: Set up two div layers (front/back), both position absolute with backface-hidden. Animate rotateY property on parent wrapper. Back side starts at rotateY(180deg). Use spring transition for realistic physics. Add border and rounded corners for polish.",
  "Create interactive card flip: Use useState to track flip state. Apply rotateY transform to container div with preserve-3d style. Front image visible at 0deg, back image at 180deg. Use framer-motion animate prop with spring type transition. Click handler toggles between states.",
  "Build 3D flipping card effect: Container needs perspective (1000px) for 3D space. Inner div has transformStyle: preserve-3d. Front and back faces are absolutely positioned children with backface-visibility: hidden. Animate rotateY on click: 0→180deg. Duration 0.6s spring animation.",
  "Create flip card gallery item: Two-sided card with click-to-flip interaction. Front and back use absolute positioning with full dimensions. Apply rotateY animation to parent, not children. Back starts pre-rotated 180deg. Use CSS backface-hidden to hide non-visible side. Add smooth spring physics for natural feel."
]

const cards = [
  { front: "/bacon-wrapped-bitcoin.jpg", back: "/Baco.jpg", title: "Bacon Wrapped Bitcoin" },
  { front: "/artcoin1.png", back: "/artcoin2.png", title: "Art Coin 1" },
  { front: "/artcoin3.png", back: "/artcoin4.png", title: "Art Coin 2" },
  { front: "/artcoin5.png", back: "/artcoin6.png", title: "Art Coin 3" },
  { front: "/pigunderlight.png", back: "/pigunderlight1.png", title: "Pig Under Light" },
  { front: "/singlepig.png", back: "/b&Wcutepig.jpg", title: "Single Pig" }
]

function FlipCard({ card, index }: { card: typeof cards[0], index: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full h-80 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <PromptOverlay effectNumber={index + 1} effectName={`3D Card Flip ${index + 1}`} prompt={cardFlipPrompts[index]} />
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-orange-500/30">
          <Image
            src={card.front}
            alt={card.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white font-bold text-xl">{card.title}</h3>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-orange-500/30"
          style={{ transform: "rotateY(180deg)" }}
        >
          <Image
            src={card.back}
            alt={`${card.title} back`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h3 className="text-white font-bold text-xl">Flip Back</h3>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function DemoCardFlip() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          3D Card Flip Gallery
        </h2>
        <p className="text-gray-400 text-center mb-12">Click any card to flip it</p>

        <div className="grid grid-cols-3 gap-8 min-w-0">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FlipCard card={card} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
