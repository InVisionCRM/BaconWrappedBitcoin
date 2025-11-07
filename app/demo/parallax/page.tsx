"use client"

import Link from "next/link"
import { useState } from "react"
import { Demo01Spiral } from "@/components/parallax/demo-01-spiral"
import { Demo02Flip } from "@/components/parallax/demo-02-flip"
import { Demo03Origami } from "@/components/parallax/demo-03-origami"
import { Demo04Liquid } from "@/components/parallax/demo-04-liquid"
import { Demo05Quantum } from "@/components/parallax/demo-05-quantum"
import { Demo06Kaleidoscope } from "@/components/parallax/demo-06-kaleidoscope"
import { Demo07Gravity } from "@/components/parallax/demo-07-gravity"
import { Demo08Magnetic } from "@/components/parallax/demo-08-magnetic"
import { Demo09Portal } from "@/components/parallax/demo-09-portal"
import { Demo10Fractal } from "@/components/parallax/demo-10-fractal"
import { Demo11Wave } from "@/components/parallax/demo-11-wave"
import { Demo12Eclipse } from "@/components/parallax/demo-12-eclipse"
import { Demo13Vortex } from "@/components/parallax/demo-13-vortex"
import { Demo14Bounce } from "@/components/parallax/demo-14-bounce"
import { Demo15Curtain } from "@/components/parallax/demo-15-curtain"
import { Demo16Puzzle } from "@/components/parallax/demo-16-puzzle"
import { Demo17Ribbon } from "@/components/parallax/demo-17-ribbon"
import { Demo18Accordion } from "@/components/parallax/demo-18-accordion"
import { Demo19Domino } from "@/components/parallax/demo-19-domino"
import { Demo20Smoke } from "@/components/parallax/demo-20-smoke"
import { Demo21Shatter } from "@/components/parallax/demo-21-shatter"
import { Demo22Bubble } from "@/components/parallax/demo-22-bubble"
import { Demo23Typewriter } from "@/components/parallax/demo-23-typewriter"
import { Demo24Carousel } from "@/components/parallax/demo-24-carousel"
import { Demo25Pendulum } from "@/components/parallax/demo-25-pendulum"
import { Demo26GridCascade } from "@/components/parallax/demo-26-grid-cascade"

const demos = [
  { id: 1, name: "Spiral In", component: Demo01Spiral, description: "Cards spiral into existence" },
  { id: 2, name: "Flip Cascade", component: Demo02Flip, description: "3D card flips in sequence" },
  { id: 3, name: "Origami Unfold", component: Demo03Origami, description: "Geometric paper-like animations" },
  { id: 4, name: "Liquid Rise", component: Demo04Liquid, description: "Fluid vertical animations" },
  { id: 5, name: "Quantum Shift", component: Demo05Quantum, description: "Multi-state particle animations" },
  { id: 6, name: "Kaleidoscope", component: Demo06Kaleidoscope, description: "Multi-directional spiral motion" },
  { id: 7, name: "Gravity Pull", component: Demo07Gravity, description: "Physics-based falling animations" },
  { id: 8, name: "Magnetic Snap", component: Demo08Magnetic, description: "High-energy spring animations" },
  { id: 9, name: "Portal Emerge", component: Demo09Portal, description: "Interdimensional entrance effects" },
  { id: 10, name: "Fractal Expand", component: Demo10Fractal, description: "Mathematical growth patterns" },
  { id: 11, name: "Wave Crash", component: Demo11Wave, description: "Ocean-inspired motion" },
  { id: 12, name: "Eclipse Reveal", component: Demo12Eclipse, description: "Circular reveal animations" },
  { id: 13, name: "Vortex Spin", component: Demo13Vortex, description: "Extreme rotation effects" },
  { id: 14, name: "Bounce Settle", component: Demo14Bounce, description: "Playful spring physics" },
  { id: 15, name: "Curtain Raise", component: Demo15Curtain, description: "Bottom-up reveal animations" },
  { id: 16, name: "Puzzle Assemble", component: Demo16Puzzle, description: "Multi-directional convergence" },
  { id: 17, name: "Ribbon Unfurl", component: Demo17Ribbon, description: "Horizontal 3D unfurling" },
  { id: 18, name: "Accordion Expand", component: Demo18Accordion, description: "Vertical scaling animations" },
  { id: 19, name: "Domino Fall", component: Demo19Domino, description: "Sequential tipping animations" },
  { id: 20, name: "Smoke Disperse", component: Demo20Smoke, description: "Blur to clarity transitions" },
  { id: 21, name: "Shatter Reform", component: Demo21Shatter, description: "Fragment to whole transitions" },
  { id: 22, name: "Bubble Float", component: Demo22Bubble, description: "Gentle upward floating" },
  { id: 23, name: "Typewriter Build", component: Demo23Typewriter, description: "Horizontal text-like reveals" },
  { id: 24, name: "Carousel Rotate", component: Demo24Carousel, description: "3D Y-axis rotations" },
  { id: 25, name: "Pendulum Swing", component: Demo25Pendulum, description: "Rotational swing physics" },
  { id: 26, name: "Grid Cascade", component: Demo26GridCascade, description: "Multi-card grid formation" }
]

export default function ParallaxShowcase() {
  const [selectedDemo, setSelectedDemo] = useState(0)
  const [showSelector, setShowSelector] = useState(true)
  const [cardCount, setCardCount] = useState(5)

  const CurrentDemo = selectedDemo === -1 ? null : demos[selectedDemo].component

  // Scroll to top when demo changes
  const handleDemoChange = (newIndex: number) => {
    setSelectedDemo(newIndex)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Link
          href="/demo"
          className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/30 transition-all"
        >
          ← Back to Demos
        </Link>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm hover:bg-orange-500/30 text-white rounded-full border border-orange-500/50 transition-all"
        >
          {showSelector ? "Hide" : "Show"} Menu
        </button>
      </div>

      {/* Demo Selector */}
      {showSelector && (
        <div className="fixed right-4 top-4 z-50 w-80 max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Parallax Demos</h2>

          {/* Card Count Selector */}
          <div className="mb-6">
            <label className="text-sm text-white/60 mb-2 block">Cards per Demo</label>
            <div className="flex gap-2">
              {[1, 2, 4, 8].map((count) => (
                <button
                  key={count}
                  onClick={() => setCardCount(count)}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    cardCount === count
                      ? "bg-orange-500 text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="space-y-2">
            {demos.map((demo, index) => (
              <button
                key={demo.id}
                onClick={() => handleDemoChange(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedDemo === index
                    ? "bg-orange-500/30 border border-orange-500/50"
                    : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
              >
                <div className="font-semibold text-white text-sm">
                  {demo.id}. {demo.name}
                </div>
                <div className="text-xs text-white/60 mt-1">{demo.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Current Demo - key forces re-mount on demo change */}
      <div className="relative" key={`${selectedDemo}-${cardCount}`}>
        {CurrentDemo && <CurrentDemo cardCount={cardCount} />}
      </div>

      {/* Demo Title Overlay */}
      {!showSelector && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full">
          <div className="text-white text-center">
            <span className="font-bold">{demos[selectedDemo].name}</span>
            <span className="text-white/60 ml-2">({selectedDemo + 1}/26)</span>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => handleDemoChange(selectedDemo > 0 ? selectedDemo - 1 : demos.length - 1)}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/30 transition-all"
        >
          ← Previous
        </button>
        <button
          onClick={() => handleDemoChange(selectedDemo < demos.length - 1 ? selectedDemo + 1 : 0)}
          className="px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/30 transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
