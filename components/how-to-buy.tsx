"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, ArrowRight, Shield, Zap } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Set Up Your Wallet",
    description: "Download and set up a PulseChain compatible wallet like MetaMask or PulseWallet",
    icon: Wallet,
    details: "Make sure to add PulseChain network to your wallet settings",
  },
  {
    step: 2,
    title: "Get PLS for Gas",
    description: "You'll need PLS tokens to pay for transaction fees on PulseChain",
    icon: Zap,
    details: "Bridge from Ethereum or buy PLS from a supported exchange",
  },
  {
    step: 3,
    title: "Find a DEX",
    description: "Use a PulseChain decentralized exchange to swap for BWBTC",
    icon: ArrowRight,
    details: "Popular options include PulseX and other PulseChain DEXs",
  },
  {
    step: 4,
    title: "Verify & Swap",
    description: "Always verify the contract address before making any swaps",
    icon: Shield,
    details: "Double-check the contract address and start with a small test transaction",
  },
]

export function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            How to Buy <span className="text-primary">BWBTC</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Follow these simple steps to get your hands on some delicious Bacon Wrapped Bitcoin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group relative"
            >
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary rounded-full w-fit group-hover:scale-110 transition-transform">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <Badge variant="secondary" className="w-fit mx-auto mb-2">
                  Step {step.step}
                </Badge>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-sm">{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{step.details}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Remember: Always do your own research and never invest more than you can afford to lose
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="pulse-glow">
                  View on DEX
                </Button>
                <Button variant="outline" size="lg">
                  Check Contract
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Contract Address: Coming soon on PulseChain</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
