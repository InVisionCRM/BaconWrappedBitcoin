"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { useState, useRef } from "react"
import { Play } from "lucide-react"

export function HowItWorks() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (!videoRef.current) return

    videoRef.current.muted = false
    videoRef.current.volume = 1
    videoRef.current.play()
    setIsPlaying(true)
  }
  const testimonials = [
    {
      name: "Step 1: Lab-Raised Perfection",
      designation: "",
      quote:
        "Our bacon begins in a highly classified bacon biolab where lab-raised pigs enjoy spa playlists, ergonomic mud baths, and daily affirmations. Using top-secret marbling algorithms and proprietary oink-to-crisp ratios, we cultivate the ideal strip—ethically engineered for maximum sizzle and minimal guilt. The exact process is sealed tighter than grandma’s cast-iron skillet.",
      src: "/pig.png",
    },
    {
      name: "Step 2: NASA-Grade Frying Protocol",
      designation: "",
      quote:
        "We fry with a flight plan. Inspired by NASA, our frying procedure includes preheat telemetry, flip cadence control, and mission-critical crisp checkpoints. Every strip is iteratively tested in zero-gravity simulations (okay, mostly zero patience). The result: bacon so consistent, astronauts would trade moon rocks for it.",
      src: "/cook.png",
    },
    {
      name: "Step 3: Advanced Bitcoin Wrapping",
      designation: "",
      quote:
        "Behold the patented BaconWrap™ protocol. Using cryptographic glaze and hash-brown hashing, we hermetically wrap Bitcoin in a delicious layer of decentralized crisp. Every wrap is verified on-chain and seasoned with a pinch of proof-of-sizzle. It’s security you can literally taste (please don’t lick your screen).",
      src: "/wrapbtc.png",
    },
    {
      name: "Step 4: Bacon on the Blockchain",
      designation: "",
      quote:
        "Finally, the pigs, the pan, and the protocol meet the chain. By fusing culinary science with cryptographic spice, we deliver a future where breakfast runs on block time. This isn’t just innovation—it’s a full-stack brunch revolution. Welcome to Bacon Wrapped Bitcoin.",
      src: "/pigbtc.png",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-0 scroll-mt-24 bg-black text-white dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
        
        {/* Video Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white chango-regular whitespace-normal break-words px-4">
            Don't have time to read? Watch our short video explaining the process!
          </h3>
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl">
              <video
                ref={videoRef}
                className="w-full h-[500px] md:h-[600px] rounded-lg shadow-2xl object-cover"
                src="/howitworks.mp4"
                aria-label="How Bacon Wrapped Bitcoin Works"
                autoPlay={false}
                controls
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-lg"
                  aria-label="Play video"
                >
                  <div className="bg-white/90 hover:bg-white rounded-full p-4 transition-colors">
                    <Play className="h-12 w-12 text-black ml-1" fill="currentColor" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

