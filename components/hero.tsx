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
      className="relative overflow-hidden pt-24 pb-12 px-0 min-h-[calc(100dvh-64px)] flex items-center"
    >
      {/* Full-bleed looping video background */}
      <LiteVideo
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        srcMobile="/bitcoinmobile.mp4"
        srcDesktop="/bitcoin.webm"
        immediate={true}
        aria-hidden="true"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-20 bg-black/40" />

      <div className="max-w-7xl mx-auto w-full" />
    </section>
  )
}
