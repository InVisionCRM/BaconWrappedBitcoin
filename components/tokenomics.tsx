"use client"

import React from "react"

export function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 px-0 bg-black text-white scroll-mt-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Baconomics</h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 text-left">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white">Total Supply</div>
              <div className="text-xl font-semibold">TBA</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white">Liquidity</div>
              <div className="text-xl font-semibold">TBA</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-white">Community</div>
              <div className="text-xl font-semibold">TBA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
