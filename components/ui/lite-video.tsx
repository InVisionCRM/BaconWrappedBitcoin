"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface LiteVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  srcMobile?: string
  srcDesktop?: string
  poster?: string
  className?: string
  immediate?: boolean
}

export function LiteVideo({ srcMobile, srcDesktop, poster, className, autoPlay = true, muted = true, loop = true, playsInline = true, immediate = false, ...rest }: LiteVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [inView, setInView] = React.useState(immediate)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    if (immediate) return
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
  }, [immediate])

  React.useEffect(() => {
    const el = videoRef.current
    if (!el || !inView) return
    
    const tryPlay = async () => {
      try {
        await el.play()
      } catch (error) {
        console.log('Video autoplay failed:', error)
      }
    }
    
    if (el.readyState >= 3) {
      tryPlay()
    } else {
      el.addEventListener("canplay", tryPlay, { once: true })
    }
    
    return () => el.removeEventListener("canplay", tryPlay)
  }, [inView])

  const videoSrc = isMobile && srcMobile ? srcMobile : srcDesktop

  return (
    <video
      ref={videoRef}
      className={cn(className)}
      src={inView ? videoSrc : undefined}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={immediate ? "auto" : "none"}
      {...rest}
    />
  )
}


