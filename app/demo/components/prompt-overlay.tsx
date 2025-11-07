"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface PromptOverlayProps {
  effectNumber: number
  effectName: string
  prompt: string
  position?: "top-right" | "bottom-right"
}

export default function PromptOverlay({ effectNumber, effectName, prompt, position = "top-right" }: PromptOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const positionClasses = position === "top-right"
    ? "top-4 right-4"
    : "bottom-4 right-4"

  return (
    <div className={`absolute ${positionClasses} z-30`}>
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="bg-gray-900/95 backdrop-blur-sm border border-orange-500/50 rounded-xl p-4 max-w-md shadow-2xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-orange-500 font-bold text-sm">#{effectNumber}</div>
                <h3 className="text-white font-bold text-lg">{effectName}</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{prompt}</p>
            <motion.button
              onClick={copyPrompt}
              className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy AI Prompt
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsExpanded(true)}
            className="px-4 py-2 bg-orange-500/90 hover:bg-orange-500 text-white font-medium rounded-lg shadow-lg transition-colors flex items-center gap-2 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AI Prompt #{effectNumber}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
