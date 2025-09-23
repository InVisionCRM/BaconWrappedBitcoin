import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Tokenomics } from "@/components/tokenomics"
import { FAQ } from "@/components/faq"
import { HowToBuy } from "@/components/how-to-buy"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Tokenomics />
      <HowToBuy />
      <FAQ />
      <Footer />
    </main>
  )
}
