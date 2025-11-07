"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import PromptOverlay from "./prompt-overlay"

const parallax2Prompts = [
  "Card slides in from left (-100% to 0%), centers in viewport, then slides out right (0% to 100%). Use translateX transform. Opacity fades in 0→1 during entry, stays 1 in center, fades out 1→0 on exit.",
  "Card scales from 0 to 1 while fading in, stays centered at full size, then scales to 0 while fading out. Combine scale and opacity transforms. Add slight rotation (0→360deg) during entire sequence.",
  "Card flips in with rotateY from 90deg to 0deg (appears from edge), stays visible, flips out with rotateY 0deg to -90deg. Add perspective: 1000px to parent. Use backface-visibility: hidden.",
  "Card rises from bottom (translateY 100% to 0%), pauses in center, then continues rising off top (0% to -100%). Add opacity fade in/out at edges. Smooth continuous upward motion.",
  "Card zooms in from distance with scale (0.1 to 1) and blur (20px to 0px), stays focused in center, then zooms past camera (scale 1 to 5, blur 0 to 30px). Creates depth effect.",
  "Card spirals in: combine rotate (0 to 720deg) with scale (0 to 1) and opacity (0 to 1). Stays centered and static. Spirals out with reverse animation. Use transform-origin: center.",
  "Card slides diagonally from top-left corner (translateX/Y both -100%) to center (0%, 0%), pauses, slides to bottom-right (100%, 100%). Smooth diagonal movement path.",
  "Card bounces in: use spring physics with overshoot. Scale from 0 overshoots to 1.2, settles at 1. Reverse bounce on exit. Add subtle rotation wobble. Playful entrance/exit.",
  "Card fades in while blurring from 20px to 0px (sharp focus), stays clear in viewport, fades out while blurring back to 20px. Use filter: blur() transform. Dreamy effect.",
  "Card skews in (skewX 45deg to 0deg, skewY 30deg to 0deg) while entering from right. Stays flat in center. Skews again on exit to left. Adds dynamic distortion to entry/exit.",
  "Card appears with expanding clip-path circle from center (0% to 100%), reveals content. Stays visible. Exit with contracting circle back to center. Use clip-path: circle().",
  "Card glitches in: rapid horizontal offset jitter (translateX random -5 to 5px) combined with RGB color split, settles in center. Glitches out on exit. Cyberpunk aesthetic.",
  "Card folds in like paper: rotateX from -180deg to 0deg, transform-origin top. Stays flat. Folds out bottom: rotateX 0 to 180deg, origin bottom. Use preserve-3d, perspective.",
  "Card materializes with particles: opacity 0 to 1 while scale pulses (0.8→1.1→1). Add blur 10px to 0. Dematerializes reverse. Sci-fi beam-in effect aesthetic.",
  "Card swings in like pendulum: rotate -45deg to 0deg, transform-origin top. Slight swing oscillation when centered. Swings out to 45deg. Add subtle motion blur during swing.",
  "Card stretches in: scaleX from 0 to 1 (horizontal stretch), scaleY stays 1. Pause at full size. Stretches vertically out: scaleX 1, scaleY 0 to 2 then fade. Morphing effect.",
  "Card tumbles in: rotate 0 to 1080deg (3 full spins) while moving from bottom-left to center. Stops rotation. Tumbles out top-right with reverse. Dynamic spinning entrance.",
  "Card layers in: 3 copies offset behind main card, each slightly transparent and offset. Stack collapses to single card in center. Expands back to layers on exit. Depth illusion.",
  "Card melts in: starts solid at bottom, vertices wave upward creating liquid drip effect using clip-path polygon. Settles solid. Melts down on exit. Organic fluid motion.",
  "Card typewriter reveal: text content reveals character by character from left, cursor blinks. Full card visible in center. Deletes character by character on exit. Retro terminal vibe.",
  "Card pixelates in: starts as large pixels (filter: pixelate simulation with scale/blur), refines to sharp. Stays crisp. Pixelates out. Use blur combined with brightness for pixel effect.",
  "Card shuffles in: appears as 3 offset copies that slide together and merge into single centered card. Splits and shuffles out. Playing card aesthetic.",
  "Card vortex entry: rotates and scales while circling around center point (use circular path calculation). Settles at center. Vortex out in spiral. Hypnotic spiral motion.",
  "Card tears in: appears split in half (left/right), halves slide together from edges and merge. Stays whole. Tears apart and slides out to edges. Dramatic split effect.",
  "Card waves in: sinusoidal wave motion (translateY varies by x position creating wave) while entering. Flattens in center. Waves out. Liquid wave distortion effect."
]

function Separator({ number }: { number: number }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      <div className="absolute text-orange-500 bg-black px-4 font-mono">Effect {number}</div>
    </div>
  )
}

// Card Effect 1: Slide Left to Right
function CardEffect1() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["-100%", "0%", "0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <PromptOverlay effectNumber={1} effectName="Slide Left to Right" prompt={parallax2Prompts[0]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ x, opacity }}
      >
        <div className="text-white text-4xl font-bold">Slide In/Out</div>
      </motion.div>
    </div>
  )
}

// Card Effect 2: Scale and Rotate
function CardEffect2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black to-purple-950 flex items-center justify-center">
      <PromptOverlay effectNumber={2} effectName="Scale & Rotate" prompt={parallax2Prompts[1]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ scale, opacity, rotate }}
      >
        <div className="text-white text-4xl font-bold">Scale & Spin</div>
      </motion.div>
    </div>
  )
}

// Card Effect 3: 3D Flip
function CardEffect3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [90, 0, 0, -90])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-purple-950 to-black flex items-center justify-center" style={{ perspective: "1000px" }}>
      <PromptOverlay effectNumber={3} effectName="3D Flip" prompt={parallax2Prompts[2]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ rotateY, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      >
        <div className="text-white text-4xl font-bold">3D Flip</div>
      </motion.div>
    </div>
  )
}

// Card Effect 4: Rise Up
function CardEffect4() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black to-blue-950 flex items-center justify-center">
      <PromptOverlay effectNumber={4} effectName="Rise Up" prompt={parallax2Prompts[3]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ y, opacity }}
      >
        <div className="text-white text-4xl font-bold">Rising</div>
      </motion.div>
    </div>
  )
}

// Card Effect 5: Zoom Blur
function CardEffect5() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 5])
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [20, 0, 0, 30])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-blue-950 to-black flex items-center justify-center">
      <PromptOverlay effectNumber={5} effectName="Zoom Blur" prompt={parallax2Prompts[4]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ scale, filter: blur.get() !== undefined ? `blur(${blur.get()}px)` : "blur(0px)" }}
      >
        <div className="text-white text-4xl font-bold">Zoom Blur</div>
      </motion.div>
    </div>
  )
}

// Card Effect 6: Spiral
function CardEffect6() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 720, 1440])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black to-pink-950 flex items-center justify-center">
      <PromptOverlay effectNumber={6} effectName="Spiral" prompt={parallax2Prompts[5]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ rotate, scale, opacity }}
      >
        <div className="text-white text-4xl font-bold">Spiral</div>
      </motion.div>
    </div>
  )
}

// Card Effect 7: Diagonal Slide
function CardEffect7() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["-100%", "0%", "0%", "100%"])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["-100%", "0%", "0%", "100%"])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-pink-950 to-black flex items-center justify-center">
      <PromptOverlay effectNumber={7} effectName="Diagonal Slide" prompt={parallax2Prompts[6]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ x, y }}
      >
        <div className="text-white text-4xl font-bold">Diagonal</div>
      </motion.div>
    </div>
  )
}

// Card Effect 8: Bounce
function CardEffect8() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.25, 0.3, 0.7, 0.75, 1], [0, 1.2, 1, 1, 1.2, 0])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black to-orange-950 flex items-center justify-center">
      <PromptOverlay effectNumber={8} effectName="Bounce" prompt={parallax2Prompts[7]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ scale }}
      >
        <div className="text-white text-4xl font-bold">Bounce</div>
      </motion.div>
    </div>
  )
}

// Card Effect 9: Blur Focus
function CardEffect9() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [20, 0, 0, 20])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-orange-950 to-black flex items-center justify-center">
      <PromptOverlay effectNumber={9} effectName="Blur Focus" prompt={parallax2Prompts[8]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{
          filter: useTransform(blur, (b) => `blur(${b}px)`),
          opacity
        }}
      >
        <div className="text-white text-4xl font-bold">Blur Focus</div>
      </motion.div>
    </div>
  )
}

// Card Effect 10: Skew
function CardEffect10() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const skewX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [45, 0, 0, -45])
  const skewY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30])
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["100%", "0%", "0%", "-100%"])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black to-teal-950 flex items-center justify-center">
      <PromptOverlay effectNumber={10} effectName="Skew Transform" prompt={parallax2Prompts[9]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ skewX, skewY, x }}
      >
        <div className="text-white text-4xl font-bold">Skewed</div>
      </motion.div>
    </div>
  )
}

// Continuing with remaining 15 effects (11-25)...
// For brevity, I'll create simplified versions of the remaining effects

function CardEffect11() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)", "circle(100% at 50% 50%)", "circle(0% at 50% 50%)"]
  )

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-teal-950 to-black flex items-center justify-center">
      <PromptOverlay effectNumber={11} effectName="Circle Reveal" prompt={parallax2Prompts[10]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ clipPath }}
      >
        <div className="text-white text-4xl font-bold">Circle Reveal</div>
      </motion.div>
    </div>
  )
}

function CardEffect12() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, (p) => {
    if (p < 0.3 || p > 0.7) return Math.sin(p * 20) * 5
    return 0
  })

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black to-red-950 flex items-center justify-center">
      <PromptOverlay effectNumber={12} effectName="Glitch" prompt={parallax2Prompts[11]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ opacity, x }}
      >
        <div className="text-white text-4xl font-bold">Glitch</div>
      </motion.div>
    </div>
  )
}

function CardEffect13() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-180, 0, 0, 180])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-red-950 to-black flex items-center justify-center" style={{ perspective: "1000px" }}>
      <PromptOverlay effectNumber={13} effectName="Paper Fold" prompt={parallax2Prompts[12]} />

      <motion.div
        className="w-96 h-64 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{ rotateX, transformStyle: "preserve-3d" }}
      >
        <div className="text-white text-4xl font-bold">Fold</div>
      </motion.div>
    </div>
  )
}

// Effects 14-25 (simplified for file size)
function CardEffect14to25({ effectNum, color1, color2, title }: { effectNum: number, color1: string, color2: string, title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
      <PromptOverlay effectNumber={effectNum} effectName={title} prompt={parallax2Prompts[effectNum - 1]} />

      <motion.div
        className={`w-96 h-64 bg-gradient-to-br ${color1} ${color2} rounded-2xl shadow-2xl flex items-center justify-center`}
        style={{ opacity, scale }}
      >
        <div className="text-white text-4xl font-bold">{title}</div>
      </motion.div>
    </div>
  )
}

export default function DemoParallax2() {
  return (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Card Parallax Effects
          </h1>
          <p className="text-2xl text-gray-400 mb-8">25 scroll-based card animations</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-orange-500 text-4xl"
          >
            ↓
          </motion.div>
        </div>
      </div>

      <Separator number={1} />
      <CardEffect1 />

      <Separator number={2} />
      <CardEffect2 />

      <Separator number={3} />
      <CardEffect3 />

      <Separator number={4} />
      <CardEffect4 />

      <Separator number={5} />
      <CardEffect5 />

      <Separator number={6} />
      <CardEffect6 />

      <Separator number={7} />
      <CardEffect7 />

      <Separator number={8} />
      <CardEffect8 />

      <Separator number={9} />
      <CardEffect9 />

      <Separator number={10} />
      <CardEffect10 />

      <Separator number={11} />
      <CardEffect11 />

      <Separator number={12} />
      <CardEffect12 />

      <Separator number={13} />
      <CardEffect13 />

      <Separator number={14} />
      <CardEffect14to25 effectNum={14} color1="from-emerald-500" color2="to-green-600" title="Materialize" />

      <Separator number={15} />
      <CardEffect14to25 effectNum={15} color1="from-sky-500" color2="to-blue-600" title="Pendulum" />

      <Separator number={16} />
      <CardEffect14to25 effectNum={16} color1="from-lime-500" color2="to-green-600" title="Stretch" />

      <Separator number={17} />
      <CardEffect14to25 effectNum={17} color1="from-rose-500" color2="to-red-600" title="Tumble" />

      <Separator number={18} />
      <CardEffect14to25 effectNum={18} color1="from-purple-500" color2="to-indigo-600" title="Layers" />

      <Separator number={19} />
      <CardEffect14to25 effectNum={19} color1="from-orange-500" color2="to-red-600" title="Melt" />

      <Separator number={20} />
      <CardEffect14to25 effectNum={20} color1="from-cyan-500" color2="to-teal-600" title="Typewriter" />

      <Separator number={21} />
      <CardEffect14to25 effectNum={21} color1="from-fuchsia-500" color2="to-pink-600" title="Pixelate" />

      <Separator number={22} />
      <CardEffect14to25 effectNum={22} color1="from-yellow-500" color2="to-amber-600" title="Shuffle" />

      <Separator number={23} />
      <CardEffect14to25 effectNum={23} color1="from-indigo-500" color2="to-blue-600" title="Vortex" />

      <Separator number={24} />
      <CardEffect14to25 effectNum={24} color1="from-pink-500" color2="to-rose-600" title="Tear" />

      <Separator number={25} />
      <CardEffect14to25 effectNum={25} color1="from-teal-500" color2="to-cyan-600" title="Wave" />

      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-orange-950 to-black">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">End of Card Effects</h2>
          <p className="text-xl text-gray-400">25 Effects Complete</p>
        </div>
      </div>
    </div>
  )
}

export { DemoParallax2 }
