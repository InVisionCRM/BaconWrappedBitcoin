"use client"

import { useEffect, useState } from "react"
import { NumberTicker } from "@/components/ui/number-ticker"
import Image from "next/image"

interface CryptoPriceProps {
  coin?: string
  currency?: string
  showIcon?: boolean
  showSymbol?: boolean
  abbreviate?: boolean
  className?: string
  customIcon?: string
  customName?: string
  contractAddress?: string
}

function abbreviateNumber(num: number): string {
  if (num < 1e3) return num.toLocaleString()
  const units = ["K", "M", "B", "T"]
  let unit = -1
  let n = num
  while (n >= 1e3 && unit < units.length - 1) {
    n /= 1e3
    unit++
  }
  return `${n.toFixed(2).replace(/\.00$/, "")}${units[unit]}`
}

function formatSmallPrice(num: number): string {
  if (num < 0.01) {
    // For very small prices, show 4-6 decimal places
    return num.toFixed(6).replace(/\.?0+$/, "")
  } else if (num < 1) {
    // For prices between 0.01 and 1, show 4 decimal places
    return num.toFixed(4).replace(/\.?0+$/, "")
  } else {
    // For larger prices, use normal formatting
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
}

export function CryptoPrice({
  coin = "bitcoin",
  currency = "usd",
  showIcon = true,
  showSymbol = true,
  abbreviate = true,
  className = "",
  customIcon,
  customName,
  contractAddress,
}: CryptoPriceProps) {
  const [price, setPrice] = useState<number | null>(null)
  const [icon, setIcon] = useState<string | null>(customIcon || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    setLoading(true)

    async function fetchData() {
      try {
        let res;
        if (contractAddress) {
          // Fetch price for custom token from DexScreener
          res = await fetch(
            `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`
          )
          if (!res.ok) throw new Error("Not found")
          const data = await res.json()
          if (ignore) return
          // Get the first pair's price (usually the most liquid)
          const tokenPrice = data.pairs?.[0]?.priceUsd
          setPrice(tokenPrice ? parseFloat(tokenPrice) : null)
        } else {
          // Fetch price for standard coin from CoinGecko
          res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
          )
          if (!res.ok) throw new Error("Not found")
          const data = await res.json()
          if (ignore) return
          if (!customIcon) {
            setIcon(data.image?.small || null)
          }
          setPrice(data.market_data?.current_price?.[currency] ?? null)
        }
      } catch {
        setPrice(null)
        if (!customIcon) {
          setIcon(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => {
      ignore = true
    }
  }, [coin, currency, contractAddress, customIcon])

  const currencySymbol = currency === "usd" ? "$" : currency.toUpperCase()

  let displayPrice = "-"
  if (typeof price === "number") {
    if (contractAddress) {
      // For custom tokens (like WPLS), always use small price formatting
      displayPrice = formatSmallPrice(price)
    } else {
      displayPrice = abbreviate ? abbreviateNumber(price) : price.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }
  }

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-white/60 poppins-bold">Loading...</span>
      </div>
    )
  }

  const displayName = customName || coin.toUpperCase()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && icon && (
        <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
          <Image 
            src={icon} 
            alt={displayName} 
            width={16}
            height={16}
            className="object-contain"
            quality={80}
          />
        </div>
      )}
      <span className="text-sm whitespace-nowrap poppins-bold">
        {showSymbol && currencySymbol}
        {typeof price === "number" ? (
          contractAddress ? (
            // For custom tokens with small prices, show animated ticker
            <NumberTicker
              value={price}
              decimalPlaces={price < 0.01 ? 6 : 4}
              delay={0.1}
              className="text-inherit"
            />
          ) : (
            // For regular coins, show animated ticker
            <NumberTicker
              value={price}
              decimalPlaces={2}
              delay={0.1}
              className="text-inherit"
            />
          )
        ) : (
          displayPrice
        )}
      </span>
    </div>
  )
}


