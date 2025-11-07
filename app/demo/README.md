# Animation Demo Library

A comprehensive collection of interactive animation components built with Next.js, TypeScript, and Framer Motion (motion/react).

## 🎨 Demos Overview

### 1. Particle Explosion
**Route:** `/demo/particle-explosion`

Interactive particle explosion effects triggered by clicks. Features:
- 30 particles per explosion
- Random colors and velocities
- Physics-based animation
- Smooth fade-out effects

**Component:** `app/demo/components/demo-particle-explosion.tsx`

### 2. 3D Card Flip Gallery
**Route:** `/demo/card-flip`

Gallery of 3D flipping cards showcasing bacon and cryptocurrency images. Features:
- 3D transform animations
- Click to flip
- Front and back images
- Staggered entrance animations
- Uses images from `/public/`

**Component:** `app/demo/components/demo-card-flip.tsx`

### 3. Magnetic Hover
**Route:** `/demo/magnetic-hover`

Elements that follow your cursor with magnetic attraction. Features:
- Spring-based physics
- Smooth cursor tracking
- Scale on hover
- Glow effects
- Responsive to mouse position

**Component:** `app/demo/components/demo-magnetic-hover.tsx`

### 4. Parallax Scroll
**Route:** `/demo/parallax`

Multi-layer parallax scrolling effect. Features:
- Multiple depth layers
- Scroll-based transformations
- Opacity and scale changes
- Uses bacon-themed assets
- 300vh scrollable area

**Component:** `app/demo/components/demo-parallax.tsx`

### 5. Morphing Shapes
**Route:** `/demo/morphing-shapes`

SVG path morphing between different shapes. Features:
- 6 different shapes (Circle, Square, Triangle, Star, Heart, Bitcoin)
- Smooth path transitions
- Gradient fills with animation
- Color changes per shape
- Interactive controls

**Component:** `app/demo/components/demo-morphing-shapes.tsx`

### 6. Text Reveal
**Route:** `/demo/text-reveal`

Multiple text reveal animation styles. Features:
- Scramble reveal effect
- Character-by-character reveal
- Glitch effect
- Wave animation
- Multiple phrases rotation

**Component:** `app/demo/components/demo-text-reveal.tsx`

### 7. Hover Gallery
**Route:** `/demo/hover-gallery`

Interactive image gallery with smooth hover transitions. Features:
- Grid layout
- Hover overlays
- Modal view
- Smooth transitions
- Glow effects on hover
- Click to expand

**Component:** `app/demo/components/demo-hover-gallery.tsx`

### 8. Scroll Card Reveal
**Route:** `/demo/scroll-reveal`

Cards that reveal with scroll-triggered animations. Features:
- Scroll-based transformations
- Opacity, scale, and rotation effects
- Parallax card movement
- Animated border glow
- Individual element entrance animations

**Component:** `app/demo/components/demo-scroll-reveal.tsx`

## 🚀 Getting Started

1. Navigate to `/demo` to see the main demo index
2. Click any demo card to view the animation
3. Use the "Back to Demos" button to return to the index

## 📁 Project Structure

```
app/demo/
├── page.tsx                              # Main demo index page
├── components/
│   ├── demo-particle-explosion.tsx       # Particle explosion component
│   ├── demo-card-flip.tsx                # 3D card flip component
│   ├── demo-magnetic-hover.tsx           # Magnetic hover component
│   ├── demo-parallax.tsx                 # Parallax scroll component
│   ├── demo-morphing-shapes.tsx          # Morphing shapes component
│   ├── demo-text-reveal.tsx              # Text reveal component
│   ├── demo-hover-gallery.tsx            # Hover gallery component
│   └── demo-scroll-reveal.tsx            # Scroll reveal component
├── particle-explosion/
│   └── page.tsx                          # Particle explosion route
├── card-flip/
│   └── page.tsx                          # Card flip route
├── magnetic-hover/
│   └── page.tsx                          # Magnetic hover route
├── parallax/
│   └── page.tsx                          # Parallax route
├── morphing-shapes/
│   └── page.tsx                          # Morphing shapes route
├── text-reveal/
│   └── page.tsx                          # Text reveal route
├── hover-gallery/
│   └── page.tsx                          # Hover gallery route
├── scroll-reveal/
│   └── page.tsx                          # Scroll reveal route
└── README.md                             # This file
```

## 🎯 Features

- **Fully Responsive:** All demos work on mobile and desktop
- **TypeScript:** Type-safe components
- **Framer Motion:** Smooth, performant animations
- **Modular:** Each demo is a separate component
- **Reusable:** Easy to copy and integrate into your project
- **Well-Organized:** Clear separation from main project

## 🖼️ Asset Usage

The demos utilize images from `/public/`:
- `bacon-wrapped-bitcoin.jpg`
- `artcoin1.png` through `artcoin6.png`
- `Baco.jpg`
- `pigunderlight.png`, `pigunderlight1.png`
- `singlepig.png`
- `b&Wcutepig.jpg`
- `baconbg.png`
- `Bitcoin-Logo.png`

## 🛠️ Technologies

- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Framer Motion (motion/react)** - Animation library
- **Tailwind CSS** - Styling
- **React Hooks** - State and lifecycle management

## 📝 Usage in Your Project

To use any component in your main project:

1. Copy the component from `app/demo/components/`
2. Import it into your page
3. Customize colors, assets, and animations as needed

Example:
```tsx
import DemoParticleExplosion from "@/app/demo/components/demo-particle-explosion"

export default function MyPage() {
  return <DemoParticleExplosion />
}
```

## 🎨 Customization

Each component accepts props or can be easily modified:
- Colors are defined in the component
- Animation timings can be adjusted
- Assets can be swapped
- Layouts are responsive and customizable

## 🐛 Notes

- All demos are client-side (`"use client"`)
- Demos use `motion/react` for animations
- Components are isolated and won't affect main project
- Each demo has its own route for easy testing

## 📄 License

Part of the Bacon Wrapped Bitcoin project.
