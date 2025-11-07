"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import PromptOverlay from "./prompt-overlay"

const scrollRevealPrompts = [
  "Create scale-rotate scroll reveal: Use useScroll hook with target ref, offset ['start end', 'end start']. Transform y (100 to -100), opacity (0→1→1→0 at 0, 0.3, 0.7, 1), scale (0.8→1→1→0.8), rotate (-10→0→0→10). Card reveals with smooth rotation as you scroll into and out of view.",
  "Create slide-left scroll reveal: Transform x (-200→0→0→-200 at 0, 0.3, 0.7, 1), opacity (0→1→1→0), scale (1.2→1→1→1.2). Card slides in from left side, stays centered while in view, then slides back out to left.",
  "Create flip-horizontal scroll reveal: Transform rotateY (180→0→0→-180 at 0, 0.3, 0.7, 1), opacity (0→1→1→0), scale (0.5→1→1→0.5). Card flips horizontally into view like a playing card being turned over, then flips back out.",
  "Create bounce-in scroll reveal: Transform y (-300→20→-10→5→0 at 0, 0.2, 0.3, 0.4, 0.5 for bounce physics), scale (0.3→1.1→0.9→1.05→1), opacity (0→1→1→0 at 0, 0.2, 0.7, 1). Card bounces into view with elastic effect like a ball dropping.",
  "Create wave-in scroll reveal: Transform y (0 to -100), x (0→100→0 using sine wave at 0, 0.5, 1), rotate (0→15→0), opacity (0→1→1→0). Card waves in with sinusoidal horizontal movement combined with rotation.",
  "Create spiral-in scroll reveal: Transform rotate (720→0→0→-720 at 0, 0.3, 0.7, 1 for multiple spins), scale (0→1→1→0), opacity (0→1→1→0). Card spirals in with 720deg rotation, stays still, then spirals out reverse direction.",
  "Create slide-right scroll reveal: Transform x (200→0→0→200), opacity (0→1→1→0), rotateY (90→0→0→-90). Card slides from right with 3D rotation, creating door-opening effect. Use perspective for 3D effect.",
  "Create zoom-blur scroll reveal: Transform scale (3→1→1→0.3 at 0, 0.3, 0.7, 1), opacity (0→1→1→0). Card zooms in from massive scale (3x) down to normal, stays in view, then shrinks to tiny (0.3x) as it exits. Creates dramatic zoom effect.",
  "Create tilt-reveal scroll reveal: Transform rotateX (90→0→0→-90), opacity (0→1→1→0), y (100→0→0→-100). Card tilts up from horizontal (90deg X rotation) to vertical, then tilts down as it exits. Set perspective: 1000px on container.",
  "Create elastic-bounce scroll reveal: Transform scale with elastic timing (0→1.3→0.8→1.1→0.95→1 at 0, 0.2, 0.3, 0.35, 0.4, 0.5), rotate (-45→0→45), opacity (0→1→1→0). Card bounces with overshoot/undershoot creating springy elastic effect.",
  "Create rotate-3d scroll reveal: Transform rotateY (0→360→720) and rotateX (0→180→360) simultaneously over scroll, scale (0.5→1→1→0.5), opacity (0→1→1→0). Card spins on both axes creating complex 3D rotation. Use transformStyle: preserve-3d.",
  "Create slide-up scroll reveal: Transform y (300→0→0→-300), opacity (0→1→1→0), scale (0.8→1→1→0.8). Card slides up from bottom of screen, stays centered in view, then continues sliding up and out of view at top.",
  "Create fade-scale scroll reveal: Transform scale (0.5→1→1→1.5) continuously growing, opacity (0→1→1→0 at 0, 0.3, 0.7, 1). Simple but elegant effect where card fades in while growing from half size to 1.5x size.",
  "Create swing-in scroll reveal: Transform rotate with swing physics (45→-30→20→-10→0 at 0, 0.2, 0.3, 0.4, 0.5), scale (0.8→1→1→0.8), opacity (0→1→1→0). Card swings into view like a pendulum with decreasing amplitude.",
  "Create typewriter scroll reveal: No card animation but text animates letter-by-letter. Use custom animation with overflow: hidden and width growing from 0% to 100%. Text appears typed out character by character.",
  "Create glitch-in scroll reveal: Transform x with rapid jitter (0→-20→30→-15→10→0 at 0, 0.1, 0.15, 0.2, 0.25, 0.3 for glitch effect), opacity (0→0.5→1→1→0), scale (1.1→1→1→0.9). Card glitches into view with horizontal position jumps mimicking digital glitch.",
  "Create kaleidoscope scroll reveal: Transform rotate (0→720), scale (0→1→1→0), x/y in circular pattern (radius * cos/sin of angle). Cards rotate and expand outward in kaleidoscope burst pattern with 3D flip (rotateY 0→180).",
  "Create domino-fall scroll reveal: Sequential staggered animation with delay per card. Transform rotateX (0→90), y (0→400), opacity (1→0). Cards fall like dominoes with perspective, each starting slightly after previous.",
  "Create vortex scroll reveal: Transform in spiral pattern: angle = progress * 4π, radius = (1-progress) * 300, rotate (0→1080), scale (1→0). Cards spiral inward to center point disappearing into vortex.",
  "Create origami-unfold scroll reveal: Transform rotateX (180→0), scaleY (0.2→1), opacity (0→1). Cards unfold from flat folded state like origami paper with staggered delays creating cascade effect.",
  "Create wave-collapse scroll reveal: Transform x using sine wave (sin((i/6)*2π + progress*2π) * 100), scale (1→0.1), rotate (0→180), opacity (1→0). Cards oscillate horizontally in wave pattern while collapsing.",
  "Create dna-helix scroll reveal: Transform in 3D helix pattern: x = cos(angle)*200, z = sin(angle)*200, y = progress*300, rotateY (angle in radians). Cards rotate in double helix DNA strand pattern.",
  "Create phoenix-rise scroll reveal: Transform y (0→-500), x spread based on column (col * progress * 250), rotate (0→360), opacity (1→0). Cards rise upward spreading outward like phoenix wings with rotation.",
  "Create hourglass scroll reveal: Transform scaleX (1 - sin(progress*π)*0.7) for squeeze, rotateY (0→180), y offset based on row. Cards squeeze through hourglass center point while flipping.",
  "Create quantum-shift scroll reveal: Transform x/y with sin/cos glitch (sin(progress*6π)*50), opacity flickering (0.3 + abs(sin(progress*8π))*0.7), rotate (progress*720), blur (progress*3px). Cards phase shift with quantum glitch effect.",
  "Create prism-refraction scroll reveal: Transform at angle (i/6*30-15 degrees), x/y using angle (sin/cos(angle)*progress*400), rotate (angle*progress), hue-rotate filter (i*60deg). Cards separate like light through prism with color shift.",
  "Create nebula-expansion scroll reveal: Transform scale (1 + progress*0.5), rotate (progress*540), distance (pow(progress,1.5)*450), opacity (1→0), blur (progress*8px). Cards expand outward with rotation and blur like cosmic nebula.",
  "Create orbit scroll reveal: Transform in elliptical path: x = cos(angle)*300, y = sin(angle)*180, rotate (-angle*180/π), scale (0.8 + sin*0.3). Cards orbit in elliptical planetary motion with varying size/opacity.",
  "Create matrix-rain scroll reveal: Transform y falling ((progress*600 + i*speed) % 800), x with digital glitch (sin(progress*20π)*10), opacity (sin(distance/800*π)). Cards fall like Matrix digital rain with brightness variation.",
  "Create blackhole scroll reveal: Transform in spiral with gravity: angle = baseAngle + progress*6π, radius = (1-pow(progress,2))*350, rotate (progress*1440), scale (1-pow(progress,2)*0.95), blur (progress*10px). Cards spiral into gravitational singularity."
]

const cards = [
  {
    src: "/bacon-wrapped-bitcoin.jpg",
    title: "Bacon Wrapped Bitcoin",
    description: "The perfect combination of crispy bacon and digital gold",
    effect: "scale-rotate"
  },
  {
    src: "/Baco.jpg",
    title: "Meet Baco",
    description: "The legendary mascot of the bacon revolution",
    effect: "slide-left"
  },
  {
    src: "/artcoin1.png",
    title: "Art Coin Collection",
    description: "Where blockchain meets artistic expression",
    effect: "flip-horizontal"
  },
  {
    src: "/pigunderlight.png",
    title: "Illuminated Vision",
    description: "Bringing light to the future of crypto",
    effect: "bounce-in"
  },
  {
    src: "/baconbg.png",
    title: "Bacon Background",
    description: "The foundation of our delicious ecosystem",
    effect: "wave-in"
  },
  {
    src: "/artcoin2.png",
    title: "Artistic Evolution",
    description: "The next generation of digital collectibles",
    effect: "spiral-in"
  },
  {
    src: "/singlepig.png",
    title: "Solo Swine",
    description: "Standing alone, standing strong in the crypto space",
    effect: "slide-right"
  },
  {
    src: "/artcoin3.png",
    title: "Chromatic Dreams",
    description: "Vibrant colors meet blockchain technology",
    effect: "zoom-blur"
  },
  {
    src: "/pigunderlight1.png",
    title: "Radiant Future",
    description: "Illuminating the path forward",
    effect: "tilt-reveal"
  },
  {
    src: "/artcoin4.png",
    title: "Digital Renaissance",
    description: "Art reimagined for the modern age",
    effect: "elastic-bounce"
  },
  {
    src: "/Bitcoin-Logo.png",
    title: "Bitcoin Legacy",
    description: "The original digital gold standard",
    effect: "rotate-3d"
  },
  {
    src: "/artcoin5.png",
    title: "Cosmic Canvas",
    description: "Where art transcends dimensions",
    effect: "slide-up"
  },
  {
    src: "/wpls-logo.png",
    title: "WPLS Network",
    description: "Building the future of decentralized finance",
    effect: "fade-scale"
  },
  {
    src: "/artcoin6.png",
    title: "Ethereal Artistry",
    description: "Beauty meets blockchain",
    effect: "swing-in"
  },
  {
    src: "/ourpig.png",
    title: "Community Pig",
    description: "Together we build something amazing",
    effect: "typewriter"
  },
  {
    src: "/logo-cartoon.png",
    title: "Cartoon Legacy",
    description: "Fun meets finance in perfect harmony",
    effect: "glitch-in"
  },
  {
    src: "/artcoin-bitcoin.png",
    title: "Kaleidoscope Vision",
    description: "Rotating patterns of digital artistry",
    effect: "kaleidoscope"
  },
  {
    src: "/artcoin1.png",
    title: "Domino Effect",
    description: "Sequential cascade of innovation",
    effect: "domino-fall"
  },
  {
    src: "/artcoin2.png",
    title: "Vortex Portal",
    description: "Spiraling into the future",
    effect: "vortex"
  },
  {
    src: "/artcoin3.png",
    title: "Origami Unfold",
    description: "Unfolding possibilities layer by layer",
    effect: "origami-unfold"
  },
  {
    src: "/artcoin4.png",
    title: "Wave Collapse",
    description: "Riding the crypto wave",
    effect: "wave-collapse"
  },
  {
    src: "/artcoin5.png",
    title: "DNA Helix",
    description: "The genetic code of blockchain",
    effect: "dna-helix"
  },
  {
    src: "/artcoin6.png",
    title: "Phoenix Rising",
    description: "From the ashes to new heights",
    effect: "phoenix-rise"
  },
  {
    src: "/bacon-wrapped-bitcoin.jpg",
    title: "Hourglass Time",
    description: "Time waits for no blockchain",
    effect: "hourglass"
  },
  {
    src: "/Baco.jpg",
    title: "Quantum Leap",
    description: "Phase shifting through dimensions",
    effect: "quantum-shift"
  },
  {
    src: "/baconbg.png",
    title: "Prism Light",
    description: "Separating the spectrum of value",
    effect: "prism-refraction"
  },
  {
    src: "/pigunderlight.png",
    title: "Nebula Dreams",
    description: "Expanding cosmic possibilities",
    effect: "nebula-expansion"
  },
  {
    src: "/pigunderlight1.png",
    title: "Orbital Motion",
    description: "Circling the blockchain universe",
    effect: "orbit"
  },
  {
    src: "/ourpig.png",
    title: "Matrix Code",
    description: "Falling through the digital rain",
    effect: "matrix-rain"
  },
  {
    src: "/singlepig.png",
    title: "Black Hole",
    description: "Gravity well of innovation",
    effect: "blackhole"
  }
]

function Card({ src, title, description, index, effect }: typeof cards[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Define different animation variants based on effect type
  const getAnimationStyle = () => {
    switch (effect) {
      case "scale-rotate":
        return {
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]),
          rotate: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-10, 0, 0, 10])
        }
      case "slide-left":
        return {
          x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-200, 0, 0, -200]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.2, 1, 1, 1.2])
        }
      case "slide-right":
        return {
          x: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [200, 0, 0, 200]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          rotateY: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [90, 0, 0, -90])
        }
      case "flip-horizontal":
        return {
          rotateY: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [180, 0, 0, -180]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])
        }
      case "bounce-in":
        return {
          y: useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4, 0.5], [-300, 20, -10, 5, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4, 0.5], [0.3, 1.1, 0.9, 1.05, 1])
        }
      case "wave-in":
        return {
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          x: useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          rotate: useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 0])
        }
      case "spiral-in":
        return {
          rotate: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [720, 0, 0, -720]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "zoom-blur":
        return {
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [3, 1, 1, 0.3]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "tilt-reveal":
        return {
          rotateX: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [90, 0, 0, -90]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])
        }
      case "elastic-bounce":
        return {
          scale: useTransform(scrollYProgress, [0, 0.2, 0.3, 0.35, 0.4, 0.5], [0, 1.3, 0.8, 1.1, 0.95, 1]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]),
          rotate: useTransform(scrollYProgress, [0, 0.5, 1], [-45, 0, 45])
        }
      case "rotate-3d":
        return {
          rotateY: useTransform(scrollYProgress, [0, 0.5, 1], [0, 360, 720]),
          rotateX: useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])
        }
      case "slide-up":
        return {
          y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [300, 0, 0, -300]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
        }
      case "fade-scale":
        return {
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 1.5]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "swing-in":
        return {
          rotate: useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4, 0.5], [45, -30, 20, -10, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
        }
      case "glitch-in":
        return {
          x: useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2, 0.25, 0.3], [0, -20, 30, -15, 10, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.3, 0.7, 1], [0, 0.5, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.1, 1, 1, 0.9])
        }
      case "kaleidoscope":
        return {
          rotate: useTransform(scrollYProgress, [0, 0.5, 1], [0, 360, 720]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          rotateY: useTransform(scrollYProgress, [0, 0.5, 1], [0, 90, 180]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "domino-fall":
        return {
          rotateX: useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 90]),
          y: useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, 400]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "vortex":
        return {
          rotate: useTransform(scrollYProgress, [0, 1], [0, 1080]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [1, 0])
        }
      case "origami-unfold":
        return {
          rotateX: useTransform(scrollYProgress, [0, 0.5, 1], [180, 0, 0]),
          scaleY: useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 1]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 0.7, 1], [0, 1, 1, 0])
        }
      case "wave-collapse":
        return {
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.1]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
          opacity: useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
        }
      case "dna-helix":
        return {
          rotateY: useTransform(scrollYProgress, [0, 1], [0, 720]),
          y: useTransform(scrollYProgress, [0, 1], [0, 300]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "phoenix-rise":
        return {
          y: useTransform(scrollYProgress, [0, 1], [0, -500]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "hourglass":
        return {
          scaleX: useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.3, 1]),
          rotateY: useTransform(scrollYProgress, [0, 1], [0, 180]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "quantum-shift":
        return {
          x: useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 50, -50, 30, -30, 0]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 720]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.5]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
        }
      case "prism-refraction":
        return {
          x: useTransform(scrollYProgress, [0, 1], [0, 200]),
          y: useTransform(scrollYProgress, [0, 1], [0, -60]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "nebula-expansion":
        return {
          scale: useTransform(scrollYProgress, [0, 1], [1, 2.5]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 540]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])
        }
      case "orbit":
        return {
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, 360]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 0.8]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "matrix-rain":
        return {
          y: useTransform(scrollYProgress, [0, 1], [-100, 600]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }
      case "blackhole":
        return {
          rotate: useTransform(scrollYProgress, [0, 1], [0, 1440]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.05]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        }
      default:
        return {
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
        }
    }
  }

  const animationStyle = getAnimationStyle()

  return (
    <div ref={ref} className="h-screen flex items-center justify-center py-20">
      <motion.div
        style={animationStyle}
        className="max-w-2xl w-full mx-4"
      >
        <div className="relative h-96 rounded-2xl overflow-hidden border-4 border-orange-500/30 shadow-2xl">
          <PromptOverlay effectNumber={index + 1} effectName={effect} prompt={scrollRevealPrompts[index]} />
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: false }}
          >
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: false }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: false }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mt-4 flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: false }}
            >
              <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold">
                #{index + 1} - {effect}
              </span>
              <span className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-bold">
                Featured
              </span>
            </motion.div>
          </motion.div>

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(255, 107, 53, 0.3)",
                "0 0 40px rgba(255, 107, 53, 0.6)",
                "0 0 20px rgba(255, 107, 53, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function DemoScrollReveal() {
  return (
    <div className="bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Scroll-Triggered Showcase
          </h1>
          <p className="text-2xl text-gray-400 mb-4">
            31 unique scroll reveal animations
          </p>
          <p className="text-lg text-gray-500 mb-8">
            Each card features a different animation effect
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-orange-500 text-4xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>

      {cards.map((card, index) => (
        <Card key={index} {...card} index={index} />
      ))}

      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            You've experienced all 31 effects!
          </h2>
          <p className="text-xl text-gray-400">Scroll back up to see more</p>
        </motion.div>
      </div>
    </div>
  )
}
