import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Bangers, Ubuntu } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const baconFont = Bangers({
  subsets: ["latin"],
  variable: "--font-bacon",
  display: "swap",
  weight: "400",
})

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bacon Wrapped Bitcoin (BWBTC) - The Tastiest Memecoin on PulseChain",
  description:
    "Join the sizzling revolution! Bacon Wrapped Bitcoin combines the crispy goodness of bacon with the digital gold of Bitcoin on PulseChain.",
  keywords: "memecoin, PulseChain, BWBTC, Bacon Wrapped Bitcoin, cryptocurrency, DeFi",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Bacon Wrapped Bitcoin (BWBTC)",
    description: "The tastiest memecoin on PulseChain! 🥓₿",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bacon Wrapped Bitcoin (BWBTC)",
    description: "The tastiest memecoin on PulseChain! 🥓₿",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${baconFont.variable} ${ubuntu.variable}`}>
      <body className="font-sans antialiased min-h-dvh overflow-x-hidden">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
