"use client"

import { ParallaxCard } from "./parallax-card"

const cards = [
  {
    title: "Smoke Disperse",
    description: "Cards emerge from thick smoke, starting blurred and oversized before clearing and settling into sharp focus.",
    gradient: "from-purple-600/20 to-indigo-600/20",
    image: "/pigunderlight.png"
  },
  {
    title: "Fog Clearing",
    description: "Watch fog clear as cards materialize from hazy, unclear states into crisp, readable content.",
    gradient: "from-indigo-600/20 to-blue-600/20",
    image: "/pigunderlight1.png"
  },
  {
    title: "Mist Dissipate",
    description: "Cards push through mist, gradually becoming focused and defined as blur effects fade away.",
    gradient: "from-blue-600/20 to-cyan-600/20",
    image: "/pig-static.PNG"
  },
  {
    title: "Vapor Solidify",
    description: "Experience vapor solidifying into matter as cards transform from blur to clarity.",
    gradient: "from-cyan-600/20 to-teal-600/20",
    image: "/Baco.jpg"
  },
  {
    title: "Cloud Formation",
    description: "Cards condense from cloud-like blur into solid, readable forms with smooth transitions.",
    gradient: "from-teal-600/20 to-emerald-600/20",
    image: "/singlepig.png"
  }
]

export function Demo20Smoke() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-7xl font-bold text-white">Smoke Disperse</h1>
            <p className="text-xl text-white/60">Blur to clarity transitions</p>
            <p className="text-sm text-white/40 mt-8">Scroll down to see the animations ↓</p>
          </div>
        </div>
        {cards.map((card, index) => (
          <ParallaxCard
            key={index}
            {...card}
            animationType="smoke-disperse"
            index={index}
          />
        ))}
        <div className="h-screen" />
      </div>
    </div>
  )
}
