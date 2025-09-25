"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const baconDistribution = [
  { label: "Crispy Strips", percentage: 40, color: "bg-primary", description: "The crunchiest part of our portfolio" },
  { label: "Chewy Bits", percentage: 30, color: "bg-accent", description: "For those who like texture variety" },
  { label: "Bacon Grease", percentage: 20, color: "bg-secondary", description: "Essential for flavor enhancement" },
  { label: "Bitcoin Seasoning", percentage: 10, color: "bg-muted", description: "Just a pinch of digital magic" },
]

export function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            <span className="text-primary">Bacon Distribution</span> Science
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            After extensive research in our kitchen laboratory, we've determined the perfect bacon-to-bitcoin ratio!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {baconDistribution.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{item.label}</CardTitle>
                    <span className="text-2xl font-bold text-primary">{item.percentage}%</span>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={item.percentage} className="h-3" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center lg:text-left">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4 float-animation">🥓₿</div>
                <CardTitle className="text-2xl mb-4">Total Bacon Supply</CardTitle>
                <div className="text-4xl font-bold text-primary mb-2">∞</div>
                <CardDescription className="text-lg">Strips (Unlimited Breakfast)</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-primary">100% Delicious</div>
                    <div className="text-muted-foreground">Scientifically proven</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">0% Vegetables</div>
                    <div className="text-muted-foreground">As nature intended</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
