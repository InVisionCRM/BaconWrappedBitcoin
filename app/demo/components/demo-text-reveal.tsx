"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import PromptOverlay from "./prompt-overlay"

const textRevealPrompts = [
  "Create scramble reveal text effect: Use setInterval to iterate through each character. For each iteration, map text characters: if index < iteration show real char, else show random char from scrambleChars array. Increment iteration by 1/3 each tick (30ms interval) for gradual reveal. Characters resolve from left to right with scrambling effect.",
  "Create character fall text animation: Split text into individual characters. Each char is a motion.span with initial: {opacity: 0, y: -100, rotateX: -90}, animate: {opacity: 1, y: 0, rotateX: 0}. Add staggered delay: index * 0.05s. Use spring transition (stiffness: 100) for bouncy physics. Use AnimatePresence for smooth exit.",
  "Create glitch text effect: Use framer-motion animate on entire text with x: [0, -2, 2, -2, 0] for position jitter. Animate textShadow with offset RGB colors (magenta/cyan) for chromatic aberration: '-2px 0 10px rgba(255,0,255,0.8), 2px 0 10px rgba(0,255,255,0.8)'. Duration: 2s, repeat: Infinity with 3s delay between glitches.",
  "Create wave text animation: Each character is animated independently with y: [0, -30, 0] and color cycle. Use staggered delay: index * 0.1s so wave flows across text. Duration: 2s, repeat: Infinity, ease: easeInOut. Creates continuous undulating wave effect through the text.",
  "Create typewriter text effect: Use useEffect with setInterval to add one character at a time (100ms interval). Show substring(0, i+1) each tick. Add blinking cursor with motion.span animating opacity: [1, 0] with 0.5s duration, repeat: Infinity. Classic terminal typing appearance.",
  "Create rotate-in text reveal: Each character starts with rotateY: 90 (invisible side view), scale: 0, opacity: 0. Animate to rotateY: 0, scale: 1, opacity: 1. Stagger delay: index * 0.04s. Duration: 0.4s. Set perspective: 1000px for 3D effect. Characters flip into view like rotating cards.",
  "Create split reveal text animation: Split text at midpoint. Left half starts x: -100, right half x: 100. Both animate to x: 0. Delay based on distance from center: abs(index - text.length/2) * 0.03. Use spring transition for bouncy effect. Text reveals from center outward in both directions.",
  "Create bounce-in text effect: Each character animates with initial: {y: -200, scale: 0, opacity: 0} to {y: 0, scale: 1, opacity: 1}. Use spring physics with stiffness: 200, damping: 10 for exaggerated bounce. Stagger: index * 0.03s. Characters bounce in energetically from top with overshoot."
]

const phrases = [
  "BACON WRAPPED BITCOIN",
  "CRYPTO MEETS PORK",
  "TO THE MOON",
  "HODL YOUR BACON",
  "SIZZLING GAINS",
  "BLOCKCHAIN BREAKFAST"
]

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

function Separator({ number, title }: { number: number; title: string }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="h-px w-32 bg-gradient-to-r from-transparent to-pink-500" />
        <span className="text-pink-500 font-bold text-xl">#{number} {title}</span>
        <div className="h-px w-32 bg-gradient-to-l from-transparent to-pink-500" />
      </div>
    </div>
  )
}

// Effect 1: Scramble Reveal
function TextEffect1() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    const targetText = phrases[currentPhrase]
    let iteration = 0

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) return targetText[index]
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          })
          .join("")
      )
      iteration += 1 / 3
      if (iteration >= targetText.length) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [currentPhrase])

  return (
    <div className="h-screen bg-gradient-to-br from-purple-950 via-pink-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={1} effectName="Scramble Reveal" prompt={textRevealPrompts[0]} />
      <h2 className="text-6xl font-bold text-orange-400 font-mono tracking-wider min-h-20 text-center px-4">
        {displayText}
      </h2>
      <button
        onClick={() => setCurrentPhrase((prev) => (prev + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 2: Character Fall
function TextEffect2() {
  const [key, setKey] = useState(0)
  const text = phrases[key % phrases.length]

  return (
    <div className="h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={2} effectName="Character Fall" prompt={textRevealPrompts[1]} />
      <div className="flex gap-1 flex-wrap justify-center px-4">
        <AnimatePresence mode="wait">
          {text.split("").map((char, index) => (
            <motion.span
              key={`${key}-${index}`}
              initial={{ opacity: 0, y: -100, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 100, rotateX: 90 }}
              transition={{
                delay: index * 0.05,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="text-5xl font-bold text-white"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setKey(key + 1)}
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 3: Glitch Text
function TextEffect3() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const text = phrases[phraseIndex]

  return (
    <div className="h-screen bg-gradient-to-br from-red-950 via-pink-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={3} effectName="Glitch Effect" prompt={textRevealPrompts[2]} />
      <motion.h3
        className="text-6xl font-bold text-pink-500 text-center px-4"
        animate={{
          x: [0, -2, 2, -2, 0],
          textShadow: [
            "0 0 0px rgba(255,0,255,0)",
            "-2px 0 10px rgba(255,0,255,0.8), 2px 0 10px rgba(0,255,255,0.8)",
            "2px 0 10px rgba(255,0,255,0.8), -2px 0 10px rgba(0,255,255,0.8)",
            "-2px 0 10px rgba(255,0,255,0.8), 2px 0 10px rgba(0,255,255,0.8)",
            "0 0 0px rgba(255,0,255,0)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        {text}
      </motion.h3>
      <button
        onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 4: Wave Animation
function TextEffect4() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const text = phrases[phraseIndex]

  return (
    <div className="h-screen bg-gradient-to-br from-green-950 via-teal-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={4} effectName="Wave Animation" prompt={textRevealPrompts[3]} />
      <div className="flex gap-1 flex-wrap justify-center px-4">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -30, 0],
              color: ["#fff", "#10b981", "#fff"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
            className="text-5xl font-bold"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <button
        onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 5: Typewriter
function TextEffect5() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const text = phrases[phraseIndex]

  useEffect(() => {
    setDisplayText("")
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [phraseIndex, text])

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-950 via-orange-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={5} effectName="Typewriter" prompt={textRevealPrompts[4]} />
      <div className="text-5xl font-bold text-yellow-400 font-mono text-center px-4 min-h-20">
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      </div>
      <button
        onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 6: Rotate In
function TextEffect6() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const text = phrases[phraseIndex]

  return (
    <div className="h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={6} effectName="Rotate In" prompt={textRevealPrompts[5]} />
      <div className="flex gap-2 flex-wrap justify-center px-4">
        <AnimatePresence mode="wait">
          {text.split("").map((char, index) => (
            <motion.span
              key={`${phraseIndex}-${index}`}
              initial={{ opacity: 0, rotateY: 90, scale: 0 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0 }}
              transition={{
                delay: index * 0.04,
                duration: 0.4
              }}
              className="text-5xl font-bold text-purple-400"
              style={{ perspective: "1000px" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 7: Split Reveal
function TextEffect7() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const text = phrases[phraseIndex]

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-950 via-blue-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={7} effectName="Split Reveal" prompt={textRevealPrompts[6]} />
      <div className="flex gap-1 flex-wrap justify-center px-4">
        <AnimatePresence mode="wait">
          {text.split("").map((char, index) => {
            const isLeft = index < text.length / 2
            return (
              <motion.span
                key={`${phraseIndex}-${index}`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLeft ? -100 : 100 }}
                transition={{
                  delay: Math.abs(index - text.length / 2) * 0.03,
                  duration: 0.5,
                  type: "spring"
                }}
                className="text-5xl font-bold text-cyan-400"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            )
          })}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

// Effect 8: Bounce In
function TextEffect8() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const text = phrases[phraseIndex]

  return (
    <div className="h-screen bg-gradient-to-br from-rose-950 via-red-950 to-black flex flex-col items-center justify-center gap-8 relative">
      <PromptOverlay effectNumber={8} effectName="Bounce In" prompt={textRevealPrompts[7]} />
      <div className="flex gap-2 flex-wrap justify-center px-4">
        <AnimatePresence mode="wait">
          {text.split("").map((char, index) => (
            <motion.span
              key={`${phraseIndex}-${index}`}
              initial={{ opacity: 0, y: -200, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 200, scale: 0 }}
              transition={{
                delay: index * 0.03,
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              className="text-5xl font-bold text-rose-400"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setPhraseIndex((phraseIndex + 1) % phrases.length)}
        className="px-8 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Next Phrase
      </button>
    </div>
  )
}

export default function DemoTextRevealCollection() {
  return (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Text Reveal Collection
          </h1>
          <p className="text-2xl text-gray-400 mb-8">8 different text animation styles</p>
        </div>
      </div>

      <Separator number={1} title="Scramble Reveal" />
      <TextEffect1 />

      <Separator number={2} title="Character Fall" />
      <TextEffect2 />

      <Separator number={3} title="Glitch Effect" />
      <TextEffect3 />

      <Separator number={4} title="Wave Animation" />
      <TextEffect4 />

      <Separator number={5} title="Typewriter" />
      <TextEffect5 />

      <Separator number={6} title="Rotate In" />
      <TextEffect6 />

      <Separator number={7} title="Split Reveal" />
      <TextEffect7 />

      <Separator number={8} title="Bounce In" />
      <TextEffect8 />

      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-purple-950 to-black">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">End of Text Effects</h2>
          <p className="text-xl text-gray-400">Scroll back up to explore more</p>
        </div>
      </div>
    </div>
  )
}
