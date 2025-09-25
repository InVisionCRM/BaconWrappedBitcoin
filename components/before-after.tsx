"use client"

import { Compare } from "@/components/ui/compare"

export function BeforeAfter() {
  return (
    <section id="before-after" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Bitcoin vs <span className="text-primary">Bacon Wrapped Bitcoin</span>
          </h2>
        </div>

        <div className="flex justify-center">
          <Compare
            firstImage="/beforewrap.png"
            secondImage="/afterwrap.jpg"
            className="w-[min(90vw,800px)] h-[min(70vh,520px)] rounded-xl"
            firstImageClassName="object-cover"
            secondImageClassname="object-cover rounded-2xl"
            initialSliderPercentage={50}
            slideMode="hover"
            showHandlebar
            autoplay={false}
          />
        </div>
      </div>
    </section>
  )
}


