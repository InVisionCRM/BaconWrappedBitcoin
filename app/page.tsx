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
import { Tokenomics } from "@/components/tokenomics"
import { HowToBuy } from "@/components/how-to-buy"
import { PixelImage } from "@/components/ui/pixel-image"
import { PigFusionSection } from "@/components/pig-fusion"
import { LiteVideo } from "@/components/ui/lite-video"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Navigation />
      <Hero />
      <Tokenomics />
      <HowItWorks />
      <SwapSection />
      <HowToBuy />
      <section id="our-team" className="bg-black text-white py-20 px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Our Team</h2>
            <p className="text-white mt-2 max-w-2xl mx-auto">
              Meet our dedicated team of scientists and engineers pushing the limits of crispy innovation—smart,
              relentless, and obsessed with perfecting the Bacon Wrapped Bitcoin experience.
            </p>
          </div>
          <div className="flex justify-center">
            <PixelImage
              src="/scienctists.png"
              grid="6x4"
              className="w-full max-w-5xl h-[min(60vh,520px)]"
              pixelFadeInDuration={3000}
              maxAnimationDelay={1500}
              colorRevealDelay={1200}
              objectFit="cover"
              rounded={false}
            />
          </div>
        </div>
      </section>
      <PigFusionSection />
      
      {/* Pig Loop Section */}
      <section id="pig-loop" className="bg-black py-20 px-0">
        <div className="max-w-7xl mx-auto flex justify-center">
          <LiteVideo
            className="w-full max-w-2xl h-auto rounded-lg"
            srcDesktop="/pigloop.mp4"
            srcMobile="/pigloop.mp4"
            aria-label="Pig Loop Animation"
          />
        </div>
      </section>
      
      <BeforeAfter />
      <PixelShowcase />
      <FAQ />
      
      <Footer />
    </main>
  )
}
