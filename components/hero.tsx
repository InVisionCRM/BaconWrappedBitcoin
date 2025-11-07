"use client"

import { useEffect, useState, useRef } from "react"

export function Hero() {
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [word1Opacity, setWord1Opacity] = useState(0)
  const [word2Opacity, setWord2Opacity] = useState(0)
  const [word3Opacity, setWord3Opacity] = useState(0)
  const [word4Opacity, setWord4Opacity] = useState(0)
  const [word5Opacity, setWord5Opacity] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const heroRect = heroRef.current.getBoundingClientRect()
      const heroHeight = heroRect.height

      // Calculate scroll progress within the hero section
      const scrollProgress = Math.max(0, Math.min(1, -heroRect.top / heroHeight))

      // Video fades out from 0 to 0.3 scroll progress
      const videoFadeProgress = Math.max(0, Math.min(1, scrollProgress * 3.33))
      setOverlayOpacity(videoFadeProgress)

      // Word 1: "The" - fades in 0.2-0.3, fades out 0.3-0.35
      const word1Fade = scrollProgress < 0.3
        ? Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.1))
        : Math.max(0, Math.min(1, (0.35 - scrollProgress) / 0.05))
      setWord1Opacity(word1Fade)

      // Word 2: "Future" - fades in 0.35-0.45, fades out 0.45-0.5
      const word2Fade = scrollProgress < 0.45
        ? Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.1))
        : Math.max(0, Math.min(1, (0.5 - scrollProgress) / 0.05))
      setWord2Opacity(word2Fade)

      // Word 3: "of" - fades in 0.5-0.6, fades out 0.6-0.65
      const word3Fade = scrollProgress < 0.6
        ? Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.1))
        : Math.max(0, Math.min(1, (0.65 - scrollProgress) / 0.05))
      setWord3Opacity(word3Fade)

      // Word 4: "Finance" - fades in 0.65-0.75, fades out 0.75-0.8
      const word4Fade = scrollProgress < 0.75
        ? Math.max(0, Math.min(1, (scrollProgress - 0.65) / 0.1))
        : Math.max(0, Math.min(1, (0.8 - scrollProgress) / 0.05))
      setWord4Opacity(word4Fade)

      // Word 5: "is finally here!" - fades in 0.8-0.85, fades out 0.9-0.95
      const word5Fade = scrollProgress < 0.9
        ? Math.max(0, Math.min(1, (scrollProgress - 0.8) / 0.05))
        : Math.max(0, Math.min(1, (0.95 - scrollProgress) / 0.05))
      setWord5Opacity(word5Fade)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Bacon Wrapped Bitcoin hero"
      className="relative h-[600vh]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bitcoin.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Parallax Dark Overlay - fades to black */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-100 ease-out"
          style={{
            opacity: overlayOpacity,
          }}
        />

         {/* Word sequence - one at a time, centered */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <h1
             className="absolute text-white text-6xl md:text-8xl lg:text-9xl font-poppins font-bold tracking-wider text-center transition-opacity duration-300 ease-out"
             style={{ opacity: word1Opacity }}
           >
             The
           </h1>
           <h1
             className="absolute text-white text-6xl md:text-8xl lg:text-9xl font-poppins font-bold tracking-wider text-center transition-opacity duration-300 ease-out"
             style={{ opacity: word2Opacity }}
           >
             Future
           </h1>
           <h1
             className="absolute text-white text-6xl md:text-8xl lg:text-9xl font-poppins font-bold tracking-wider text-center transition-opacity duration-300 ease-out"
             style={{ opacity: word3Opacity }}
           >
             of
           </h1>
           <h1
             className="absolute text-white text-6xl md:text-8xl lg:text-9xl font-poppins font-bold tracking-wider text-center transition-opacity duration-300 ease-out"
             style={{ opacity: word4Opacity }}
           >
             Finance
           </h1>
           <h1
             className="absolute text-white text-6xl md:text-8xl lg:text-9xl font-poppins font-bold tracking-wider text-center transition-opacity duration-300 ease-out px-8"
             style={{ opacity: word5Opacity }}
           >
             is finally here!
           </h1>
         </div>
      </div>
    </section>
  )
}
