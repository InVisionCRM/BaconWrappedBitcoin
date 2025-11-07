"use client"

import { motion } from "motion/react"

export function LinePatternBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.line
          key={i}
          x1="0"
          y1={i * 20}
          x2="100%"
          y2={i * 20}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          animate={{
            opacity: [0.1, 0.4, 0.1],
            strokeWidth: [1, 2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </svg>
  )
}
