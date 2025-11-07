"use client"

import Link from "next/link"
import { motion } from "motion/react"
import Image from "next/image"

const demos = [
  {
    title: "Button Styles",
    description: "25 premium button designs with gradients, 3D effects, and interactive animations",
    href: "/demo/button-styles",
    gradient: "from-orange-500 to-pink-500",
    preview: "/bacon-wrapped-bitcoin.jpg",
    count: "25 buttons",
    featured: true
  },
  {
    title: "Card Styles",
    description: "60 different card designs with glass, gradient, neon, and modern styles",
    href: "/demo/cards",
    gradient: "from-purple-500 to-indigo-500",
    preview: "/artcoin1.png",
    count: "60 designs",
    featured: true
  },
  {
    title: "Background Animations",
    description: "14 unique background animations including interactive and animated effects",
    href: "/demo/backgrounds",
    gradient: "from-cyan-500 to-blue-500",
    preview: "/artcoin2.png",
    count: "14 effects",
    featured: true
  },
  {
    title: "Particle Explosion",
    description: "Interactive particle explosion effects on click",
    href: "/demo/particle-explosion",
    gradient: "from-pink-500 to-rose-500",
    preview: "/artcoin1.png",
    count: "1 effect"
  },
  {
    title: "3D Card Flip Gallery",
    description: "Flip cards with 3D transforms and bacon images",
    href: "/demo/card-flip",
    gradient: "from-purple-500 to-indigo-500",
    preview: "/Baco.jpg",
    count: "Multiple cards"
  },
  {
    title: "Magnetic Hover",
    description: "Elements that follow your cursor magnetically",
    href: "/demo/magnetic-hover",
    gradient: "from-blue-500 to-cyan-500",
    preview: "/singlepig.png",
    count: "Interactive"
  },
  {
    title: "Parallax Scroll",
    description: "25 unique parallax scrolling effects with bacon assets",
    href: "/demo/parallax",
    gradient: "from-green-500 to-emerald-500",
    preview: "/bacon-wrapped-bitcoin.jpg",
    count: "25 effects"
  },
  {
    title: "Multi-Card Parallax",
    description: "Grid-based animations with multiple cards moving together",
    href: "/demo/parallax-multi",
    gradient: "from-indigo-500 to-purple-500",
    preview: "/artcoin5.png",
    count: "10 effects",
    featured: true
  },
  {
    title: "Morphing Shapes",
    description: "SVG path morphing animations",
    href: "/demo/morphing-shapes",
    gradient: "from-orange-500 to-amber-500",
    preview: "/artcoin3.png",
    count: "Multiple shapes"
  },
  {
    title: "Text Reveal",
    description: "Various text reveal and scramble animations",
    href: "/demo/text-reveal",
    gradient: "from-red-500 to-pink-500",
    preview: "/pigunderlight.png",
    count: "Text effects"
  },
  {
    title: "Hover Gallery",
    description: "Interactive image gallery with smooth transitions",
    href: "/demo/hover-gallery",
    gradient: "from-violet-500 to-purple-500",
    preview: "/artcoin4.png",
    count: "Gallery view"
  },
  {
    title: "Scroll Card Reveal",
    description: "16 unique scroll-triggered animation effects for cards",
    href: "/demo/scroll-reveal",
    gradient: "from-teal-500 to-cyan-500",
    preview: "/baconbg.png",
    count: "16 effects"
  }
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Animation Demos
          </motion.h1>
          <motion.p
            className="text-2xl text-gray-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore a collection of interactive animation components
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="px-3 py-1 bg-orange-500/20 rounded-full">150+ Effects Total</span>
            <span className="px-3 py-1 bg-purple-500/20 rounded-full">12 Categories</span>
            <span className="px-3 py-1 bg-pink-500/20 rounded-full">Scroll & Parallax</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-4 gap-6 min-w-0">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Link href={demo.href}>
                <div className={`group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border ${demo.featured ? 'border-orange-500/50' : 'border-gray-700'} hover:border-orange-500 transition-all duration-300 h-72 cursor-pointer`}>
                  {/* Preview Image */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Image
                      src={demo.preview}
                      alt={demo.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      {demo.featured && (
                        <motion.div
                          className="inline-block mb-3"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                            ⭐ Featured
                          </span>
                        </motion.div>
                      )}
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
                        {demo.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {demo.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-purple-500/30 text-purple-300 text-xs rounded-full">
                        {demo.count}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Demo</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Animated Corner Accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-bl ${demo.gradient} opacity-20 rounded-bl-full`} />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Built with Framer Motion & Next.js
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <span>🎨 Creative Animations</span>
            <span>⚡ High Performance</span>
            <span>📱 Responsive Design</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
