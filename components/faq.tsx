"use client"

import { ModalTrigger } from "@/components/ui/animated-modal"
import { ModalWrapper } from "@/components/ui/modal-wrapper"
import { ChevronRight } from "lucide-react"

const faqs = [
  {
    question: "What is BWBTC?",
    answer: "Memecoin combining bacon + Bitcoin on PulseChain.",
  },
  {
    question: "Which blockchain?",
    answer: "PulseChain - fast, low fees, secure.",
  },
  {
    question: "How to buy?",
    answer: "Use PulseChain DEXs. Need PLS for gas.",
  },
  {
    question: "Is this serious?",
    answer: "Fun memecoin. Invest responsibly, DYOR.",
  },
  {
    question: "What makes it different?",
    answer: "Bacon + Bitcoin theme with transparency.",
  },
  {
    question: "How to store?",
    answer: "PulseChain wallet. Hardware wallet for large amounts.",
  },
]

export function FAQTrigger() {
  return <ModalTrigger>FAQ</ModalTrigger>
}

export function FAQModal() {
  return (
    <ModalWrapper title="FAQ" maxWidth="lg">
      <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-3 bg-black/5 rounded-xl border border-black/10 hover:border-black/20 transition-all hover:bg-black/10"
          >
            <div className="flex items-start gap-2">
              <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm ubuntu-medium text-black mb-1">{faq.question}</h3>
                <p className="text-xs text-black/70">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModalWrapper>
  )
}
