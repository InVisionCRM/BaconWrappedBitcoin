"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Users, Coins } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on PulseChain for blazing fast transactions that are as quick as bacon sizzling in a pan!",
    emoji: "⚡",
  },
  {
    icon: Shield,
    title: "Crispy Secure",
    description: "Smart contract audited and locked tighter than a bacon-wrapped filet. Your investment is safe!",
    emoji: "🛡️",
  },
  {
    icon: Users,
    title: "Sizzling Community",
    description: "Join thousands of bacon lovers and crypto enthusiasts in our growing, vibrant community!",
    emoji: "🔥",
  },
  {
    icon: Coins,
    title: "Deflationary",
    description: "Every transaction burns tokens, making BWBTC rarer than perfectly cooked bacon!",
    emoji: "💎",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Why Choose <span className="text-primary">BWBTC</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            More than just a memecoin - we're serving up the perfect blend of humor, utility, and mouth-watering
            returns!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl mb-2 wiggle">{feature.emoji}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
