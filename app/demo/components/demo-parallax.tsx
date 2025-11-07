"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import PromptOverlay from "./prompt-overlay"

const parallaxPrompts = [
  "Create layered parallax with 4 layers moving at different speeds. Use useScroll hook with target ref and offset: ['start start', 'end end']. Transform Y values: layer1 (0 to 400px), layer2 (0 to 250px), layer3 (0 to 150px), layer4 (0 to -100px opposite). Add opacity fade and scale on furthest layer.",
  "Create zoom and fade parallax effect. Use two images that crossfade: first scales 1 to 3x with opacity 1→0, second scales 1 to 2x with opacity 0→1→0. Add rotation transform 0 to 360deg on second image. Animate over scroll with useTransform.",
  "Create horizontal slide parallax. Elements move left/right based on scroll: x1 transforms -300 to 300px, x2 transforms 300 to -300px. Combine with vertical y transform (0 to 200px). Use different easing for organic feel.",
  "Create 3D perspective tilt parallax. Set container perspective: 1000px. Use rotateX and rotateY transforms based on scroll: rotateX (0 to 45deg), rotateY (0 to -45deg). Add vertical translation (y: 0 to 300px) for depth.",
  "Create stacked cards parallax. Multiple cards scale down and move up as you scroll. Each card: scale transforms from 1 to 0.9, y from 0 to -100px, opacity from 1 to 0. Stagger timing based on card index * 0.2.",
  "Create spiral vortex parallax with 4 items. Calculate position using polar coordinates: x = cos(angle) * radius, y = sin(angle) * radius. Animate angle from baseAngle to baseAngle + 720deg. Scale from 1 to 0.5. Radius shrinks 300px to 50px.",
  "Create wave flow parallax with oscillating Y movement. Base y transform: 0 to 400px. Add sine wave offset: sin(index * PI/2) * 200px. Combine with rotation 0 to 360deg. Use circular images with colored borders.",
  "Create explosion scatter from center. Items radiate outward at fixed angles (0, 60, 120, 180, 240, 300 degrees). Distance increases with scroll. Center image scales down 1 to 0.3. Outer items fade in then out (opacity: 0→1→0) with rotation.",
  "Create 3D depth tunnel effect. Set perspective: 2000px on container. Multiple layers with translateZ from 0 to -5000px based on depth. Combine with scale 1 to 3x and opacity fade. Use transformStyle: preserve-3d.",
  "Create 3D carousel parallax with 6 images in circle. Calculate positions: x = sin(rotateY) * 400, z = cos(rotateY) * 400. Animate rotateY from index*60deg to index*60+360deg. Use transformStyle: preserve-3d and scale pulse 1 to 1.2.",
  "Create liquid morph parallax. Animate borderRadius from 50% to 10% to 50%. Combine with scale 1→1.5→1, rotate 0 to 180deg, and translateX 0→200→0. Duration varies per property for organic morphing feel.",
  "Create infinite zoom parallax with 5 layers. Each layer scales based on index: scale from (1+index*0.5) to (10+index*2). Stagger opacity: appears at index*0.15 scroll progress, fades at (index+2)*0.15. Create tunnel zoom effect.",
  "Create pendulum swing parallax. Items hang from top with different rope lengths (200-300px). Rotate transforms from -60+index*20 to 60-index*20 degrees. Use transformOrigin: 'top center'. Add small rope line element above each item.",
  "Create matrix grid parallax with 4x4 grid (16 items). Alternating rows/columns move opposite directions: even rows up, odd rows down. Add rotation based on column (even CW, odd CCW). Scale pulses 1→1.5→1 over scroll.",
  "Create DNA helix parallax with 20 items in two intertwined strands. Each item: y = index*40-400 to index*40+400, x = cos((angle+scroll*360)*PI/180)*150. Alternate colors per strand. Scale varies 0.5→1.2→0.5 creating depth illusion.",
  "Create parallax book pages flip effect. Stack 8 layers with increasing rotateY based on scroll (0 to index*15deg). Each layer translates X: index*20px creating spreading effect. Use preserve-3d and perspective: 1200px. Add gradient shadows between pages.",
  "Create orbital parallax with 6 items orbiting center point. Use polar coordinates with expanding radius (200 to 500px). Each orbit has different speed: angle += (index+1)*360deg. Center item rotates opposite direction. Add glow trails with motion blur.",
  "Create waterfall parallax cascade. Items fall from top in columns. Each column offset: x = col*150px. Y transforms from -500 to screen height+500. Stagger start times: delay = row*0.1 + col*0.3. Add opacity fade at top and bottom edges.",
  "Create zipper parallax reveal. Two halves of screen split apart horizontally. Left half: x transforms 0 to -400px, right half: 0 to 400px. Middle content scales up 0.5 to 1.2 as it's revealed. Add diagonal scan line effect moving down.",
  "Create clock hands parallax. Multiple hand elements rotate at different speeds like clock. Hour hand: 0 to 360deg, minute hand: 0 to 720deg, second hand: 0 to 1440deg. Use transformOrigin: 'bottom center'. Add circular clock face background.",
  "Create parallax curtain reveal. Two curtain panels slide apart: left panel x: 0 to -100%, right panel x: 0 to 100%. Behind curtains, content fades in with scale 0.8 to 1. Add fabric texture and wave animation on curtains during movement.",
  "Create fisheye lens parallax. Items bulge outward from center based on distance. Calculate distance from center, apply scale: 1 + (distance/maxDistance)*0.5. Items near edge scale more. Add radial blur gradient and chromatic aberration on edges.",
  "Create parallax typewriter roll. Text blocks roll up like typewriter paper. Each block rotates X: 90deg (flat) to 0deg (upright). Y transforms from bottom to top. Add paper texture, perforated edges, and subtle horizontal scan lines.",
  "Create kaleidoscope parallax. Duplicate content in 8 symmetric positions arranged in circle. Each copy rotates around center point. Apply different color filters (hue-rotate). Scale pulses in sync. Create mandala-like rotating pattern.",
  "Create domino cascade parallax. Items tip over in sequence like dominoes. Each item: rotateZ from 0 to 90deg, transformOrigin: bottom edge. Delay based on position in chain: index*0.15. Items slide slightly as they fall.",
  "Create parallax tunnel vision. Concentric circles scale and fade creating tunnel effect. Inner circles move faster than outer. Each ring: scale from 5 to 0.5, opacity 0→1→0. Add radial gradient background pulsing with scroll.",
  "Create parallax origami fold. Elements fold in half with 3D rotation. RotateY from 0 to 180deg for horizontal fold. Split element into two halves. Top half rotateX from 0 to -90, bottom half 0 to 90. Use preserve-3d style.",
  "Create magnetic field parallax. Items follow curved paths like iron filings. Calculate Bezier curves from position. X and Y both use easing functions creating swoosh paths. Group items in clusters with shared curve shapes.",
  "Create parallax record spin. Circular items rotate while scaling. Rotate from 0 to 1080deg (3 full spins). Scale from 2 to 0.3 creating zoom-out spiral. Add vinyl record texture and tonearm element tracking across.",
  "Create particle cloud parallax. 50 small elements float at different depths. Each has unique X drift: -100 to 100px with sin wave. Y follows scroll but offset by depth layer. Scale and opacity vary by Z-depth. Creates nebula effect.",
  "Create rising columns parallax. Vertical columns rise from bottom at different speeds based on position. Use staggered delays. Each column: y from 100% to -20%, with slight rotation (5-15deg). Add motion blur trail effect during movement.",
  "Create accordion squeeze parallax. Multiple horizontal sections compress vertically on scroll. ScaleY transforms from 1 to 0.1. Adjacent sections move toward center. Create squeeze/compress effect. Use clip-path for smooth edge handling.",
  "Create photo strip parallax. Filmstrip-style layout with frames sliding diagonally. Each frame: x from -200 to 200, y from -100 to 100. Add sprocket hole borders. Rotate slightly (±5deg). Create vintage camera roll aesthetic.",
  "Create radar sweep parallax. Circular radar with sweeping line. Rotate sweep line 0 to 360deg continuously. Items ping/pulse when sweep passes over them. Add concentric circle grid. Use radial fade for depth.",
  "Create venetian blind parallax. Horizontal slats rotate to reveal content. Each slat rotateX from 90deg (edge-on) to 0deg (flat). Stagger timing by index. Add shadows between slats. Create window blind opening effect.",
  "Create conveyor belt parallax. Items move horizontally in loop like conveyor. Use translateX with modulo wrapping. Items scale smaller as they recede in distance. Add perspective tilt. Create factory/industrial aesthetic.",
  "Create spiral staircase parallax. Items arranged in ascending spiral. Combine rotateZ (0 to 720deg) with translateY (-400 to 400). Add perspective depth. Each item rotates individually. Creates helix ascending effect.",
  "Create paper shred parallax. Content appears torn into vertical strips. Each strip has jagged edges (clip-path). Strips fall at different speeds and rotations. Some strips sway side-to-side. Create document shredder effect.",
  "Create telescope zoom parallax. Multiple circular vignettes zoom in sequence. Each circle scales from 0.1 to 3x. Opacity fades in then out. Black vignette mask with sharp edges. Create looking through telescope effect.",
  "Create chain link parallax. Connected items linked by animated chains/lines. Items orbit but maintain connection lines using SVG paths. Lines stretch and contract. Add slight elastic bounce. Creates connected network visual.",
  "Create elevator shaft parallax. Vertical movement with passing floor indicators. Items move up revealing new content. Add floor number overlays. Include cable/rail elements on sides. Create building elevator ascending effect.",
  "Create mirror reflection parallax. Content duplicated and flipped below with perspective distortion. Reflection has lower opacity and blur. Add ripple effect on scroll. Reflection lags slightly behind main content. Water reflection aesthetic.",
  "Create accordion fold-out parallax. Zigzag folded panels unfold on scroll. Alternating panels fold different directions. Use rotateY on shared edges. Add crease shadows. Create roadmap/pamphlet unfolding effect.",
  "Create planetary orbit parallax. Multiple orbital rings at different angles. Items orbit at varying speeds. Use 3D perspective with rotateX and rotateY. Add rings/paths visualization. Create orrery/solar system effect.",
  "Create ticker tape parallax. Horizontal scrolling text loops. Multiple rows at different speeds. Add slight wave motion (sine Y offset). Include diagonal stripes or confetti. Create stock ticker/celebration aesthetic."
]

function Separator({ number }: { number: number }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="h-px w-32 bg-gradient-to-r from-transparent to-orange-500" />
        <span className="text-orange-500 font-bold text-xl">Parallax #{number}</span>
        <div className="h-px w-32 bg-gradient-to-l from-transparent to-orange-500" />
      </div>
    </div>
  )
}

// Parallax Effect 1: Classic Layered Parallax
function ParallaxEffect1() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.3])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
        <PromptOverlay effectNumber={1} effectName="Classic Layered Parallax" prompt={parallaxPrompts[0]} />
        <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-20" style={{ y: y4 }}>
          <h2 className="text-5xl font-bold text-white mb-2">Classic Layered Parallax</h2>
          <p className="text-xl text-orange-400">Scroll to see depth</p>
        </motion.div>

        {/* Layer 1 - Furthest back */}
        <motion.div
          className="absolute top-1/3 left-1/4 opacity-30"
          style={{ y: y1, scale }}
        >
          <Image src="/Bitcoin-Logo.png" alt="Bitcoin" width={300} height={300} className="object-contain" />
        </motion.div>

        {/* Layer 2 */}
        <motion.div
          className="absolute top-1/2 right-1/4 opacity-40"
          style={{ y: y2 }}
        >
          <Image src="/wpls-logo.png" alt="WPLS" width={200} height={200} className="object-contain" />
        </motion.div>

        {/* Layer 3 */}
        <motion.div
          className="absolute bottom-32 left-1/3"
          style={{ y: y3, opacity }}
        >
          <Image src="/pigunderlight.png" alt="Pig" width={250} height={250} className="object-contain" />
        </motion.div>

        {/* Layer 4 - Closest (moves opposite direction) */}
        <motion.div
          className="absolute bottom-20 right-1/3"
          style={{ y: y4 }}
        >
          <div className="relative w-64 h-64">
            <Image src="/bacon-wrapped-bitcoin.jpg" alt="Bacon Bitcoin" fill className="object-cover rounded-full border-4 border-orange-500 shadow-2xl" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 2: Zoom and Fade
function ParallaxEffect2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 3])
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 2])
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-black via-pink-950 to-purple-950">
        <PromptOverlay effectNumber={2} effectName="Zoom and Fade" prompt={parallaxPrompts[1]} />
        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale: scale1, opacity: opacity1 }}>
          <Image src="/artcoin1.png" alt="Art Coin" width={400} height={400} className="object-contain" />
        </motion.div>

        <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale: scale2, opacity: opacity2, rotate }}>
          <Image src="/artcoin3.png" alt="Art Coin" width={400} height={400} className="object-contain" />
        </motion.div>

        <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 text-center" style={{ opacity: opacity1 }}>
          <h2 className="text-5xl font-bold text-white">Zoom & Fade Parallax</h2>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 3: Horizontal Slide
function ParallaxEffect3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [-300, 300])
  const x2 = useTransform(scrollYProgress, [0, 1], [300, -300])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-orange-950 via-red-950 to-black">
        <PromptOverlay effectNumber={3} effectName="Horizontal Slide" prompt={parallaxPrompts[2]} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-10">
          <h2 className="text-5xl font-bold text-white mb-2">Horizontal Slide Parallax</h2>
        </div>

        <motion.div className="absolute top-1/3 left-1/2" style={{ x: x1, y }}>
          <Image src="/Baco.jpg" alt="Baco" width={300} height={300} className="object-cover rounded-2xl border-4 border-orange-500" />
        </motion.div>

        <motion.div className="absolute top-2/3 left-1/2" style={{ x: x2, y }}>
          <Image src="/singlepig.png" alt="Pig" width={250} height={250} className="object-contain" />
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 4: Perspective Tilt
function ParallaxEffect4() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -45])
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-blue-950 via-cyan-950 to-black flex items-center justify-center" style={{ perspective: "1000px" }}>
        <PromptOverlay effectNumber={4} effectName="3D Perspective Tilt" prompt={parallaxPrompts[3]} />
        <motion.div
          className="relative"
          style={{ rotateX, rotateY, y }}
        >
          <div className="relative w-96 h-96">
            <Image src="/bacon-wrapped-bitcoin.jpg" alt="Bacon Bitcoin" fill className="object-cover rounded-3xl border-8 border-cyan-500 shadow-2xl" />
          </div>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-center w-full">
            <h2 className="text-5xl font-bold text-white">3D Tilt Parallax</h2>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 5: Stacked Cards
function ParallaxEffect5() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const cards = [
    { src: "/artcoin1.png", color: "border-pink-500" },
    { src: "/artcoin2.png", color: "border-purple-500" },
    { src: "/artcoin3.png", color: "border-blue-500" },
    { src: "/artcoin4.png", color: "border-green-500" },
  ]

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={5} effectName="Stacked Cards" prompt={parallaxPrompts[4]} />
        <div className="absolute top-20 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Stacked Cards Parallax</h2>
        </div>

        {cards.map((card, index) => {
          const scale = useTransform(scrollYProgress,
            [index * 0.2, (index + 1) * 0.2],
            [1, 0.9]
          )
          const y = useTransform(scrollYProgress,
            [index * 0.2, (index + 1) * 0.2],
            [0, -100]
          )
          const opacity = useTransform(scrollYProgress,
            [index * 0.2, (index + 1) * 0.2, (index + 2) * 0.2],
            [1, 1, 0]
          )

          return (
            <motion.div
              key={index}
              className="absolute w-80 h-80"
              style={{ scale, y, opacity, top: `${50 + index * 5}%`, left: "50%", x: "-50%", zIndex: cards.length - index }}
            >
              <div className={`relative w-full h-full border-4 ${card.color} rounded-2xl overflow-hidden shadow-2xl`}>
                <Image src={card.src} alt={`Card ${index}`} fill className="object-cover" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 6: Spiral Motion
function ParallaxEffect6() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = [
    { src: "/artcoin2.png", baseAngle: 0 },
    { src: "/artcoin4.png", baseAngle: 90 },
    { src: "/artcoin5.png", baseAngle: 180 },
    { src: "/artcoin6.png", baseAngle: 270 },
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 flex items-center justify-center">
        <PromptOverlay effectNumber={6} effectName="Spiral Vortex" prompt={parallaxPrompts[5]} />
        <div className="absolute top-20 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Spiral Vortex Parallax</h2>
        </div>

        {items.map((item, index) => {
          const radius = useTransform(scrollYProgress, [0, 1], [300, 50])
          const angle = useTransform(scrollYProgress, [0, 1], [item.baseAngle, item.baseAngle + 720])
          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.5])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                x: useTransform(() => Math.cos(angle.get() * Math.PI / 180) * radius.get()),
                y: useTransform(() => Math.sin(angle.get() * Math.PI / 180) * radius.get()),
                scale,
              }}
            >
              <Image src={item.src} alt={`Spiral ${index}`} width={150} height={150} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 7: Wave Motion
function ParallaxEffect7() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const pigs = ["/Baco.jpg", "/singlepig.png", "/pigunderlight.png", "/pigunderlight1.png"]

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-900 to-cyan-950">
        <PromptOverlay effectNumber={7} effectName="Wave Flow" prompt={parallaxPrompts[6]} />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-10">
          <h2 className="text-5xl font-bold text-white">Wave Flow Parallax</h2>
        </div>

        {pigs.map((pig, index) => {
          const y = useTransform(scrollYProgress, [0, 1], [0, 400])
          const waveOffset = useTransform(
            scrollYProgress,
            [0, 1],
            [0, Math.sin(index * Math.PI / 2) * 200]
          )
          const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${20 + index * 20}%`,
                top: "40%",
                y: useTransform(() => y.get() + waveOffset.get()),
                rotate,
              }}
            >
              <Image src={pig} alt={`Pig ${index}`} width={180} height={180} className="object-cover rounded-full border-4 border-teal-500" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 8: Explosion Scatter
function ParallaxEffect8() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = [
    { src: "/Bitcoin-Logo.png", angle: 0, distance: 400 },
    { src: "/bacon-ring.png", angle: 60, distance: 350 },
    { src: "/baconstrip.png", angle: 120, distance: 380 },
    { src: "/wpls-logo.png", angle: 180, distance: 420 },
    { src: "/ourpig.png", angle: 240, distance: 360 },
    { src: "/logo-cartoon.png", angle: 300, distance: 390 },
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-rose-950 via-orange-900 to-amber-950 flex items-center justify-center">
        <PromptOverlay effectNumber={8} effectName="Explosion Scatter" prompt={parallaxPrompts[7]} />
        <motion.div
          className="absolute text-center"
          style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 0.3]) }}
        >
          <Image src="/bacon-wrapped-bitcoin.jpg" alt="Center" width={300} height={300} className="object-cover rounded-full border-8 border-orange-500 shadow-2xl" />
        </motion.div>

        <div className="absolute top-10 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Explosion Scatter Parallax</h2>
        </div>

        {items.map((item, index) => {
          const distance = useTransform(scrollYProgress, [0, 1], [0, item.distance])
          const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0])
          const rotate = useTransform(scrollYProgress, [0, 1], [0, 720])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                x: useTransform(() => Math.cos(item.angle * Math.PI / 180) * distance.get()),
                y: useTransform(() => Math.sin(item.angle * Math.PI / 180) * distance.get()),
                opacity,
                rotate,
              }}
            >
              <Image src={item.src} alt={`Item ${index}`} width={120} height={120} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 9: Depth Tunnel
function ParallaxEffect9() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const layers = [
    { src: "/artcoin1.png", depth: 5 },
    { src: "/artcoin2.png", depth: 4 },
    { src: "/artcoin3.png", depth: 3 },
    { src: "/artcoin4.png", depth: 2 },
    { src: "/artcoin5.png", depth: 1 },
  ]

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" style={{ perspective: "2000px" }}>
        <PromptOverlay effectNumber={9} effectName="3D Depth Tunnel" prompt={parallaxPrompts[8]} />
        <div className="absolute top-20 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">3D Depth Tunnel</h2>
        </div>

        {layers.map((layer, index) => {
          const z = useTransform(scrollYProgress, [0, 1], [0, -1000 * layer.depth])
          const scale = useTransform(scrollYProgress, [0, 1], [1, 3])
          const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ z, scale, opacity, transformStyle: "preserve-3d" }}
            >
              <Image src={layer.src} alt={`Layer ${index}`} width={300} height={300} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 10: Rotating Carousel
function ParallaxEffect10() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const images = [
    "/Baco.jpg",
    "/bacon-wrapped-bitcoin.jpg",
    "/singlepig.png",
    "/pigunderlight.png",
    "/artcoin1.png",
    "/artcoin3.png",
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-900 to-pink-950 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <PromptOverlay effectNumber={10} effectName="3D Carousel" prompt={parallaxPrompts[9]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">3D Carousel Parallax</h2>
        </div>

        {images.map((img, index) => {
          const rotateY = useTransform(scrollYProgress, [0, 1], [index * 60, index * 60 + 360])
          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                rotateY,
                scale,
                transformStyle: "preserve-3d",
                x: useTransform(() => Math.sin(rotateY.get() * Math.PI / 180) * 400),
                z: useTransform(() => Math.cos(rotateY.get() * Math.PI / 180) * 400),
              }}
            >
              <Image src={img} alt={`Carousel ${index}`} width={250} height={250} className="object-cover rounded-2xl border-4 border-pink-500 shadow-2xl" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 11: Liquid Morphing
function ParallaxEffect11() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["50%", "10%", "50%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 200, 0])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 flex items-center justify-center">
        <PromptOverlay effectNumber={11} effectName="Liquid Morph" prompt={parallaxPrompts[10]} />
        <div className="absolute top-20 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Liquid Morph Parallax</h2>
        </div>

        <motion.div
          className="relative w-96 h-96 overflow-hidden border-4 border-blue-500 shadow-2xl"
          style={{ borderRadius, scale, rotate, x }}
        >
          <Image src="/baconbg.png" alt="Morphing" fill className="object-cover" />
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 12: Infinite Zoom
function ParallaxEffect12() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const images = ["/artcoin1.png", "/artcoin2.png", "/artcoin3.png", "/artcoin4.png", "/artcoin5.png"]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={12} effectName="Infinite Zoom" prompt={parallaxPrompts[11]} />
        <div className="absolute top-10 text-center w-full z-30">
          <h2 className="text-5xl font-bold text-white">Infinite Zoom Parallax</h2>
        </div>

        {images.map((img, index) => {
          const scale = useTransform(scrollYProgress, [0, 1], [1 + index * 0.5, 10 + index * 2])
          const opacity = useTransform(
            scrollYProgress,
            [index * 0.15, (index + 1) * 0.15, (index + 2) * 0.15],
            [0, 1, 0]
          )

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ scale, opacity, zIndex: images.length - index }}
            >
              <Image src={img} alt={`Zoom ${index}`} width={400} height={400} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 13: Pendulum Swing
function ParallaxEffect13() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = [
    { src: "/singlepig.png", length: 200 },
    { src: "/Baco.jpg", length: 300 },
    { src: "/ourpig.png", length: 250 },
  ]

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-amber-950 via-orange-900 to-red-950">
        <PromptOverlay effectNumber={13} effectName="Pendulum Swing" prompt={parallaxPrompts[12]} />
        <div className="absolute top-10 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Pendulum Swing Parallax</h2>
        </div>

        {items.map((item, index) => {
          const angle = useTransform(scrollYProgress, [0, 1], [-60 + index * 20, 60 - index * 20])

          return (
            <motion.div
              key={index}
              className="absolute top-0"
              style={{
                left: `${30 + index * 20}%`,
                transformOrigin: "top center",
              }}
            >
              <motion.div
                style={{
                  rotate: angle,
                  transformOrigin: "top center",
                }}
              >
                <div className="w-1 bg-orange-500" style={{ height: `${item.length}px` }} />
                <Image src={item.src} alt={`Pendulum ${index}`} width={150} height={150} className="object-cover rounded-full border-4 border-orange-500 -mt-2" />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 14: Matrix Grid
function ParallaxEffect14() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const gridItems = Array.from({ length: 16 }, (_, i) => ({
    src: ["/Bitcoin-Logo.png", "/wpls-logo.png", "/bacon-ring.png", "/logo-cartoon.png"][i % 4],
    row: Math.floor(i / 4),
    col: i % 4,
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 flex items-center justify-center">
        <PromptOverlay effectNumber={14} effectName="Matrix Grid" prompt={parallaxPrompts[13]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Matrix Grid Parallax</h2>
        </div>

        <div className="relative grid grid-cols-4 gap-8">
          {gridItems.map((item, index) => {
            const y = useTransform(scrollYProgress, [0, 1], [0, (item.row % 2 === 0 ? 1 : -1) * 200])
            const rotate = useTransform(scrollYProgress, [0, 1], [0, (item.col % 2 === 0 ? 1 : -1) * 180])
            const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1])

            return (
              <motion.div key={index} style={{ y, rotate, scale }}>
                <Image src={item.src} alt={`Grid ${index}`} width={100} height={100} className="object-contain" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 15: Double Helix DNA
function ParallaxEffect15() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const helixPoints = Array.from({ length: 20 }, (_, i) => ({
    index: i,
    angle: i * 36,
    src: i % 2 === 0 ? "/artcoin1.png" : "/artcoin3.png",
  }))

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-purple-950 via-indigo-900 to-blue-950 flex items-center justify-center">
        <PromptOverlay effectNumber={15} effectName="DNA Helix" prompt={parallaxPrompts[14]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">DNA Helix Parallax</h2>
        </div>

        {helixPoints.map((point) => {
          const y = useTransform(scrollYProgress, [0, 1], [point.index * 40 - 400, point.index * 40 + 400])
          const x = useTransform(scrollYProgress, [0, 1], [
            Math.cos((point.angle + scrollYProgress.get() * 360) * Math.PI / 180) * 150,
            Math.cos((point.angle + 360) * Math.PI / 180) * 150,
          ])
          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5])

          return (
            <motion.div key={point.index} className="absolute" style={{ x, y, scale }}>
              <Image src={point.src} alt={`Helix ${point.index}`} width={80} height={80} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 16: Book Pages Flip
function ParallaxEffect16() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const pages = [
    { src: "/artcoin1.png", color: "from-red-500/20" },
    { src: "/artcoin2.png", color: "from-orange-500/20" },
    { src: "/artcoin3.png", color: "from-yellow-500/20" },
    { src: "/artcoin4.png", color: "from-green-500/20" },
    { src: "/artcoin5.png", color: "from-blue-500/20" },
    { src: "/artcoin6.png", color: "from-purple-500/20" },
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-amber-950 via-yellow-900 to-orange-950 flex items-center justify-center" style={{ perspective: "1200px" }}>
        <PromptOverlay effectNumber={16} effectName="Book Pages Flip" prompt={parallaxPrompts[15]} />
        <div className="absolute top-10 text-center w-full z-30">
          <h2 className="text-5xl font-bold text-white">Book Pages Flip</h2>
        </div>

        {pages.map((page, index) => {
          const rotateY = useTransform(scrollYProgress, [0, 1], [0, index * 15])
          const x = useTransform(scrollYProgress, [0, 1], [0, index * 20])
          const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7])

          return (
            <motion.div
              key={index}
              className="absolute w-96 h-96"
              style={{ rotateY, x, transformStyle: "preserve-3d", zIndex: pages.length - index }}
            >
              <div className="relative w-full h-full border-4 border-orange-500/30 rounded-lg overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
                <Image src={page.src} alt={`Page ${index}`} fill className="object-cover" />
                <motion.div className={`absolute inset-0 bg-gradient-to-r ${page.color} to-transparent`} style={{ opacity }} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 17: Orbital Motion
function ParallaxEffect17() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const orbiters = [
    { src: "/Bitcoin-Logo.png", speed: 1 },
    { src: "/wpls-logo.png", speed: 2 },
    { src: "/bacon-ring.png", speed: 3 },
    { src: "/logo-cartoon.png", speed: 4 },
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 flex items-center justify-center">
        <PromptOverlay effectNumber={17} effectName="Orbital Motion" prompt={parallaxPrompts[16]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Orbital Parallax</h2>
        </div>

        {/* Center item */}
        <motion.div
          className="absolute"
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -360]) }}
        >
          <Image src="/bacon-wrapped-bitcoin.jpg" alt="Center" width={150} height={150} className="object-cover rounded-full border-4 border-pink-500" />
        </motion.div>

        {/* Orbiting items */}
        {orbiters.map((item, index) => {
          const angle = useTransform(scrollYProgress, [0, 1], [index * 90, index * 90 + item.speed * 360])
          const radius = useTransform(scrollYProgress, [0, 1], [200, 500])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                x: useTransform(() => Math.cos(angle.get() * Math.PI / 180) * radius.get()),
                y: useTransform(() => Math.sin(angle.get() * Math.PI / 180) * radius.get()),
              }}
            >
              <div className="relative">
                <Image src={item.src} alt={`Orbiter ${index}`} width={100} height={100} className="object-contain" />
                <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-xl" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 18: Waterfall Cascade
function ParallaxEffect18() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = Array.from({ length: 12 }, (_, i) => ({
    src: ["/Baco.jpg", "/singlepig.png", "/ourpig.png"][i % 3],
    col: i % 4,
    row: Math.floor(i / 4)
  }))

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-cyan-950 via-blue-900 to-indigo-950">
        <PromptOverlay effectNumber={18} effectName="Waterfall Cascade" prompt={parallaxPrompts[17]} />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-20">
          <h2 className="text-5xl font-bold text-white">Waterfall Cascade</h2>
        </div>

        {items.map((item, index) => {
          const y = useTransform(scrollYProgress, [0, 1], [-500, 1500])
          const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${item.col * 25 + 10}%`,
                y,
                opacity,
              }}
              transition={{ delay: item.row * 0.1 + item.col * 0.3 }}
            >
              <Image src={item.src} alt={`Item ${index}`} width={120} height={120} className="object-cover rounded-lg border-2 border-cyan-500/50" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 19: Zipper Reveal
function ParallaxEffect19() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -400])
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 400])
  const centerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 1])
  const centerOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={19} effectName="Zipper Reveal" prompt={parallaxPrompts[18]} />

        {/* Left half */}
        <motion.div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-red-950 to-orange-900" style={{ x: xLeft }}>
          <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-r from-transparent to-black" />
        </motion.div>

        {/* Right half */}
        <motion.div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-950 to-pink-900" style={{ x: xRight }}>
          <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-l from-transparent to-black" />
        </motion.div>

        {/* Center content */}
        <motion.div className="absolute" style={{ scale: centerScale, opacity: centerOpacity }}>
          <div className="relative w-96 h-96">
            <Image src="/bacon-wrapped-bitcoin.jpg" alt="Revealed" fill className="object-cover rounded-3xl border-8 border-orange-500 shadow-2xl" />
          </div>
          <div className="absolute top-0 text-center w-full -mt-16">
            <h2 className="text-5xl font-bold text-white">Zipper Reveal</h2>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 20: Clock Hands
function ParallaxEffect20() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const hourRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const minuteRotate = useTransform(scrollYProgress, [0, 1], [0, 720])
  const secondRotate = useTransform(scrollYProgress, [0, 1], [0, 1440])

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 flex items-center justify-center">
        <PromptOverlay effectNumber={20} effectName="Clock Hands" prompt={parallaxPrompts[19]} />
        <div className="absolute top-10 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Clock Hands Parallax</h2>
        </div>

        {/* Clock face */}
        <div className="absolute w-96 h-96 rounded-full border-8 border-orange-500/30 bg-black/50 backdrop-blur-sm">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-8 bg-orange-500/50 top-4 left-1/2 -translate-x-1/2"
              style={{ transformOrigin: "50% 184px", transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>

        {/* Hour hand */}
        <motion.div className="absolute" style={{ rotate: hourRotate, transformOrigin: "bottom center" }}>
          <div className="w-4 h-32 bg-orange-500 rounded-full" />
        </motion.div>

        {/* Minute hand */}
        <motion.div className="absolute" style={{ rotate: minuteRotate, transformOrigin: "bottom center" }}>
          <div className="w-3 h-48 bg-pink-500 rounded-full" />
        </motion.div>

        {/* Second hand */}
        <motion.div className="absolute" style={{ rotate: secondRotate, transformOrigin: "bottom center" }}>
          <div className="w-1 h-56 bg-cyan-400 rounded-full" />
        </motion.div>

        {/* Center dot */}
        <div className="absolute w-6 h-6 rounded-full bg-white border-2 border-orange-500" />
      </div>
    </div>
  )
}

// Parallax Effect 21: Curtain Reveal
function ParallaxEffect21() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-purple-950 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={21} effectName="Curtain Reveal" prompt={parallaxPrompts[20]} />

        {/* Behind content */}
        <motion.div className="absolute" style={{ scale: contentScale, opacity: contentOpacity }}>
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white mb-8">Curtain Reveal</h2>
            <div className="relative w-96 h-96 mx-auto">
              <Image src="/baconbg.png" alt="Stage" fill className="object-cover rounded-2xl border-4 border-pink-500" />
            </div>
          </div>
        </motion.div>

        {/* Left curtain */}
        <motion.div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-red-900 via-red-800 to-red-900 z-10" style={{ x: leftX }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
        </motion.div>

        {/* Right curtain */}
        <motion.div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-900 via-red-800 to-red-900 z-10" style={{ x: rightX }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 22: Fisheye Lens
function ParallaxEffect22() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = Array.from({ length: 16 }, (_, i) => ({
    src: ["/artcoin1.png", "/artcoin2.png", "/artcoin3.png", "/artcoin4.png"][i % 4],
    x: (i % 4 - 1.5) * 200,
    y: (Math.floor(i / 4) - 1.5) * 200
  }))

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-black via-blue-950 to-purple-950 flex items-center justify-center">
        <PromptOverlay effectNumber={22} effectName="Fisheye Lens" prompt={parallaxPrompts[21]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Fisheye Lens Parallax</h2>
        </div>

        {items.map((item, index) => {
          const distance = Math.sqrt(item.x * item.x + item.y * item.y)
          const maxDistance = Math.sqrt(300 * 300 + 300 * 300)
          const bulge = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + (distance / maxDistance) * 0.5, 1])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                x: item.x,
                y: item.y,
                scale: bulge
              }}
            >
              <Image src={item.src} alt={`Item ${index}`} width={100} height={100} className="object-contain" />
            </motion.div>
          )
        })}

        {/* Radial blur overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>
    </div>
  )
}

// Parallax Effect 23: Typewriter Roll
function ParallaxEffect23() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const blocks = [
    { text: "BACON WRAPPED BITCOIN", color: "text-orange-400" },
    { text: "CRYPTO MEETS PORK", color: "text-pink-400" },
    { text: "TO THE MOON", color: "text-purple-400" },
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={23} effectName="Typewriter Roll" prompt={parallaxPrompts[22]} />
        <div className="absolute top-10 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Typewriter Roll</h2>
        </div>

        {blocks.map((block, index) => {
          const rotateX = useTransform(scrollYProgress, [index * 0.3, (index + 1) * 0.3], [90, 0])
          const y = useTransform(scrollYProgress, [index * 0.3, (index + 1) * 0.3], [400, -400])
          const opacity = useTransform(scrollYProgress, [index * 0.3, (index + 1) * 0.3, (index + 2) * 0.3], [0, 1, 0])

          return (
            <motion.div
              key={index}
              className="absolute w-full"
              style={{ rotateX, y, opacity, transformStyle: "preserve-3d" }}
            >
              <div className="bg-yellow-100/10 border-y-2 border-orange-500/30 py-8 px-12">
                <p className={`text-4xl font-mono ${block.color} font-bold tracking-wider`}>{block.text}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 24: Kaleidoscope
function ParallaxEffect24() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const segments = 8
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 1])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={24} effectName="Kaleidoscope" prompt={parallaxPrompts[23]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Kaleidoscope Parallax</h2>
        </div>

        <motion.div style={{ rotate, scale }}>
          {Array.from({ length: segments }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                rotate: (360 / segments) * index,
                transformOrigin: "center",
              }}
            >
              <div
                className="relative w-40 h-40"
                style={{
                  filter: `hue-rotate(${(360 / segments) * index}deg)`,
                  transform: `translateY(-200px)`
                }}
              >
                <Image src="/bacon-wrapped-bitcoin.jpg" alt="Segment" fill className="object-cover rounded-lg" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 25: Domino Cascade
function ParallaxEffect25() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const dominoes = Array.from({ length: 10 }, (_, i) => ({
    src: ["/Baco.jpg", "/singlepig.png"][i % 2],
    index: i
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-orange-950 via-red-900 to-black flex items-end justify-center pb-20">
        <PromptOverlay effectNumber={25} effectName="Domino Cascade" prompt={parallaxPrompts[24]} />
        <div className="absolute top-10 text-center w-full">
          <h2 className="text-5xl font-bold text-white">Domino Cascade</h2>
        </div>

        <div className="flex gap-8">
          {dominoes.map((domino) => {
            const rotateFall = useTransform(scrollYProgress, [domino.index * 0.08, (domino.index + 1) * 0.08], [0, 90])
            const slideX = useTransform(scrollYProgress, [domino.index * 0.08, (domino.index + 1) * 0.08], [0, 30])

            return (
              <motion.div
                key={domino.index}
                className="relative w-24 h-40"
                style={{
                  rotateZ: rotateFall,
                  x: slideX,
                  transformOrigin: "bottom right"
                }}
              >
                <div className="w-full h-full bg-orange-500/20 border-4 border-orange-500 rounded-lg overflow-hidden">
                  <Image src={domino.src} alt={`Domino ${domino.index}`} fill className="object-cover" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 26: Tunnel Vision
function ParallaxEffect26() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rings = Array.from({ length: 8 }, (_, i) => ({
    size: 100 + i * 100,
    color: ["border-pink-500", "border-orange-500", "border-purple-500", "border-cyan-500"][i % 4]
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={26} effectName="Tunnel Vision" prompt={parallaxPrompts[25]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Tunnel Vision</h2>
        </div>

        {rings.map((ring, index) => {
          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [5 - index * 0.5, 1, 0.5])
          const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

          return (
            <motion.div
              key={index}
              className={`absolute rounded-full border-4 ${ring.color}`}
              style={{
                width: ring.size,
                height: ring.size,
                scale,
                opacity
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 27: Origami Fold
function ParallaxEffect27() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const foldRotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const topRotate = useTransform(scrollYProgress, [0, 1], [0, -90])
  const bottomRotate = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-teal-950 via-green-900 to-emerald-950 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <PromptOverlay effectNumber={27} effectName="Origami Fold" prompt={parallaxPrompts[26]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Origami Fold</h2>
        </div>

        <motion.div style={{ rotateY: foldRotate, transformStyle: "preserve-3d" }}>
          {/* Top half */}
          <motion.div
            className="absolute top-0"
            style={{ rotateX: topRotate, transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
          >
            <div className="relative w-96 h-48 border-4 border-green-500 bg-green-900/50 overflow-hidden">
              <Image src="/baconbg.png" alt="Top" fill className="object-cover object-top" />
            </div>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="absolute top-48"
            style={{ rotateX: bottomRotate, transformOrigin: "top center", transformStyle: "preserve-3d" }}
          >
            <div className="relative w-96 h-48 border-4 border-green-500 bg-green-900/50 overflow-hidden">
              <Image src="/baconbg.png" alt="Bottom" fill className="object-cover object-bottom" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 28: Magnetic Field
function ParallaxEffect28() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const particles = Array.from({ length: 20 }, (_, i) => ({
    src: ["/bacon-ring.png", "/Bitcoin-Logo.png"][i % 2],
    side: i % 2 === 0 ? -1 : 1,
    offset: i * 40
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 flex items-center justify-center">
        <PromptOverlay effectNumber={28} effectName="Magnetic Field" prompt={parallaxPrompts[27]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Magnetic Field</h2>
        </div>

        {particles.map((particle, index) => {
          const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
          const x = useTransform(progress, (p) => particle.side * Math.sin(p * Math.PI * 2) * 300)
          const y = useTransform(scrollYProgress, [0, 1], [-200 + particle.offset, 200 + particle.offset])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ x, y }}
            >
              <Image src={particle.src} alt={`Particle ${index}`} width={60} height={60} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 29: Record Spin
function ParallaxEffect29() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080])
  const scale = useTransform(scrollYProgress, [0, 1], [2, 0.3])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={29} effectName="Record Spin" prompt={parallaxPrompts[28]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Record Spin</h2>
        </div>

        <motion.div style={{ rotate, scale, opacity }}>
          <div className="relative w-96 h-96 rounded-full bg-gradient-to-br from-gray-900 to-black border-8 border-orange-500 overflow-hidden">
            <Image src="/bacon-wrapped-bitcoin.jpg" alt="Record" fill className="object-cover rounded-full" />
            {/* Vinyl grooves */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-white/10"
                style={{
                  width: `${90 - i * 4}%`,
                  height: `${90 - i * 4}%`,
                  top: `${5 + i * 2}%`,
                  left: `${5 + i * 2}%`
                }}
              />
            ))}
            {/* Center label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-orange-500/30 backdrop-blur-sm border-2 border-orange-500" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 30: Particle Cloud
function ParallaxEffect30() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const particles = Array.from({ length: 50 }, (_, i) => ({
    depth: Math.random(),
    xOffset: Math.random() * 200 - 100,
    yOffset: Math.random() * 200 - 100,
    size: 10 + Math.random() * 20
  }))

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center">
        <PromptOverlay effectNumber={30} effectName="Particle Cloud" prompt={parallaxPrompts[29]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Particle Cloud</h2>
        </div>

        {particles.map((particle, index) => {
          const y = useTransform(scrollYProgress, [0, 1], [-500 * particle.depth, 1000 * particle.depth])
          const x = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 4 + particle.depth * 10) * 100 + particle.xOffset)
          const scale = 0.3 + particle.depth * 0.7
          const opacity = 0.3 + particle.depth * 0.7

          return (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                x,
                y: useTransform(() => y.get() + particle.yOffset),
                scale,
                opacity,
                width: particle.size,
                height: particle.size,
                backgroundColor: `hsl(${280 + particle.depth * 80}, 70%, 60%)`,
                boxShadow: `0 0 ${particle.size}px hsl(${280 + particle.depth * 80}, 70%, 60%)`
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 31: Rising Columns
function ParallaxEffect31() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const columns = Array.from({ length: 8 }, (_, i) => ({
    src: ["/artcoin1.png", "/artcoin2.png", "/artcoin3.png", "/artcoin4.png"][i % 4],
    delay: i * 0.1
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-gray-800 to-black flex items-end justify-center pb-10">
        <PromptOverlay effectNumber={31} effectName="Rising Columns" prompt={parallaxPrompts[30]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Rising Columns</h2>
        </div>

        <div className="flex gap-4">
          {columns.map((col, index) => {
            const y = useTransform(scrollYProgress, [index * 0.08, (index + 1) * 0.08 + 0.3], ["100%", "-20%"])
            const rotate = useTransform(scrollYProgress, [index * 0.08, (index + 1) * 0.08 + 0.3], [10 - index * 2, -5 + index])

            return (
              <motion.div key={index} className="relative" style={{ y, rotate }}>
                <Image src={col.src} alt={`Column ${index}`} width={100} height={300} className="object-cover rounded-lg border-2 border-orange-500/50" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 32: Accordion Squeeze
function ParallaxEffect32() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const sections = [
    { src: "/Baco.jpg", color: "orange" },
    { src: "/singlepig.png", color: "pink" },
    { src: "/pigunderlight.png", color: "purple" },
    { src: "/ourpig.png", color: "cyan" }
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center gap-0">
        <PromptOverlay effectNumber={32} effectName="Accordion Squeeze" prompt={parallaxPrompts[31]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Accordion Squeeze</h2>
        </div>

        {sections.map((section, index) => {
          const scaleY = useTransform(scrollYProgress, [index * 0.2, (index + 1) * 0.2], [1, 0.1])
          const y = useTransform(scrollYProgress, [index * 0.2, (index + 1) * 0.2], [0, index < 2 ? -100 : 100])

          return (
            <motion.div key={index} className="relative w-full" style={{ scaleY, y, transformOrigin: "center" }}>
              <div className="relative w-full h-32">
                <Image src={section.src} alt={`Section ${index}`} fill className="object-cover" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 33: Photo Strip
function ParallaxEffect33() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const frames = ["/Baco.jpg", "/singlepig.png", "/pigunderlight.png", "/ourpig.png", "/bacon-wrapped-bitcoin.jpg"]

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900 flex items-center justify-center">
        <PromptOverlay effectNumber={33} effectName="Photo Strip" prompt={parallaxPrompts[32]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Photo Strip</h2>
        </div>

        {frames.map((frame, index) => {
          const x = useTransform(scrollYProgress, [0, 1], [-200 + index * 100, 200 - index * 100])
          const y = useTransform(scrollYProgress, [0, 1], [-100 + index * 50, 100 - index * 50])
          const rotate = useTransform(scrollYProgress, [0, 1], [-5 + index * 2, 5 - index * 2])

          return (
            <motion.div key={index} className="absolute" style={{ x, y, rotate }}>
              <div className="relative w-48 h-48 border-8 border-black rounded-sm">
                <Image src={frame} alt={`Frame ${index}`} fill className="object-cover" />
                {/* Sprocket holes */}
                <div className="absolute -left-2 top-4 w-2 h-2 bg-black rounded-full" />
                <div className="absolute -left-2 bottom-4 w-2 h-2 bg-black rounded-full" />
                <div className="absolute -right-2 top-4 w-2 h-2 bg-black rounded-full" />
                <div className="absolute -right-2 bottom-4 w-2 h-2 bg-black rounded-full" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 34: Radar Sweep
function ParallaxEffect34() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720])
  const items = Array.from({ length: 8 }, (_, i) => ({
    angle: i * 45,
    distance: 150 + (i % 3) * 50
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 flex items-center justify-center">
        <PromptOverlay effectNumber={34} effectName="Radar Sweep" prompt={parallaxPrompts[33]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Radar Sweep</h2>
        </div>

        {/* Radar grid */}
        {[100, 200, 300].map((r, i) => (
          <div key={i} className="absolute rounded-full border border-green-500/30" style={{ width: r * 2, height: r * 2 }} />
        ))}

        {/* Sweep line */}
        <motion.div
          className="absolute w-1 h-80 bg-gradient-to-t from-green-500 to-transparent origin-bottom"
          style={{ rotate, transformOrigin: "bottom center" }}
        />

        {/* Items */}
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 rounded-full bg-green-400"
            style={{
              x: Math.cos(item.angle * Math.PI / 180) * item.distance,
              y: Math.sin(item.angle * Math.PI / 180) * item.distance,
              boxShadow: "0 0 20px #4ade80"
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}

// Parallax Effect 35: Venetian Blinds
function ParallaxEffect35() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const slats = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" style={{ perspective: "1000px" }}>
        <PromptOverlay effectNumber={35} effectName="Venetian Blinds" prompt={parallaxPrompts[34]} />

        {/* Background - Bacon Wrapped Bitcoin (revealed when blinds open) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image src="/bacon-black-logo.png" alt="Bacon Wrapped Bitcoin Revealed" fill className="object-contain" />
          </div>
        </div>

        <div className="absolute top-10 text-center w-full z-30">
          <h2 className="text-5xl font-bold text-white drop-shadow-lg">Venetian Blinds</h2>
        </div>

        {/* Slats with BTC Pulse Logo - split across accordion slats */}
        <div className="absolute inset-0 flex flex-col">
          {slats.map((index) => {
            const rotateX = useTransform(scrollYProgress, [index * 0.05, (index + 1) * 0.05 + 0.2], [0, 90])
            const slatHeight = 100 / slats.length

            return (
              <motion.div
                key={index}
                className="flex-1 relative overflow-hidden"
                style={{ rotateX, transformOrigin: "top", transformStyle: "preserve-3d" }}
              >
                {/* Slat showing horizontal slice of BTC Pulse Logo */}
                <div className="absolute inset-0 bg-black overflow-hidden">
                  {/* Position the full image and show only this slat's slice */}
                  <div
                    className="absolute left-1/2 top-0 w-screen h-screen flex items-center justify-center"
                    style={{
                      transform: `translate(-50%, ${-index * slatHeight}%)`,
                    }}
                  >
                    <div className="relative" style={{ width: '50vh', height: '50vh' }}>
                      <Image
                        src="/btcpulselogo.png"
                        alt="BTC Pulse Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Slat border */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 36: Conveyor Belt
function ParallaxEffect36() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = Array.from({ length: 6 }, (_, i) => ({
    src: ["/Bitcoin-Logo.png", "/wpls-logo.png", "/bacon-ring.png"][i % 3],
    offset: i * 200
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
        <PromptOverlay effectNumber={36} effectName="Conveyor Belt" prompt={parallaxPrompts[35]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Conveyor Belt</h2>
        </div>

        {/* Belt */}
        <div className="absolute bottom-32 w-full h-2 bg-gray-600" />
        <div className="absolute bottom-32 w-full h-px bg-gray-400" />

        {items.map((item, index) => {
          const x = useTransform(scrollYProgress, [0, 1], [-600 + item.offset, 600 + item.offset])
          const scale = useTransform(x, [-400, 0, 400], [0.6, 1, 0.6])

          return (
            <motion.div key={index} className="absolute bottom-40" style={{ x, scale }}>
              <Image src={item.src} alt={`Item ${index}`} width={120} height={120} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 37: Spiral Staircase
function ParallaxEffect37() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const steps = Array.from({ length: 15 }, (_, i) => ({
    src: ["/artcoin1.png", "/artcoin2.png", "/artcoin3.png"][i % 3],
    index: i
  }))

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-900 to-blue-950 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <PromptOverlay effectNumber={37} effectName="Spiral Staircase" prompt={parallaxPrompts[36]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Spiral Staircase</h2>
        </div>

        {steps.map((step) => {
          const rotateZ = useTransform(scrollYProgress, [0, 1], [step.index * 48, step.index * 48 + 720])
          const y = useTransform(scrollYProgress, [0, 1], [-400 + step.index * 40, 400 + step.index * 40])
          const scale = useTransform(y, [-400, 0, 400], [0.5, 1, 0.5])

          return (
            <motion.div
              key={step.index}
              className="absolute"
              style={{ rotateZ, y, scale, transformStyle: "preserve-3d" }}
            >
              <Image src={step.src} alt={`Step ${step.index}`} width={100} height={100} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 38: Paper Shred
function ParallaxEffect38() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const strips = Array.from({ length: 10 }, (_, i) => ({
    offset: i * 10,
    rotation: (Math.random() - 0.5) * 60
  }))

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={38} effectName="Paper Shred" prompt={parallaxPrompts[37]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Paper Shred</h2>
        </div>

        {strips.map((strip, index) => {
          const y = useTransform(scrollYProgress, [0, 1], [-200 + strip.offset, 800 + strip.offset])
          const rotate = useTransform(scrollYProgress, [0, 1], [0, strip.rotation])
          const x = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 2 + index) * 30)

          return (
            <motion.div
              key={index}
              className="absolute w-20 h-96 bg-gradient-to-b from-orange-400 to-pink-500"
              style={{
                y,
                rotate,
                x,
                left: `${10 + index * 9}%`,
                clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)"
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 39: Telescope Zoom
function ParallaxEffect39() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const vignettes = [
    { src: "/bacon-wrapped-bitcoin.jpg" },
    { src: "/Baco.jpg" },
    { src: "/singlepig.png" },
    { src: "/pigunderlight.png" }
  ]

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={39} effectName="Telescope Zoom" prompt={parallaxPrompts[38]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Telescope Zoom</h2>
        </div>

        {vignettes.map((vignette, index) => {
          const scale = useTransform(scrollYProgress, [index * 0.2, (index + 1) * 0.2], [0.1, 3])
          const opacity = useTransform(scrollYProgress, [index * 0.2, (index + 0.5) * 0.2, (index + 1) * 0.2], [0, 1, 0])

          return (
            <motion.div
              key={index}
              className="absolute w-96 h-96 rounded-full overflow-hidden"
              style={{ scale, opacity }}
            >
              <Image src={vignette.src} alt={`View ${index}`} fill className="object-cover" />
              <div className="absolute inset-0 border-8 border-black rounded-full" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 40: Chain Link
function ParallaxEffect40() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const nodes = Array.from({ length: 6 }, (_, i) => ({
    src: ["/Bitcoin-Logo.png", "/wpls-logo.png"][i % 2],
    angle: i * 60
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-950 flex items-center justify-center">
        <PromptOverlay effectNumber={40} effectName="Chain Link" prompt={parallaxPrompts[39]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Chain Link</h2>
        </div>

        <svg className="absolute w-full h-full">
          {nodes.map((_, index) => {
            if (index < nodes.length - 1) {
              return (
                <line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  className="opacity-50"
                />
              )
            }
            return null
          })}
        </svg>

        {nodes.map((node, index) => {
          const radius = useTransform(scrollYProgress, [0, 1], [150, 300])
          const angle = useTransform(scrollYProgress, [0, 1], [node.angle, node.angle + 360])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                x: useTransform(() => Math.cos(angle.get() * Math.PI / 180) * radius.get()),
                y: useTransform(() => Math.sin(angle.get() * Math.PI / 180) * radius.get())
              }}
            >
              <Image src={node.src} alt={`Node ${index}`} width={80} height={80} className="object-contain" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 41: Elevator Shaft
function ParallaxEffect41() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const floors = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    content: `/artcoin${(i % 6) + 1}.png`
  }))

  const y = useTransform(scrollYProgress, [0, 1], [0, -2000])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={41} effectName="Elevator Shaft" prompt={parallaxPrompts[40]} />

        {/* Elevator cables */}
        <div className="absolute left-1/4 top-0 w-1 h-full bg-gray-600" />
        <div className="absolute right-1/4 top-0 w-1 h-full bg-gray-600" />

        <motion.div className="relative" style={{ y }}>
          {floors.map((floor, index) => (
            <div key={index} className="relative h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="absolute top-10 left-10 text-6xl font-bold text-orange-500">Floor {floor.number}</div>
                <Image src={floor.content} alt={`Floor ${floor.number}`} width={300} height={300} className="object-contain" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 42: Mirror Reflection
function ParallaxEffect42() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const reflectionY = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-cyan-950 to-blue-950 flex items-center justify-center">
        <PromptOverlay effectNumber={42} effectName="Mirror Reflection" prompt={parallaxPrompts[41]} />

        {/* Main content */}
        <motion.div className="relative z-10" style={{ y }}>
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Mirror Reflection</h2>
            <Image src="/bacon-wrapped-bitcoin.jpg" alt="Main" width={300} height={300} className="object-cover rounded-2xl border-4 border-cyan-500" />
          </div>
        </motion.div>

        {/* Reflection */}
        <motion.div
          className="absolute top-1/2 mt-32"
          style={{ y: reflectionY, scaleY: -1, opacity: 0.4, filter: "blur(4px)" }}
        >
          <Image src="/bacon-wrapped-bitcoin.jpg" alt="Reflection" width={300} height={300} className="object-cover rounded-2xl" />
        </motion.div>

        {/* Water line */}
        <div className="absolute top-1/2 w-full h-px bg-cyan-400/50 mt-16" />
      </div>
    </div>
  )
}

// Parallax Effect 43: Accordion Fold-Out
function ParallaxEffect43() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const panels = Array.from({ length: 6 }, (_, i) => ({
    src: `/artcoin${(i % 6) + 1}.png`,
    direction: i % 2 === 0 ? 1 : -1
  }))

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-orange-950 to-red-950 flex items-center justify-center" style={{ perspective: "1200px" }}>
        <PromptOverlay effectNumber={43} effectName="Accordion Fold-Out" prompt={parallaxPrompts[42]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Accordion Fold-Out</h2>
        </div>

        <div className="flex">
          {panels.map((panel, index) => {
            const rotateY = useTransform(scrollYProgress, [index * 0.15, (index + 1) * 0.15], [panel.direction * 90, 0])

            return (
              <motion.div
                key={index}
                className="w-32 h-48 bg-orange-600 border-r-2 border-orange-800"
                style={{ rotateY, transformOrigin: panel.direction === 1 ? "left" : "right", transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full">
                  <Image src={panel.src} alt={`Panel ${index}`} fill className="object-cover" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 44: Planetary Orbit
function ParallaxEffect44() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const planets = [
    { src: "/Bitcoin-Logo.png", orbit: 120, speed: 1, tilt: 0 },
    { src: "/wpls-logo.png", orbit: 200, speed: 0.7, tilt: 30 },
    { src: "/bacon-ring.png", orbit: 280, speed: 0.5, tilt: -20 }
  ]

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" style={{ perspective: "1500px" }}>
        <PromptOverlay effectNumber={44} effectName="Planetary Orbit" prompt={parallaxPrompts[43]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Planetary Orbit</h2>
        </div>

        {/* Sun */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500" style={{ boxShadow: "0 0 100px #fbbf24" }} />

        {/* Orbits */}
        {planets.map((planet, index) => {
          const angle = useTransform(scrollYProgress, [0, 1], [0, 360 * planet.speed])

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                rotateX: planet.tilt,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Orbit path */}
              <div
                className="absolute rounded-full border border-white/20"
                style={{
                  width: planet.orbit * 2,
                  height: planet.orbit * 2,
                  left: -planet.orbit,
                  top: -planet.orbit
                }}
              />

              {/* Planet */}
              <motion.div
                className="absolute"
                style={{
                  x: useTransform(() => Math.cos(angle.get() * Math.PI / 180) * planet.orbit),
                  y: useTransform(() => Math.sin(angle.get() * Math.PI / 180) * planet.orbit)
                }}
              >
                <Image src={planet.src} alt={`Planet ${index}`} width={60} height={60} className="object-contain" />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 45: Ticker Tape
function ParallaxEffect45() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const tickers = [
    { text: "BACON • BITCOIN • PORK • CRYPTO", speed: 1, color: "text-orange-400" },
    { text: "🥓 WRAPPED • TO THE MOON • HODL 🚀", speed: -0.7, color: "text-pink-400" },
    { text: "BLOCKCHAIN • SWINE • INNOVATION", speed: 1.3, color: "text-purple-400" }
  ]

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center gap-8">
        <PromptOverlay effectNumber={45} effectName="Ticker Tape" prompt={parallaxPrompts[44]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Ticker Tape</h2>
        </div>

        {tickers.map((ticker, index) => {
          const x = useTransform(scrollYProgress, [0, 1], [0, ticker.speed * 1000])
          const y = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 4 + index) * 20)

          return (
            <motion.div key={index} className="relative w-full overflow-hidden" style={{ y }}>
              <motion.div className={`text-4xl font-bold ${ticker.color} whitespace-nowrap`} style={{ x }}>
                {ticker.text.repeat(5)}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 46: Paper Shred
function ParallaxEffect46() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const strips = Array.from({ length: 12 })

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-red-950 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={46} effectName="Paper Shred" prompt={parallaxPrompts[45]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Paper Shred</h2>
        </div>

        <div className="relative w-full h-full flex">
          {strips.map((_, index) => {
            const y = useTransform(scrollYProgress, [0, 1], [0, 800 + index * 50])
            const rotate = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? 1 : -1) * 45])
            const x = useTransform(scrollYProgress, (p) => Math.sin(p * Math.PI * 2 + index) * 30)

            return (
              <motion.div
                key={index}
                className="flex-1 bg-gradient-to-b from-orange-600 to-red-800 relative"
                style={{
                  y,
                  rotate,
                  x,
                  clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
                }}
              >
                <div className="absolute inset-0 bg-[url('/bacon-wrapped-bitcoin.jpg')] bg-cover opacity-20" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 47: Telescope Zoom
function ParallaxEffect47() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const circles = Array.from({ length: 5 })

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <PromptOverlay effectNumber={47} effectName="Telescope Zoom" prompt={parallaxPrompts[46]} />

        {circles.map((_, index) => {
          const scale = useTransform(
            scrollYProgress,
            [index * 0.2, (index + 1) * 0.2],
            [0.1, 3]
          )
          const opacity = useTransform(
            scrollYProgress,
            [index * 0.2, index * 0.2 + 0.1, (index + 1) * 0.2 - 0.1, (index + 1) * 0.2],
            [0, 1, 1, 0]
          )

          return (
            <motion.div
              key={index}
              className="absolute w-96 h-96 rounded-full border-4 border-white flex items-center justify-center overflow-hidden"
              style={{ scale, opacity }}
            >
              <Image
                src="/Bitcoin-Logo.png"
                alt="Bitcoin"
                width={300}
                height={300}
                className="object-contain"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 48: Chain Link
function ParallaxEffect48() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const items = Array.from({ length: 6 })

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-purple-900 to-black">
        <PromptOverlay effectNumber={48} effectName="Chain Link" prompt={parallaxPrompts[47]} />
        <div className="absolute top-10 text-center w-full z-20">
          <h2 className="text-5xl font-bold text-white">Chain Link</h2>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {items.map((_, index) => {
            if (index === items.length - 1) return null
            const angle1 = (index / items.length) * Math.PI * 2
            const angle2 = ((index + 1) / items.length) * Math.PI * 2
            const radius = 250
            const x1 = Math.cos(angle1) * radius + window.innerWidth / 2
            const y1 = Math.sin(angle1) * radius + window.innerHeight / 2
            const x2 = Math.cos(angle2) * radius + window.innerWidth / 2
            const y2 = Math.sin(angle2) * radius + window.innerHeight / 2

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
            )
          })}
        </svg>

        {items.map((_, index) => {
          const angle = useTransform(
            scrollYProgress,
            [0, 1],
            [(index / items.length) * 360, (index / items.length) * 360 + 360]
          )
          const radius = 250

          return (
            <motion.div
              key={index}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl"
              style={{
                left: '50%',
                top: '50%',
                x: useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * radius - 40),
                y: useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * radius - 40),
              }}
            >
              {index + 1}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 49: Elevator Shaft
function ParallaxEffect49() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -800])
  const floors = Array.from({ length: 10 })

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <PromptOverlay effectNumber={49} effectName="Elevator Shaft" prompt={parallaxPrompts[48]} />

        {/* Shaft walls */}
        <div className="absolute inset-y-0 left-20 w-1 bg-gray-700" />
        <div className="absolute inset-y-0 right-20 w-1 bg-gray-700" />

        {/* Elevator car */}
        <motion.div className="absolute w-64 h-80 bg-gradient-to-b from-gray-800 to-gray-900 border-4 border-orange-500 rounded-lg flex flex-col items-center justify-center" style={{ y }}>
          <div className="text-6xl font-bold text-white mb-4">
            {useTransform(scrollYProgress, (p) => Math.floor(p * 10) + 1)}
          </div>
          <div className="text-xl text-gray-400">FLOOR</div>
        </motion.div>

        {/* Floor indicators */}
        {floors.map((_, index) => {
          const floorY = -index * 100 + 400
          return (
            <div
              key={index}
              className="absolute right-32 flex items-center gap-2"
              style={{ top: `${floorY}px` }}
            >
              <span className="text-white text-2xl font-bold">{10 - index}</span>
              <div className="w-12 h-1 bg-gray-600" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 50: Mirror Reflection
function ParallaxEffect50() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const reflectionY = useTransform(scrollYProgress, [0, 1], [0, 250])

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black flex flex-col items-center justify-center">
        <PromptOverlay effectNumber={50} effectName="Mirror Reflection" prompt={parallaxPrompts[49]} />

        {/* Main content */}
        <motion.div className="relative z-10" style={{ y }}>
          <Image src="/Bitcoin-Logo.png" alt="Bitcoin" width={300} height={300} className="object-contain" />
          <h2 className="text-4xl font-bold text-white text-center mt-4">Bitcoin</h2>
        </motion.div>

        {/* Reflection line */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 my-8" />

        {/* Reflection */}
        <motion.div className="relative scale-y-[-1] opacity-40 blur-sm" style={{ y: reflectionY }}>
          <Image src="/Bitcoin-Logo.png" alt="Bitcoin Reflection" width={300} height={300} className="object-contain" />
          <h2 className="text-4xl font-bold text-white text-center mt-4">Bitcoin</h2>
        </motion.div>
      </div>
    </div>
  )
}

// Parallax Effect 51: Accordion Fold-out
function ParallaxEffect51() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const panels = Array.from({ length: 8 })

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" style={{ perspective: '1500px', backgroundColor: '#1a1a2e' }}>
        <PromptOverlay effectNumber={51} effectName="Accordion Fold-out" prompt={parallaxPrompts[50]} />

        <div className="flex" style={{ transformStyle: 'preserve-3d' }}>
          {panels.map((_, index) => {
            const rotateY = useTransform(
              scrollYProgress,
              [0, 1],
              [index % 2 === 0 ? 90 : -90, 0]
            )

            return (
              <motion.div
                key={index}
                className="w-32 h-96 bg-gradient-to-b from-orange-500 to-red-600 border-r border-black"
                style={{
                  rotateY,
                  transformStyle: 'preserve-3d',
                  transformOrigin: index % 2 === 0 ? 'right' : 'left'
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                  {index + 1}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Parallax Effect 52: Planetary Orbit
function ParallaxEffect52() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const orbits = [
    { radius: 150, speed: 1, color: 'from-yellow-400 to-orange-500', size: 40 },
    { radius: 250, speed: 0.7, color: 'from-blue-400 to-purple-500', size: 60 },
    { radius: 350, speed: 0.5, color: 'from-green-400 to-teal-500', size: 50 },
    { radius: 450, speed: 0.3, color: 'from-pink-400 to-red-500', size: 70 }
  ]

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center" style={{ perspective: '2000px' }}>
        <PromptOverlay effectNumber={52} effectName="Planetary Orbit" prompt={parallaxPrompts[51]} />

        {/* Sun/Center */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-600 shadow-2xl shadow-orange-500/50" />

        {/* Orbit rings and planets */}
        {orbits.map((orbit, index) => {
          const angle = useTransform(scrollYProgress, [0, 1], [0, 360 * orbit.speed])
          const rotateX = useTransform(scrollYProgress, [0, 1], [60, 0])

          return (
            <div key={index}>
              {/* Orbit ring */}
              <motion.div
                className="absolute border border-gray-700 rounded-full"
                style={{
                  width: orbit.radius * 2,
                  height: orbit.radius * 2,
                  left: '50%',
                  top: '50%',
                  marginLeft: -orbit.radius,
                  marginTop: -orbit.radius,
                  rotateX,
                  transformStyle: 'preserve-3d'
                }}
              />

              {/* Planet */}
              <motion.div
                className={`absolute rounded-full bg-gradient-to-br ${orbit.color} shadow-xl`}
                style={{
                  width: orbit.size,
                  height: orbit.size,
                  left: '50%',
                  top: '50%',
                  x: useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * orbit.radius - orbit.size / 2),
                  y: useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * orbit.radius - orbit.size / 2),
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Parallax Effect 53: Confetti Burst
function ParallaxEffect53() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    angle: (Math.random() * 360),
    distance: Math.random() * 600 + 200,
    rotation: Math.random() * 720,
    color: ['bg-orange-500', 'bg-pink-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'][Math.floor(Math.random() * 5)]
  }))

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center">
        <PromptOverlay effectNumber={53} effectName="Confetti Burst" prompt="Confetti particles burst from center outward with rotation and fade" />

        <div className="absolute text-center z-20">
          <h2 className="text-6xl font-bold text-white mb-4">🎉 Celebration! 🎉</h2>
        </div>

        {confetti.map((particle, index) => {
          const distance = useTransform(scrollYProgress, [0, 1], [0, particle.distance])
          const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
          const rotate = useTransform(scrollYProgress, [0, 1], [0, particle.rotation])

          return (
            <motion.div
              key={index}
              className={`absolute w-4 h-8 ${particle.color} rounded-sm`}
              style={{
                left: '50%',
                top: '50%',
                x: useTransform(distance, (d) => Math.cos((particle.angle * Math.PI) / 180) * d),
                y: useTransform(distance, (d) => Math.sin((particle.angle * Math.PI) / 180) * d),
                rotate,
                opacity
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function DemoParallax() {
  return (
    <div className="bg-black">
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Parallax Collection
          </h1>
          <p className="text-2xl text-gray-400 mb-8">Scroll down to experience 53 different parallax effects</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-orange-500 text-4xl"
          >
            ↓
          </motion.div>
        </div>
      </div>

      <Separator number={1} />
      <ParallaxEffect1 />

      <Separator number={2} />
      <ParallaxEffect2 />

      <Separator number={3} />
      <ParallaxEffect3 />

      <Separator number={4} />
      <ParallaxEffect4 />

      <Separator number={5} />
      <ParallaxEffect5 />

      <Separator number={6} />
      <ParallaxEffect6 />

      <Separator number={7} />
      <ParallaxEffect7 />

      <Separator number={8} />
      <ParallaxEffect8 />

      <Separator number={9} />
      <ParallaxEffect9 />

      <Separator number={10} />
      <ParallaxEffect10 />

      <Separator number={11} />
      <ParallaxEffect11 />

      <Separator number={12} />
      <ParallaxEffect12 />

      <Separator number={13} />
      <ParallaxEffect13 />

      <Separator number={14} />
      <ParallaxEffect14 />

      <Separator number={15} />
      <ParallaxEffect15 />

      <Separator number={16} />
      <ParallaxEffect16 />

      <Separator number={17} />
      <ParallaxEffect17 />

      <Separator number={18} />
      <ParallaxEffect18 />

      <Separator number={19} />
      <ParallaxEffect19 />

      <Separator number={20} />
      <ParallaxEffect20 />

      <Separator number={21} />
      <ParallaxEffect21 />

      <Separator number={22} />
      <ParallaxEffect22 />

      <Separator number={23} />
      <ParallaxEffect23 />

      <Separator number={24} />
      <ParallaxEffect24 />

      <Separator number={25} />
      <ParallaxEffect25 />

      <Separator number={26} />
      <ParallaxEffect26 />

      <Separator number={27} />
      <ParallaxEffect27 />

      <Separator number={28} />
      <ParallaxEffect28 />

      <Separator number={29} />
      <ParallaxEffect29 />

      <Separator number={30} />
      <ParallaxEffect30 />

      <Separator number={31} />
      <ParallaxEffect31 />

      <Separator number={32} />
      <ParallaxEffect32 />

      <Separator number={33} />
      <ParallaxEffect33 />

      <Separator number={34} />
      <ParallaxEffect34 />

      <Separator number={35} />
      <ParallaxEffect35 />

      <Separator number={36} />
      <ParallaxEffect36 />

      <Separator number={37} />
      <ParallaxEffect37 />

      <Separator number={38} />
      <ParallaxEffect38 />

      <Separator number={39} />
      <ParallaxEffect39 />

      <Separator number={40} />
      <ParallaxEffect40 />

      <Separator number={41} />
      <ParallaxEffect41 />

      <Separator number={42} />
      <ParallaxEffect42 />

      <Separator number={43} />
      <ParallaxEffect43 />

      <Separator number={44} />
      <ParallaxEffect44 />

      <Separator number={45} />
      <ParallaxEffect45 />

      <Separator number={46} />
      <ParallaxEffect46 />

      <Separator number={47} />
      <ParallaxEffect47 />

      <Separator number={48} />
      <ParallaxEffect48 />

      <Separator number={49} />
      <ParallaxEffect49 />

      <Separator number={50} />
      <ParallaxEffect50 />

      <Separator number={51} />
      <ParallaxEffect51 />

      <Separator number={52} />
      <ParallaxEffect52 />

      <Separator number={53} />
      <ParallaxEffect53 />

      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-orange-950 to-black">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">End of Parallax Demos</h2>
          <p className="text-xl text-gray-400">53 Effects Complete - Scroll back up to explore more</p>
        </div>
      </div>
    </div>
  )
}
