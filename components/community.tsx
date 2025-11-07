"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Users, Zap, Heart } from "lucide-react"

const socialLinks = [
  {
    name: "Telegram",
    icon: MessageCircle,
    members: "15,000+",
    description: "Join our main community chat",
    color: "bg-blue-500",
    href: "#",
  },
  {
    name: "Discord",
    icon: Users,
    members: "8,500+",
    description: "Gaming and voice chats",
    color: "bg-indigo-500",
    href: "#",
  },
  {
    name: "Twitter",
    icon: Zap,
    members: "25,000+",
    description: "Latest updates and memes",
    color: "bg-sky-500",
    href: "#",
  },
  {
    name: "Reddit",
    icon: Heart,
    members: "5,000+",
    description: "Deep discussions and DD",
    color: "bg-orange-500",
    href: "#",
  },
]

export function Community() {
  return (
    <section id="community" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Join the <span className="text-primary">Bacon Army</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connect with fellow bacon enthusiasts, share memes, and stay updated on all things BWBTC!
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-12 min-w-0">
          {socialLinks.map((social, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardHeader>
                <div
                  className={`mx-auto mb-4 p-4 ${social.color} rounded-full w-fit group-hover:scale-110 transition-transform`}
                >
                  <social.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{social.name}</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary">{social.members}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{social.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="text-4xl mb-4 bounce-gentle">🥓🎉</div>
              <CardTitle className="text-2xl">Ready to Get Crispy?</CardTitle>
              <CardDescription className="text-lg">
                Don't miss out on the most delicious opportunity in crypto!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="pulse-glow">
                  Buy BWBTC Now
                </Button>
                <Button variant="outline" size="lg">
                  View Contract
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Contract Address: 0x...coming soon on PulseChain</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
