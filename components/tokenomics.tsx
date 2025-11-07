"use client"

import React from "react"
import { WavyBackground } from "@/components/ui/wavy-background"
import { NumberTicker } from "@/components/ui/number-ticker"

export function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 px-0 scroll-mt-24">
      <div className="absolute inset-0 -bottom-[20px]">
        <WavyBackground
          containerClassName="!h-[calc(100%+20px)]"
          backgroundFill="black"
          colors={["#d4af37", "#FFD700", "#8B4513", "#DC143C"]}
          waveOpacity={0.4}
          blur={5}
          speed="fast"
        />
      </div>
      <div className="relative mx-auto max-w-7xl text-white">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Baconomics</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 text-left min-w-0">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white">Total Supply</div>
              <div className="text-xl font-semibold text-white">
                <NumberTicker
                  value={1000000000}
                  delay={0.2}
                  className="text-white"
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white">Liquidity</div>
              <div className="text-xl font-semibold text-white">
                $<NumberTicker
                  value={156700}
                  delay={0.4}
                  className="text-white"
                />K
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white">Community</div>
              <div className="text-xl font-semibold text-white">
                <NumberTicker
                  value={1247}
                  delay={0.6}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
