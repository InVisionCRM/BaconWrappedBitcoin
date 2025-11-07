"use client"

import Link from "next/link"
import { useState } from "react"
import { MultiDemo01GridCascade } from "@/components/parallax/multi-demo-01-grid-cascade"
import { MultiDemo02SpiralGrid } from "@/components/parallax/multi-demo-02-spiral-grid"
import { MultiDemo03WaveGrid } from "@/components/parallax/multi-demo-03-wave-grid"
import { MultiDemo04ExplodeGrid } from "@/components/parallax/multi-demo-04-explode-grid"
import { MultiDemo05FlipGrid } from "@/components/parallax/multi-demo-05-flip-grid"
import { MultiDemo06DominoCascade } from "@/components/parallax/multi-demo-06-domino-cascade"
import { MultiDemo07GlowPulse } from "@/components/parallax/multi-demo-07-glow-pulse"
import { MultiDemo08GradientWave } from "@/components/parallax/multi-demo-08-gradient-wave"
import { MultiDemo09MagneticCluster } from "@/components/parallax/multi-demo-09-magnetic-cluster"
import { MultiDemo10Kaleidoscope } from "@/components/parallax/multi-demo-10-kaleidoscope"
import { MultiDemo11OrbitCluster } from "@/components/parallax/multi-demo-11-orbit-cluster"
import { MultiDemo12StackAccordion } from "@/components/parallax/multi-demo-12-stack-accordion"
import { MultiDemo13SlideCarousel } from "@/components/parallax/multi-demo-13-slide-carousel"
import { MultiDemo14ZoomBurst } from "@/components/parallax/multi-demo-14-zoom-burst"
import { MultiDemo15DiagonalSweep } from "@/components/parallax/multi-demo-15-diagonal-sweep"
import { MultiDemo16BounceGrid } from "@/components/parallax/multi-demo-16-bounce-grid"
import { MultiDemo17RotateAssembly } from "@/components/parallax/multi-demo-17-rotate-assembly"
import { MultiDemo18FadeMatrix } from "@/components/parallax/multi-demo-18-fade-matrix"
import { MultiDemo19PerspectiveDepth } from "@/components/parallax/multi-demo-19-perspective-depth"
import { MultiDemo20ElasticSpring } from "@/components/parallax/multi-demo-20-elastic-spring"

const demos = [
  { id: 1, name: "Grid Cascade", component: MultiDemo01GridCascade, description: "Cards fly in from all directions to grid" },
  { id: 2, name: "Spiral Grid", component: MultiDemo02SpiralGrid, description: "Cards spiral together into formation" },
  { id: 3, name: "Wave Grid", component: MultiDemo03WaveGrid, description: "Wave-like motion settles into grid" },
  { id: 4, name: "Explode Grid", component: MultiDemo04ExplodeGrid, description: "Cards explode outward then reform" },
  { id: 5, name: "Flip Grid", component: MultiDemo05FlipGrid, description: "Synchronized 3D card flips" },
  { id: 6, name: "Domino Cascade", component: MultiDemo06DominoCascade, description: "Sequential tipping chain reaction" },
  { id: 7, name: "Glow Pulse", component: MultiDemo07GlowPulse, description: "Synchronized glowing animations" },
  { id: 8, name: "Gradient Wave", component: MultiDemo08GradientWave, description: "Flowing color transitions" },
  { id: 9, name: "Magnetic Cluster", component: MultiDemo09MagneticCluster, description: "Cards pulled by magnetic forces" },
  { id: 10, name: "Kaleidoscope", component: MultiDemo10Kaleidoscope, description: "Symmetric rotation and reflection" },
  { id: 11, name: "Orbit Cluster", component: MultiDemo11OrbitCluster, description: "Cards orbit into center formation" },
  { id: 12, name: "Stack Accordion", component: MultiDemo12StackAccordion, description: "Vertical stacking with depth" },
  { id: 13, name: "Slide Carousel", component: MultiDemo13SlideCarousel, description: "Horizontal sliding carousel effect" },
  { id: 14, name: "Zoom Burst", component: MultiDemo14ZoomBurst, description: "Explosive zoom from center" },
  { id: 15, name: "Diagonal Sweep", component: MultiDemo15DiagonalSweep, description: "Cards sweep in diagonally" },
  { id: 16, name: "Bounce Grid", component: MultiDemo16BounceGrid, description: "Elastic bouncing entry effect" },
  { id: 17, name: "Rotate Assembly", component: MultiDemo17RotateAssembly, description: "Spinning cards align to grid" },
  { id: 18, name: "Fade Matrix", component: MultiDemo18FadeMatrix, description: "Sequential fade-in pattern" },
  { id: 19, name: "Perspective Depth", component: MultiDemo19PerspectiveDepth, description: "3D depth with z-axis motion" },
  { id: 20, name: "Elastic Spring", component: MultiDemo20ElasticSpring, description: "Spring physics with damping" }
]

export default function MultiCardParallaxShowcase() {
  const [selectedDemo, setSelectedDemo] = useState(0)
  const [showSelector, setShowSelector] = useState(true)
  const [cardCount, setCardCount] = useState(8)

  const CurrentDemo = demos[selectedDemo].component

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
          <h2 className="text-2xl font-bold text-white mb-2">Multi-Card Parallax</h2>
          <p className="text-sm text-white/60 mb-4">Grid-based animations with multiple cards</p>

          {/* Card Count Selector */}
          <div className="mb-6">
            <label className="text-sm text-white/60 mb-2 block">Cards per Demo</label>
            <div className="flex gap-2">
              {[2, 4, 6, 8].map((count) => (
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

          {/* Demo List */}
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

      {/* Current Demo */}
      <div className="relative" key={`${selectedDemo}-${cardCount}`}>
        <CurrentDemo cardCount={cardCount} />
      </div>

      {/* Demo Title Overlay */}
      {!showSelector && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full">
          <div className="text-white text-center">
            <span className="font-bold">{demos[selectedDemo].name}</span>
            <span className="text-white/60 ml-2">({selectedDemo + 1}/{demos.length})</span>
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
