"use client"

import { ModalTrigger } from "@/components/ui/animated-modal"
import { ModalWrapper } from "@/components/ui/modal-wrapper"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

const addresses = [
  {
    label: "Contract Address",
    address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e",
  },
  {
    label: "Deployer Wallet",
    address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e",
  },
  {
    label: "PLS/BWBTC Pool",
    address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e",
  },
  {
    label: "HEX/BWBTC Pool",
    address: "0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e",
  },
]

export function AddressesTrigger() {
  return <ModalTrigger>Addresses</ModalTrigger>
}

export function AddressesModal() {
  return (
    <ModalWrapper title="Addresses">
      <div className="space-y-2">
        {addresses.map((item, idx) => (
          <AddressCard key={idx} label={item.label} address={item.address} />
        ))}
      </div>
    </ModalWrapper>
  )
}

function AddressCard({ label, address }: { label: string; address: string }) {
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
    <div className="flex items-center justify-between gap-3 p-3 bg-black/5 rounded-xl border border-black/10 hover:border-black/20 transition-all hover:bg-black/10">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm ubuntu-medium text-black mb-0.5">{label}</h3>
        <p className="text-[10px] font-mono text-black/60 truncate">{address}</p>
      </div>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-black/10 transition-colors text-black"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}

