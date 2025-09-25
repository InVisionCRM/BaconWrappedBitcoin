"use client"

import { PixelImage } from "@/components/ui/pixel-image"

export function PixelShowcase() {
  return (
    <section id="pixel-showcase" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Spotted in the <span className="text-primary">Wild</span></h2>
        </div>

        <div className="grid grid-cols-1 gap-12 place-items-center">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl md:text-2xl font-semibold text-center">Times Square Billboard</h3>
            <PixelImage src="/billboardb&w.png" grid="6x4" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl md:text-2xl font-semibold text-center">TED Talk Reveal</h3>
            <PixelImage src="/bacontedtalk.png" grid="8x8" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl md:text-2xl font-semibold text-center">Storefront Acceptance</h3>
            <PixelImage src="/storefrontB&W.png" grid="4x6" />
          </div>
        </div>
      </div>
    </section>
  )
}


