"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Animated Bitcoin wrapped in bacon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="text-8xl md:text-9xl float-animation">🥓</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl md:text-7xl bounce-gentle">₿</div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Bacon Wrapped
            </span>
            <br />
            <span className="text-foreground">Bitcoin</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            The most deliciously decentralized memecoin on PulseChain! Where crispy bacon meets digital gold in perfect
            harmony.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-4 pulse-glow">
              Buy BWBTC Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
              View Chart
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">BWBTC</div>
              <div className="text-muted-foreground">Ticker Symbol</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">PulseChain</div>
              <div className="text-muted-foreground">Blockchain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100% Sizzle</div>
              <div className="text-muted-foreground">Guaranteed Fun</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
