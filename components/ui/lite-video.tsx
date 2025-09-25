"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface LiteVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  srcMobile?: string
  srcDesktop?: string
  poster?: string
  className?: string
}

export function LiteVideo({ srcMobile, srcDesktop, poster, className, autoPlay = true, muted = true, loop = true, playsInline = true, ...rest }: LiteVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
          }
        })
      },
      { root: null, rootMargin: "200px", threshold: 0.01 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const el = videoRef.current
    if (!el || !inView) return
    // Try to play once sources are attached
    const tryPlay = () => {
      void el.play().catch(() => {})
    }
    el.addEventListener("canplay", tryPlay, { once: true })
    return () => el.removeEventListener("canplay", tryPlay)
  }, [inView])

  return (
    <video
      ref={videoRef}
      className={cn(className)}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="none"
      {...rest}
    >
      {inView && (
        <>
          {srcMobile ? <source src={srcMobile} type="video/webm" media="(max-width: 640px)" /> : null}
          {srcDesktop ? <source src={srcDesktop} type="video/webm" media="(min-width: 641px)" /> : null}
        </>
      )}
    </video>
  )
}


