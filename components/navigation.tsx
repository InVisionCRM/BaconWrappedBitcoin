"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { CryptoPrice } from "@/components/ui/crypto-price"
import { LinkPreview } from "@/components/ui/link-preview"
import { TextAnimate } from "@/components/ui/text-animate"
import Image from "next/image"
import PFPBorderApp from "@/components/pfp-border-app"

const addresses = [
  { label: "Contract Address", address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e" },
  { label: "WPLS/BWBTC Pool", address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e" },
  { label: "HEX/BWBTC Pool", address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e" },
]

const moreLinks = [
  { name: "Twitter", url: "https://twitter.com/baconwbtc" },
  { name: "Telegram", url: "https://t.me/baconwbtc" },
  { name: "Chart", url: "https://dexscreener.com" },
  { name: "Pump.tires", url: "https://pump.tires" },
  { name: "InternetMoney.io", url: "https://internetmoney.io" },
  { name: "PulseX.com", url: "https://pulsex.com" },
  { name: "PulseChain Scan", url: "https://scan.pulsechain.com" },
]

function AddressItem({ label, address }: { label: string; address: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
      <div className="flex-1 min-w-0">
        <h4 className="text-sm poppins-bold text-white mb-0.5">{label}</h4>
        <p className="text-[10px] font-mono text-white/60 truncate">{address}</p>
      </div>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isPFPModalOpen, setIsPFPModalOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed left-1/2 -translate-x-1/2 top-4 sm:top-6 z-[5000] hidden sm:flex items-center gap-4 rounded-full px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white bitcount-prop-double-ink max-w-[90vw]">
      <div className="pr-2 mr-2 border-r border-white/20">
        <CryptoPrice 
          contractAddress="0xA1077a294dDE1B09bB078844df40758a5D0f9a27"
          currency="usd" 
          showIcon 
          showSymbol 
          abbreviate 
          className="text-white"
          customIcon="/wpls-logo.png"
          customName="WPLS"
        />
      </div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#hero" className="px-4 py-2 text-sm poppins-bold hover:opacity-80 transition-opacity text-white">
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 text-sm poppins-bold bg-transparent text-white">
              Addresses
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg mt-1.5">
              <div className="w-[320px] p-2 space-y-2">
                {addresses.map((addr, idx) => (
                  <AddressItem key={idx} label={addr.label} address={addr.address} />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 py-2 text-sm poppins-bold bg-transparent text-white">
              More
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg mt-1.5">
              <ul className="w-[200px] p-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsPFPModalOpen(true)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm poppins-bold hover:bg-white/10 rounded transition-colors text-white"
                  >
                    PFP Creator
                  </button>
                </li>
                {moreLinks.map((link, index) => (
                  <li key={link.name}>
                    <LinkPreview
                      url={link.url}
                      className="flex items-center justify-between px-3 py-2 text-sm poppins-bold hover:bg-white/10 rounded transition-colors block text-white"
                    >
                      <TextAnimate
                        animation="slideUp"
                        by="character"
                        duration={0.5}
                        delay={index * 0.1}
                        className="text-white poppins-bold"
                      >
                        {link.name}
                      </TextAnimate>
                    </LinkPreview>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>


        <div className="pl-2 ml-2 border-l border-white/20">
          <CryptoPrice coin="bitcoin" currency="usd" showIcon showSymbol abbreviate className="text-white" />
        </div>
      </div>

      {/* Mobile Navigation Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="sm:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[5001] h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl shadow-lg shadow-white/20 flex items-center justify-center"
        aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
      >
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image
            src="/bacon-wrapped-bitcoin.jpg"
            alt="Bacon Wrapped Bitcoin"
            fill
            className="object-cover"
            quality={90}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div 
          className="sm:hidden fixed inset-0 z-[5000] bg-black/70" 
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className="mt-16 mx-6 rounded-2xl bg-white/10 backdrop-blur-xl text-black p-4 bitcount-prop-double-ink" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              {/* Prices at top */}
              <div className="flex justify-between items-center border-b border-white/20 pb-4">
                <CryptoPrice 
                  contractAddress="0xA1077a294dDE1B09bB078844df40758a5D0f9a27"
                  currency="usd" 
                  showIcon 
                  showSymbol 
                  abbreviate 
                  className="text-black"
                  customIcon="/wpls-logo.png"
                  customName="WPLS"
                />
                <CryptoPrice coin="bitcoin" currency="usd" showIcon showSymbol abbreviate className="text-black" />
              </div>

              {/* Home Link */}
              <a 
                href="#hero" 
                className="block px-4 py-3 text-xl poppins-bold hover:bg-white/10 rounded transition-colors text-black"
                onClick={() => setIsMobileOpen(false)}
              >
                Home
              </a>
              
              {/* Addresses Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'addresses' ? null : 'addresses')}
                  className="w-full px-4 py-2 text-xl poppins-bold text-black/80 hover:bg-white/10 rounded transition-colors flex items-center justify-between"
                >
                  <span className="text-black poppins-bold">Addresses</span>
                  <span className={`text-black transition-transform ${expandedSection === 'addresses' ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedSection === 'addresses' && (
                  <div className="space-y-2">
                    {addresses.map((addr, idx) => (
                      <div key={idx} className="px-6 py-2">
                        <AddressItem label={addr.label} address={addr.address} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* More Links Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'more' ? null : 'more')}
                  className="w-full px-4 py-2 text-xl poppins-bold text-black/80 hover:bg-white/10 rounded transition-colors flex items-center justify-between"
                >
                  <span className="text-black poppins-bold">More</span>
                  <span className={`text-black transition-transform ${expandedSection === 'more' ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedSection === 'more' && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPFPModalOpen(true)
                        setIsMobileOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-6 py-2 text-xl poppins-bold hover:bg-white/10 rounded transition-colors text-black"
                    >
                      PFP Creator
                    </button>
                    {moreLinks.map((link) => (
                      <div key={link.name} onClick={() => setIsMobileOpen(false)}>
                        <LinkPreview
                          url={link.url}
                          className="flex items-center justify-between px-6 py-2 text-xl poppins-bold hover:bg-white/10 rounded transition-colors text-black"
                        >
                          {link.name}
                        </LinkPreview>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PFP Border Modal */}
      <PFPBorderApp isOpen={isPFPModalOpen} onClose={() => setIsPFPModalOpen(false)} />
    </>
  )
}
