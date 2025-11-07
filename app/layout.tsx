import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Bangers, Ubuntu, ABeeZee, Zilla_Slab_Highlight, Swanky_and_Moo_Moo, Chango, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CoolMode } from "@/components/ui/cool-mode"
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

const abeezee = ABeeZee({
  subsets: ["latin"],
  variable: "--font-abeezee",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

const zillaSlabHighlight = Zilla_Slab_Highlight({
  subsets: ["latin"],
  variable: "--font-zilla-slab-highlight",
  weight: ["400", "700"],
  display: "swap",
})

const swankyAndMooMoo = Swanky_and_Moo_Moo({
  subsets: ["latin"],
  variable: "--font-swanky-and-moo-moo",
  weight: "400",
  display: "swap",
})

const chango = Chango({
  subsets: ["latin"],
  variable: "--font-chango",
  weight: "400",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
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
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${baconFont.variable} ${ubuntu.variable} ${abeezee.variable} ${zillaSlabHighlight.variable} ${swankyAndMooMoo.variable} ${chango.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased min-h-dvh w-full overflow-x-hidden bg-black">
        <CoolMode
          particle="/bacon-wrapped-bitcoin.jpg"
          size={20}
          particleCount={8}
          speedHorz={3}
          speedUp={4}
        >
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </CoolMode>
        <Analytics />
      </body>
    </html>
  )
}
