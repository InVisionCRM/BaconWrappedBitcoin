import { Hero } from "@/components/hero"
// Removed Features and Tokenomics sections per request
import { FAQ } from "@/components/faq"
// Removed HowToBuy per request
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { HowItWorks } from "@/components/how-it-works"
import { BeforeAfter } from "@/components/before-after"
import { PixelShowcase } from "@/components/pixel-showcase"
import { SwapSection } from "@/components/swap-section"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Navigation />
      <Hero />
      <SwapSection />
      <HowItWorks />
      
      <section id="btc-video" className="bg-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="w-[180px] sm:w-[220px] md:w-[280px] overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl">
            <video
              src="/btcfusiontubeloop.mp4"
              className="h-auto w-full"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>
      <BeforeAfter />
      <PixelShowcase />
      <FAQ />
      <Footer />
    </main>
  )
}
