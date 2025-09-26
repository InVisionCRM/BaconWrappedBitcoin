"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { LiteVideo } from "@/components/ui/lite-video"
// Video background implementation

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Bacon Wrapped Bitcoin hero"
      className="relative overflow-hidden px-0"
    >
      {/* Video container that determines section size */}
      <div className="relative w-full">
        <LiteVideo
          className="w-full h-auto object-contain object-center"
          srcMobile="/bitcoin.mp4"
          srcDesktop="/bitcoin.mp4"
          immediate={true}
          aria-hidden="true"
        />
        {/* Readability overlay */}
        <div className="absolute inset-0 -z-20 bg-black/40" />
      </div>
    </section>
  )
}
