"use client"

import React from "react"
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel"
import { LinkPreview } from "@/components/ui/link-preview"

const cards = [
  {
    src: "/im.png",
    title: "Set up wallet",
    category: "Step 1",
    content: (
      <div className="max-w-none">
        <p className="abeezee-regular text-white/80 text-lg md:text-xl leading-relaxed">
          We recommend using the
          {" "}
          <LinkPreview url="https://internetmoney.io/" className="text-white font-semibold">Internet Money Wallet</LinkPreview>
          . It supports
          {" "}
          <LinkPreview url="https://pulsechain.com/" className="text-white font-semibold">PulseChain</LinkPreview>
          {" "}
          natively and allows cross-chain swaps, buying directly with credit card, and an in‑app browser for easy bridging via
          {" "}
          <LinkPreview url="https://libertyswap.finance/" className="text-white font-semibold">LibertySwap</LinkPreview>
          .
        </p>
      </div>
    ),
    imageClassName: "blur-[2px] sm:blur-[3px]",
    overlayClassName: "bg-black/30",
  },
  {
    src: "/storefrontB&W.png",
    title: "Get PLS for Gas",
    category: "Step 2",
    content: (
      <div className="prose prose-invert max-w-none">
        <p>Bridge from Ethereum or acquire PLS from a supported on-ramp to cover transaction fees.</p>
      </div>
    ),
  },
  {
    src: "/bacon-wrapped-bitcoin.jpg",
    title: "Find a DEX",
    category: "Step 3",
    content: (
      <div className="prose prose-invert max-w-none">
        <p>Open a PulseChain DEX (e.g., PulseX). Connect your wallet.</p>
      </div>
    ),
  },
  {
    src: "/wrapbtc.png",
    title: "Verify & Swap",
    category: "Step 4",
    content: (
      <div className="prose prose-invert max-w-none">
        <p>Verify the official contract. Start with a small test swap for BWBTC.</p>
      </div>
    ),
  },
]

export function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 px-0 scroll-mt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">How to Buy</h2>
          <p className="text-white/70 mt-2">Follow these simple steps to get BWBTC on PulseChain.</p>
        </div>
        <Carousel
          items={cards.map((card, idx) => (
            <AppleCard key={idx} card={card as any} index={idx} layout />
          ))}
        />
      </div>
    </section>
  )
}
