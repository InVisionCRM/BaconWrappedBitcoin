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
import { RisingLogo } from "@/components/rising-logo"
import { AboutPigs } from "@/components/about-pigs"
import { LiteVideo } from "@/components/ui/lite-video"
import { GridPattern } from "@/components/ui/grid-pattern"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Navigation />
      <Hero />
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <Tokenomics />
      </section>
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <HowItWorks />
      </section>
      <SwapSection />
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <HowToBuy />
      </section>
      <section id="our-team" className="relative bg-black text-white py-20 px-0">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <div className="relative max-w-7xl mx-auto">
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
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <PigFusionSection />
      </section>
      
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <RisingLogo />
      </section>
      
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <AboutPigs />
      </section>
      
      {/* Pig Loop Section */}
      <section id="pig-loop" className="relative bg-black py-20 px-0">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white ubuntu-bold">
              
            </h2>
          </div>
          <div className="flex justify-center">
            <LiteVideo
              className="w-full max-w-2xl h-auto rounded-lg"
              srcDesktop="/pigloop.mp4"
              srcMobile="/pigloop.mp4"
              aria-label="Pig Loop Animation"
            />
          </div>
        </div>
      </section>
      
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <BeforeAfter />
      </section>
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <PixelShowcase />
      </section>
      <section className="relative">
        <GridPattern className="opacity-40 fill-white/10 stroke-white/20" />
        <FAQ />
      </section>
      
      <Footer />
    </main>
  )
}
