"use client"

import { useEffect, useState } from "react"
import { NumberTicker } from "@/components/ui/number-ticker"

interface LeanHogsPriceProps {
  className?: string
  showIcon?: boolean
  showSymbol?: boolean
}

export function LeanHogsPrice({
  className = "",
  showIcon = true,
  showSymbol = true,
}: LeanHogsPriceProps) {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    setLoading(true)

    async function fetchData() {
      try {
        // Using a financial data API to get Lean Hogs futures price
        // Note: This is a mock implementation - you may need to use a real financial data provider
        // For now, I'll simulate the price data
        const mockPrice = 85.25 + (Math.random() - 0.5) * 10 // Simulate price around $85
        const mockChange = (Math.random() - 0.5) * 5 // Simulate change
        
        if (ignore) return
        
        setPrice(mockPrice)
        setChange(mockChange)
      } catch (error) {
        console.error("Error fetching Lean Hogs price:", error)
        setPrice(null)
        setChange(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Update price every 30 seconds
    const interval = setInterval(fetchData, 30000)
    
    return () => {
      ignore = true
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-white/60">Loading...</span>
      </div>
    )
  }

  const changeType = change && change > 0 ? "positive" : change && change < 0 ? "negative" : "neutral"
  const changeSymbol = change && change > 0 ? "↗" : change && change < 0 ? "↘" : "→"

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
          <span className="text-xs">🐷</span>
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm whitespace-nowrap">
          {showSymbol && "$"}
          {typeof price === "number" ? (
            <NumberTicker
              value={price}
              decimalPlaces={2}
              delay={0.1}
              className="text-inherit"
            />
          ) : (
            "-"
          )}
        </span>
        {change && (
          <div className="flex items-center gap-1">
            <span className={`text-xs ${changeType === "positive" ? "text-green-400" : changeType === "negative" ? "text-red-400" : "text-white/60"}`}>
              {changeSymbol}
            </span>
            <span className={`text-xs ${changeType === "positive" ? "text-green-400" : changeType === "negative" ? "text-red-400" : "text-white/60"}`}>
              {Math.abs(change).toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

