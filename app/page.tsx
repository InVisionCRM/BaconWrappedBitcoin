import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { HowItWorks } from "@/components/how-it-works"
import { BeforeAfter } from "@/components/before-after"
import { SwapSection } from "@/components/swap-section"
import { HowToBuy } from "@/components/how-to-buy"
import { PixelImage } from "@/components/ui/pixel-image"
import { PigFusionSection } from "@/components/pig-fusion"
import { RisingLogo } from "@/components/rising-logo"
import { AboutPigs } from "@/components/about-pigs"
import { LiteVideo } from "@/components/ui/lite-video"
import { Stats } from "@/components/stats"
import { BaconAccordionSection } from "@/components/bacon-accordion-section"
import { NFTArt } from "@/components/nft-art"
import { LinePatternBackground } from "@/components/ui/line-pattern-background"
import { StarfieldBackground } from "@/components/ui/starfield-background"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-dvh w-full">
      <Navigation />
      <Hero />
      <section className="relative">
        <RisingLogo />
      </section>
      <section className="relative">
        <HowItWorks />
      </section>
      <section className="relative">
        <HowToBuy />
      </section>
      <Stats />
      <NFTArt />
      <BaconAccordionSection />
      <SwapSection />
      <section id="our-team" className="relative bg-black text-white py-20 px-0 overflow-hidden">
        <LinePatternBackground />
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
        <PigFusionSection />
      </section>
      
      <section className="relative">
        <AboutPigs />
      </section>
      
      
      <section className="relative">
        <BeforeAfter />
      </section>
      <Footer />
    </main>
  )
}


