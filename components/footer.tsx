"use client"

import { SocialShareButtons } from "@/components/ui/social-share-buttons"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-4 sm:py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <SocialShareButtons
            url={typeof window !== "undefined" ? window.location.href : "https://baconwrappedbitcoin.com"}
            message="Check out Bacon Wrapped Bitcoin - The tastiest memecoin on PulseChain! 🥓₿"
            platforms={["twitter", "telegram", "discord", "copylink"]}
            size={36}
            gap={12}
            className="mb-2"
          />
          <p className="text-sm sm:text-base ubuntu-regular text-white/80">Contract Address - Coming Soon</p>
        </div>
      </div>
    </footer>
  )
}
