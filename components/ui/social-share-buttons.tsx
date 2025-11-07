"use client"

import { useState } from "react"
import { motion } from "motion/react"

interface SocialShareButtonsProps {
  url?: string
  message?: string
  platforms?: Array<"twitter" | "telegram" | "discord" | "copylink">
  size?: number
  gap?: number
  className?: string
}

export function SocialShareButtons({
  url = typeof window !== "undefined" ? window.location.href : "https://example.com",
  message = "",
  platforms = ["twitter", "telegram", "discord", "copylink"],
  size = 32,
  gap = 8,
  className = "",
}: SocialShareButtonsProps) {
  const [copiedState, setCopiedState] = useState(false)
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null)

  const platformConfig = {
    twitter: {
      name: "Twitter",
      color: "#1DA1F2",
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`, "_blank")
      },
    },
    telegram: {
      name: "Telegram",
      color: "#0088cc",
      icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.94.114.782.89z",
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`, "_blank")
      },
    },
    discord: {
      name: "Discord",
      color: "#5865F2",
      icon: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 004.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
      action: () => {
        // Discord doesn't have a direct share URL, so we copy to clipboard
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(url)
        }
      },
    },
    copylink: {
      name: "Copy Link",
      color: "#6B7280",
      icon: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
      action: async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          try {
            await navigator.clipboard.writeText(url)
            setCopiedState(true)
            setTimeout(() => setCopiedState(false), 2000)
          } catch (err) {
            console.error("Failed to copy: ", err)
          }
        }
      },
    },
  }

  const getButtonStyle = (platform: string) => {
    const config = platformConfig[platform as keyof typeof platformConfig]
    if (!config) return {}
    
    return {
      backgroundColor: config.color,
      borderRadius: "50%",
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      position: "relative" as const,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }

  const hoverVariants = {
    hover: {
      scale: 1.15,
      y: -4,
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
    tap: { scale: 0.9, y: 0 },
  }

  return (
    <div className={className} style={{ display: "flex", gap: `${gap}px`, justifyContent: "center", alignItems: "center" }}>
      {platforms.map((platform) => {
        const config = platformConfig[platform]
        if (!config) return null
        const isHovered = hoveredPlatform === platform
        const isCopied = platform === "copylink" && copiedState

        return (
          <div key={platform} style={{ position: "relative" }}>
            <motion.button
              style={getButtonStyle(platform)}
              variants={hoverVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => config.action()}
              onMouseEnter={() => setHoveredPlatform(platform)}
              onMouseLeave={() => setHoveredPlatform(null)}
              aria-label={`Share on ${config.name}`}
            >
              <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="white">
                <path d={config.icon} />
              </svg>
            </motion.button>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  position: "absolute",
                  bottom: `${size + 8}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  color: "#FFFFFF",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  zIndex: 1000,
                  pointerEvents: "none" as const,
                }}
              >
                {isCopied ? "Copied!" : config.name}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "4px solid rgba(0, 0, 0, 0.9)",
                  }}
                />
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}


