"use client"

import React, { useEffect } from "react"

interface CoolModeProps {
  children: React.ReactNode
  particle?: string
  size?: number
  particleCount?: number
  speedHorz?: number
  speedUp?: number
}

let globalCoolModeActive = false

const createParticle = (x: number, y: number, options: {
  particle?: string
  size?: number
  speedHorz?: number
  speedUp?: number
}) => {
  const particleSize = options.size || 15
  const speedHorz = options.speedHorz || 2
  const speedUp = options.speedUp || 3
  const particle = options.particle || "circle"

  const particleEl = document.createElement("div")
  particleEl.style.position = "fixed"
  particleEl.style.pointerEvents = "none"
  particleEl.style.zIndex = "9999"
  particleEl.style.left = `${x}px`
  particleEl.style.top = `${y}px`
  
  if (particle === "circle") {
    particleEl.style.width = `${particleSize}px`
    particleEl.style.height = `${particleSize}px`
    particleEl.style.borderRadius = "50%"
    particleEl.style.backgroundColor = "#ff6b35"
    particleEl.style.boxShadow = "0 0 10px rgba(255, 107, 53, 0.5)"
  } else if (particle.startsWith("http") || particle.startsWith("/")) {
    particleEl.style.width = `${particleSize}px`
    particleEl.style.height = `${particleSize}px`
    particleEl.style.backgroundImage = `url(${particle})`
    particleEl.style.backgroundSize = "contain"
    particleEl.style.backgroundRepeat = "no-repeat"
    particleEl.style.backgroundPosition = "center"
  } else {
    // Handle emoji or text
    particleEl.innerHTML = `<div style="font-size: ${particleSize}px; line-height: 1; text-align: center; width: ${particleSize}px; height: ${particleSize}px; display: flex; align-items: center; justify-content: center;">${particle}</div>`
  }

  document.body.appendChild(particleEl)

  // Animate particle
  const angle = Math.random() * Math.PI * 2
  const velocity = 50 + Math.random() * 100
  const vx = Math.cos(angle) * velocity
  const vy = Math.sin(angle) * velocity

  let startTime: number
  const animate = (currentTime: number) => {
    if (!startTime) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / 1500, 1)

    const newX = x + vx * progress
    const newY = y + vy * progress - progress * progress * 200

    particleEl.style.left = `${newX}px`
    particleEl.style.top = `${newY}px`
    particleEl.style.opacity = `${1 - progress}`
    particleEl.style.transform = `scale(${1 - progress * 0.5}) rotate(${progress * 360}deg)`

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      if (particleEl.parentNode) {
        particleEl.parentNode.removeChild(particleEl)
      }
    }
  }

  requestAnimationFrame(animate)
}

const handleGlobalClick = (e: MouseEvent, options: {
  particle?: string
  size?: number
  particleCount?: number
  speedHorz?: number
  speedUp?: number
}) => {
  if (!globalCoolModeActive) return

  const particleCount = options.particleCount || 6
  const x = e.clientX
  const y = e.clientY

  // Create multiple particles at click location
  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle(x, y, options)
    }, i * 50) // Stagger particle creation
  }
}

export function CoolMode({
  children,
  particle = "circle",
  size = 15,
  particleCount = 6,
  speedHorz = 2,
  speedUp = 3,
}: CoolModeProps) {
  useEffect(() => {
    // Activate global cool mode
    globalCoolModeActive = true

    const clickHandler = (e: MouseEvent) => {
      handleGlobalClick(e, { particle, size, particleCount, speedHorz, speedUp })
    }

    // Add global click listener
    document.addEventListener('click', clickHandler, { passive: true })

    // Cleanup
    return () => {
      document.removeEventListener('click', clickHandler)
      globalCoolModeActive = false
    }
  }, [particle, size, particleCount, speedHorz, speedUp])

  return <>{children}</>
}