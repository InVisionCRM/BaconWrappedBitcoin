"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What is Bacon Wrapped Bitcoin (BWBTC)?",
    answer:
      "BWBTC is a memecoin that combines the love of bacon with the power of Bitcoin, wrapped up in a delicious PulseChain package. It's the perfect blend of humor and crypto innovation.",
  },
  {
    question: "Which blockchain is BWBTC on?",
    answer:
      "BWBTC is built on PulseChain, offering fast transactions and low fees while maintaining the security and decentralization you expect from a quality blockchain.",
  },
  {
    question: "How can I buy BWBTC?",
    answer:
      "You can purchase BWBTC through PulseChain DEXs once it launches. Make sure you have PLS in your wallet for gas fees and always verify the contract address.",
  },
  {
    question: "Is this a serious investment?",
    answer:
      "BWBTC is a memecoin created for fun and community engagement. Like all cryptocurrencies, especially memecoins, it carries risks. Only invest what you can afford to lose and always do your own research.",
  },
  {
    question: "What makes BWBTC different from other memecoins?",
    answer:
      "BWBTC combines the beloved themes of bacon and Bitcoin with genuine community focus. We're building something fun while maintaining transparency and avoiding false promises.",
  },
  {
    question: "How do I store BWBTC safely?",
    answer:
      "Store your BWBTC in a secure wallet that supports PulseChain tokens. Hardware wallets are recommended for large amounts, and always keep your private keys safe.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Got questions about BWBTC? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
