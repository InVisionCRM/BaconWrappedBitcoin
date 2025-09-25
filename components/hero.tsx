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
      className="relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100dvh-64px)] flex items-center"
    >
      {/* Full-bleed looping video background */}
      <LiteVideo
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        srcMobile="/bitcoinmobile.webm"
        srcDesktop="/bitcoin.webm"
        aria-hidden="true"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-20 bg-black/40" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Button asChild size="lg" className="text-lg px-8 py-4 pulse-glow pointer-events-auto">
            <Link href="#how-to-buy" aria-label="Buy BWBTC now">
              Buy BWBTC Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
