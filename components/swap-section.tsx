"use client"

import { PixelImage } from "@/components/ui/pixel-image"

export function SwapSection() {
  return (
    <section id="swap" className="relative scroll-mt-24 bg-black text-white px-0">
      <div className="relative w-full h-[100vh] md:h-[100vh]">
          {/* Pixelated background image */}
          <PixelImage
            src="/storefrontB&W.png"
            grid="6x4"
            className="w-full h-full"
            pixelFadeInDuration={3000}
            maxAnimationDelay={2000}
            colorRevealDelay={1750}
            objectFit="cover"
            objectPosition="right"
            rounded={false}
          />
      </div>
    </section>
  )
}


