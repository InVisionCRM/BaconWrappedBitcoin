"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🥓₿ BWBTC
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#tokenomics" className="text-foreground hover:text-primary transition-colors">
              Tokenomics
            </a>
            <a href="#roadmap" className="text-foreground hover:text-primary transition-colors">
              Roadmap
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
            <Button className="pulse-glow">Buy BWBTC</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              <a href="#features" className="block px-3 py-2 text-foreground hover:text-primary">
                Features
              </a>
              <a href="#tokenomics" className="block px-3 py-2 text-foreground hover:text-primary">
                Tokenomics
              </a>
              <a href="#roadmap" className="block px-3 py-2 text-foreground hover:text-primary">
                Roadmap
              </a>
              <a href="#community" className="block px-3 py-2 text-foreground hover:text-primary">
                Community
              </a>
              <Button className="w-full mt-2">Buy BWBTC</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
