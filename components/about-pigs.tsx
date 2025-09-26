"use client"

import React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { LampContainer } from "@/components/ui/lamp"
import { GridPattern } from "@/components/ui/grid-pattern"
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card"

export function AboutPigs() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start center", "end center"] 
  })

  // Title fade in/out: starts invisible, fades to full, then fades out completely
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  
  // Pig opacity: starts invisible, becomes visible as it slides in, full visibility at 75%
  const pigOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 0, 1, 1])
  
  // Pig slide in from far right: starts way off-screen, ends centered at 75% scroll (slower)
  const pigX = useTransform(scrollYProgress, [0, 0.75], ["100vw", "0%"])
  
  // Pig zoom in/out: starts small (0.3), grows to normal (1) at 75% scroll, then grows more (1.5) at end
  const pigScale = useTransform(scrollYProgress, [0, 0.75, 1], [0.3, 1, 1.5])
  
  // Lamp opacity: fade in/out with scroll
  const lampOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} id="about-pigs" className="relative bg-black py-20 px-0 -mt-[200px]">
      <GridPattern className="opacity-50 z-0 absolute inset-0 w-full h-full" />
      {/* Lamp with scroll-based opacity */}
      <motion.div style={{ opacity: lampOpacity }}>
        <LampContainer>
          <motion.h1
            style={{ opacity: titleOpacity }}
            className="mt-8 bg-gradient-to-br from-white to-gray-300 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl ubuntu-bold"
          >
            We Grow The Best Pigs
          </motion.h1>
        </LampContainer>
      </motion.div>
      
      {/* Pig Image - moved up 300px */}
      <div className="flex justify-center -mt-[300px]">
        <motion.div
          style={{ 
            opacity: pigOpacity,
            x: pigX,
            scale: pigScale
          }}
          className="relative z-[70]"
        >
          <Image
            src="/ourpig.png"
            alt="Our Pig"
            width={203}
            height={203}
            className="w-full max-w-[300px] h-auto object-contain"
          />
        </motion.div>
      </div>
      
      {/* Draggable Cards Demo - moved down 100px */}
      <div className="mt-[100px]">
        <DraggableCardDemo />
      </div>
    </section>
  )
}

export function DraggableCardDemo() {
  const items = [
    {
      title: "Tyler Durden",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-[60vh] w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        If its your first day at Fight Club, you have to fight.
      </p>
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}


