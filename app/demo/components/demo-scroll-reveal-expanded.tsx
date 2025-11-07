"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

function Separator({ number, title }: { number: number; title: string }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="h-px w-40 bg-gradient-to-r from-transparent to-teal-500" />
        <span className="text-teal-500 font-bold text-2xl">#{number} {title}</span>
        <div className="h-px w-40 bg-gradient-to-l from-transparent to-teal-500" />
      </div>
    </div>
  )
}

// Scroll Effect 1: Fade In Up
function ScrollEffect1() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-black">
      <motion.div style={{ y, opacity }} className="max-w-2xl">
        <div className="relative h-96 rounded-3xl overflow-hidden border-4 border-purple-500">
          <Image src="/bacon-wrapped-bitcoin.jpg" alt="Bacon Bitcoin" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent flex items-end p-8">
            <h2 className="text-4xl font-bold text-white">Fade In Up</h2>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 2: Scale Reveal
function ScrollEffect2() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-black">
      <motion.div style={{ scale, opacity }}>
        <div className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl">
          <Image src="/Baco.jpg" alt="Baco" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 3: Rotate In
function ScrollEffect3() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const rotate = useTransform(scrollYProgress, [0, 0.5], [180, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-950 to-black">
      <motion.div style={{ rotate, opacity }}>
        <div className="relative w-80 h-96 rounded-2xl overflow-hidden border-4 border-pink-500">
          <Image src="/pigunderlight.png" alt="Pig" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 4: Slide In Left
function ScrollEffect4() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const x = useTransform(scrollYProgress, [0, 0.5], [-200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-green-950 to-black">
      <motion.div style={{ x, opacity }}>
        <div className="relative w-96 h-80 rounded-3xl overflow-hidden border-4 border-green-500">
          <Image src="/artcoin1.png" alt="Art Coin" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 5: Slide In Right
function ScrollEffect5() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const x = useTransform(scrollYProgress, [0, 0.5], [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-orange-950 to-black">
      <motion.div style={{ x, opacity }}>
        <div className="relative w-96 h-80 rounded-3xl overflow-hidden border-4 border-orange-500">
          <Image src="/artcoin2.png" alt="Art Coin" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 6: Zoom Blur
function ScrollEffect6() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-red-950 to-black overflow-hidden">
      <motion.div style={{ scale, opacity }}>
        <div className="relative w-96 h-96 rounded-2xl overflow-hidden border-4 border-red-500">
          <Image src="/singlepig.png" alt="Pig" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 7: Flip Horizontal
function ScrollEffect7() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [90, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-cyan-950 to-black" style={{ perspective: "1000px" }}>
      <motion.div style={{ rotateY, opacity }}>
        <div className="relative w-80 h-96 rounded-3xl overflow-hidden border-4 border-cyan-500">
          <Image src="/artcoin3.png" alt="Art Coin" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 8: Blur to Focus
function ScrollEffect8() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const blur = useTransform(scrollYProgress, [0, 0.5], [10, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 to-black">
      <motion.div style={{ opacity, filter: blur.get() !== undefined ? `blur(${blur.get()}px)` : undefined }}>
        <div className="relative w-96 h-80 rounded-3xl overflow-hidden border-4 border-violet-500">
          <Image src="/artcoin4.png" alt="Art Coin" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 9: Stagger Cards
function ScrollEffect9() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const cards = ["/artcoin5.png", "/artcoin6.png", "/bacon-wrapped-bitcoin.jpg"]

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-black">
      <div className="flex gap-6">
        {cards.map((src, index) => {
          const y = useTransform(scrollYProgress, [0, 0.5], [100 + index * 50, 0])
          const opacity = useTransform(scrollYProgress, [0.1 + index * 0.1, 0.3 + index * 0.1], [0, 1])

          return (
            <motion.div key={index} style={{ y, opacity }}>
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-2 border-indigo-500">
                <Image src={src} alt={`Card ${index}`} fill className="object-cover" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Scroll Effect 10: Parallax Layers
function ScrollEffect10() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-black relative overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute top-20 left-20 opacity-30">
        <Image src="/Bitcoin-Logo.png" alt="Bitcoin" width={200} height={200} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-40 right-20 opacity-40">
        <Image src="/wpls-logo.png" alt="WPLS" width={150} height={150} />
      </motion.div>
      <motion.div style={{ y: y3 }} className="z-10">
        <div className="relative w-80 h-96 rounded-3xl overflow-hidden border-4 border-slate-500">
          <Image src="/Baco.jpg" alt="Baco" fill className="object-cover" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold">Parallax Layers</h2>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 11: Bounce In
function ScrollEffect11() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 0.5], [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-950 to-black">
      <motion.div
        style={{ y, opacity }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div className="relative w-96 h-96 rounded-full overflow-hidden border-8 border-amber-500 shadow-2xl">
          <Image src="/pigunderlight1.png" alt="Pig" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

// Scroll Effect 12: Split Reveal
function ScrollEffect12() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [-200, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.5], [200, 0])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center gap-6 bg-gradient-to-br from-rose-950 to-black">
      <motion.div style={{ x: xLeft }}>
        <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-4 border-rose-500">
          <Image src="/artcoin1.png" alt="Art Coin" fill className="object-cover" />
        </div>
      </motion.div>
      <motion.div style={{ x: xRight }}>
        <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-4 border-rose-500">
          <Image src="/artcoin2.png" alt="Art Coin" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}

export default function DemoScrollRevealExpanded() {
  return (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Scroll Reveal Collection
          </h1>
          <p className="text-2xl text-gray-400 mb-8">12 unique scroll-triggered animations</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-teal-500 text-4xl"
          >
            ↓
          </motion.div>
        </div>
      </div>

      <Separator number={1} title="Fade In Up" />
      <ScrollEffect1 />

      <Separator number={2} title="Scale Reveal" />
      <ScrollEffect2 />

      <Separator number={3} title="Rotate In" />
      <ScrollEffect3 />

      <Separator number={4} title="Slide In Left" />
      <ScrollEffect4 />

      <Separator number={5} title="Slide In Right" />
      <ScrollEffect5 />

      <Separator number={6} title="Zoom Blur" />
      <ScrollEffect6 />

      <Separator number={7} title="Flip Horizontal" />
      <ScrollEffect7 />

      <Separator number={8} title="Blur to Focus" />
      <ScrollEffect8 />

      <Separator number={9} title="Stagger Cards" />
      <ScrollEffect9 />

      <Separator number={10} title="Parallax Layers" />
      <ScrollEffect10 />

      <Separator number={11} title="Bounce In" />
      <ScrollEffect11 />

      <Separator number={12} title="Split Reveal" />
      <ScrollEffect12 />

      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-teal-950 to-black">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">End of Scroll Reveals</h2>
          <p className="text-xl text-gray-400">Scroll back up to explore more</p>
        </div>
      </div>
    </div>
  )
}
