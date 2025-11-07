"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export function BaconAccordionSection() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getProgress = () => {
    if (!sectionRef.current) return 0
    const rect = sectionRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const start = rect.top + scrollY - windowHeight
    const end = rect.top + scrollY + rect.height
    const progress = (scrollY - start) / (end - start)
    return Math.max(0, Math.min(1, progress))
  }

  const progress = getProgress()

  const cardPositions = [
    { row: 0, col: 0, dir: { x: -1, y: -1 } },
    { row: 1, col: 0, dir: { x: -1, y: 0 } },
    { row: 2, col: 0, dir: { x: -1, y: 1 } },
    { row: 0, col: 1, dir: { x: 1, y: -1 } },
    { row: 1, col: 1, dir: { x: 1, y: 0 } },
    { row: 2, col: 1, dir: { x: 1, y: 1 } },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 px-2 bg-white min-h-screen flex items-center justify-center"
    >
      <div className="relative w-full max-w-4xl h-[600px]" style={{ perspective: '1200px' }}>
        {cardPositions.map((pos, i) => {
          const t = Math.max(0, (progress - 0.3) / 0.7)
          const offsetX = pos.dir.x * t * 500
          const offsetY = pos.dir.y * t * 300
          const scaleX = 1 - t * 0.8
          
          return (
            <div
              key={i}
              className="absolute rounded-2xl overflow-hidden border-8 border-gray-800 shadow-2xl"
              style={{
                left: `${pos.col === 0 ? '30%' : '70%'}`,
                top: `${pos.row === 0 ? '20%' : pos.row === 1 ? '50%' : '80%'}`,
                transform: `
                  translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
                  scaleX(${scaleX})
                  rotateY(${pos.dir.x * t * 90}deg)
                `,
                opacity: 1 - t * 0.6,
                transformOrigin: pos.dir.x > 0 ? 'left center' : 'right center',
                width: '250px',
                height: '250px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Image
                src="/bacon-wrapped-bitcoin.jpg"
                alt="Bacon Wrapped Bitcoin"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          )
        })}
        
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: Math.max(0, (progress - 0.6) / 0.3) }}
        >
          <h2 className="text-4xl font-bold text-gray-800 text-center drop-shadow-lg">
            Bacon Accordion Reveal
          </h2>
        </div>
      </div>
    </section>
  )
}
