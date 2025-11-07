"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Menu, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const MasterScrollPlayground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProgress = (index) => {
    const section = sectionsRef.current[index];
    if (!section) return 0;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const start = rect.top + scrollY - windowHeight;
    const end = rect.top + scrollY + rect.height;
    const rawProgress = (scrollY - start) / (end - start);

    // Animation starts at 50% scroll progress
    const progress = Math.max(0, Math.min(1, (rawProgress - 0.5) * 2));

    return progress;
  };

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const scrollToAnimation = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setSidebarOpen(false);
    }
  };

  const categories = {
    'Horizontal Slides': [
      { id: 'slide-left', name: 'Slide from Left' },
      { id: 'slide-right', name: 'Slide from Right' },
      { id: 'left-to-right', name: 'Continuous Left to Right' },
      { id: 'split-slide', name: 'Split and Slide' }
    ],
    'Card Reveals': [
      { id: 'card-bezier', name: 'Curved Bezier Reveal' },
      { id: 'card-3d', name: '3D Perspective Flip' },
      { id: 'card-spiral', name: 'Spiral Outward' },
      { id: 'card-elastic', name: 'Elastic Spring' },
      { id: 'card-accordion', name: 'Accordion Fold' },
      { id: 'card-kaleidoscope', name: 'Kaleidoscope Burst' },
      { id: 'card-domino', name: 'Domino Fall' },
      { id: 'card-vortex', name: 'Vortex Warp' },
      { id: 'card-origami', name: 'Origami Unfold' },
      { id: 'card-wave-collapse', name: 'Wave Collapse' },
      { id: 'card-dna-helix', name: 'DNA Helix Spin' },
      { id: 'card-phoenix', name: 'Phoenix Rise' },
      { id: 'card-hourglass', name: 'Hourglass Flip' },
      { id: 'card-quantum', name: 'Quantum Shift' },
      { id: 'card-prism', name: 'Prism Refraction' },
      { id: 'card-nebula', name: 'Nebula Expansion' },
      { id: 'card-orbit', name: 'Planetary Orbit' },
      { id: 'card-matrix-rain', name: 'Matrix Rain' },
      { id: 'card-blackhole', name: 'Black Hole Gravity' }
    ],
    'Hover Effects': [
      { id: 'hover-3d-tilt', name: '3D Perspective Tilt' },
      { id: 'hover-magnetic', name: 'Magnetic Attraction' },
      { id: 'hover-liquid', name: 'Liquid Morph' },
      { id: 'hover-glitch', name: 'Glitch Effect' },
      { id: 'hover-split-reveal', name: 'Split Reveal' },
      { id: 'hover-particle-burst', name: 'Particle Burst' },
      { id: 'hover-neon-glow', name: 'Neon Glow Pulse' },
      { id: 'hover-fold', name: '3D Fold Transform' },
      { id: 'hover-stack', name: 'Stack Elevation' },
      { id: 'hover-gradient-shift', name: 'Dynamic Gradient Shift' },
      { id: 'hover-ripple', name: 'Ripple Wave' },
      { id: 'hover-border-trace', name: 'Border Trace Animation' },
      { id: 'hover-shatter', name: 'Shatter & Reconstruct' },
      { id: 'hover-float-shadow', name: 'Float with Shadow' },
      { id: 'hover-holographic', name: 'Holographic Shimmer' }
    ],
    '3D Effects': [
      { id: '3d-rotation', name: '3D Rotation + Slide' },
      { id: 'carousel', name: 'Carousel Rotation' }
    ],
    'Disperse & Scatter': [
      { id: 'disperse-center', name: 'Disperse from Center' },
      { id: 'magnetic-pull', name: 'Magnetic Pull' },
      { id: 'spiral-entry', name: 'Spiral Entry' }
    ],
    'Staggered & Cascading': [
      { id: 'cascading', name: 'Cascading Waterfall' },
      { id: 'staggered', name: 'Staggered Grid' },
      { id: 'parallax', name: 'Parallax Layers' }
    ],
    'Wave & Pattern': [
      { id: 'wave-pattern', name: 'Wave Pattern' },
      { id: 'zoom-tunnel', name: 'Zoom Tunnel' }
    ],
    'Advanced Physics': [
      { id: 'elastic-bounce', name: 'Elastic Bounce' },
      { id: 'bounce-rotate', name: 'Bounce with Rotation' },
      { id: 'scale-move', name: 'Scale + Move' },
      { id: 'scale-rotate-move', name: 'Scale + Rotate + Move' },
      { id: 'scale-blur-move', name: 'Scale + Blur + Move' },
      { id: 'scale-color-shift', name: 'Scale + Color Shift' },
      { id: 'scale-grid-reveal', name: 'Scale Grid Reveal (3 Rows)' },
      { id: 'scale-bounce-move', name: 'Scale + Bounce + Move' }
    ]
  };

  const cardImages = [
    { src: '/artcoin1.png', label: '1' },
    { src: '/artcoin2.png', label: '2' },
    { src: '/artcoin3.png', label: '3' },
    { src: '/artcoin4.png', label: '4' },
    { src: '/artcoin5.png', label: '5' },
    { src: '/artcoin6.png', label: '6' },
  ];

  const animations = [
    // HORIZONTAL SLIDES
    {
      id: 'slide-left',
      category: 'Horizontal Slides',
      title: "Slide from Left",
      description: "Card slides in from the left side",
      code: `// Slide from left animation
const [scrollY, setScrollY] = useState(0);
const sectionRef = useRef(null);

const getProgress = () => {
  if (!sectionRef.current) return 0;
  const rect = sectionRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const start = rect.top + scrollY - windowHeight;
  const end = rect.top + scrollY + rect.height;
  const rawProgress = (scrollY - start) / (end - start);
  // Complete animation by 60% scroll
  return Math.max(0, Math.min(1, rawProgress / 0.6));
};

<section ref={sectionRef}>
  <div
    style={{
      transform: \`translateX(\${(1 - getProgress()) * -100}%)\`,
      opacity: getProgress(),
    }}
  >
    Content here
  </div>
</section>`,
      render: (progress) => {
        const adjustedProgress = Math.min(1, progress / 0.6); // Complete by 60%
        return (
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-2xl max-w-md"
            style={{
              transform: `translateX(${(1 - adjustedProgress) * -100}%)`,
              opacity: adjustedProgress,
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Slide from Left</h2>
            <p className="text-white">Slides in smoothly from the left edge.</p>
          </div>
        );
      }
    },
    {
      id: 'slide-right',
      category: 'Horizontal Slides',
      title: "Slide from Right",
      description: "Card slides in from the right side",
      code: `// Slide from right animation
<div
  style={{
    transform: \`translateX(\${(1 - getProgress()) * 100}%)\`,
    opacity: getProgress(),
  }}
>
  Content here
</div>`,
      render: (progress) => {
        const adjustedProgress = Math.min(1, progress / 0.6);
        return (
          <div
            className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 rounded-2xl shadow-2xl max-w-md"
            style={{
              transform: `translateX(${(1 - adjustedProgress) * 100}%)`,
              opacity: adjustedProgress,
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Slide from Right</h2>
            <p className="text-white">Slides in smoothly from the right edge.</p>
          </div>
        );
      }
    },
    {
      id: 'left-to-right',
      category: 'Horizontal Slides',
      title: "Continuous Left to Right",
      description: "Card travels across the screen",
      code: `// Continuous movement across screen
<div
  style={{
    transform: \`translateX(\${(getProgress() * 200) - 100}%)\`,
  }}
>
  Content here
</div>`,
      render: (progress) => (
        <div className="w-full max-w-4xl px-8">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 rounded-2xl shadow-2xl"
            style={{
              transform: `translateX(${(progress * 200) - 100}%)`,
            }}
          >
            <p className="text-white text-xl">Travels from left to right!</p>
          </div>
        </div>
      )
    },
    {
      id: 'split-slide',
      category: 'Horizontal Slides',
      title: "Split and Slide",
      description: "Content splits from both sides",
      code: `// Split animation
<div className="flex gap-8">
  <div style={{ transform: \`translateX(\${(1 - getProgress()) * -100}%)\` }}>
    Left
  </div>
  <div style={{ transform: \`translateX(\${(1 - getProgress()) * 100}%)\` }}>
    Right
  </div>
</div>`,
      render: (progress) => (
        <div className="flex gap-8">
          <div
            className="bg-gradient-to-r from-red-500 to-pink-500 p-8 rounded-2xl shadow-2xl"
            style={{
              transform: `translateX(${(1 - progress) * -100}%)`,
              opacity: progress,
            }}
          >
            <h3 className="text-2xl font-bold text-white">Left</h3>
          </div>
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-2xl"
            style={{
              transform: `translateX(${(1 - progress) * 100}%)`,
              opacity: progress,
            }}
          >
            <h3 className="text-2xl font-bold text-white">Right</h3>
          </div>
        </div>
      )
    },

    // CARD REVEALS
    {
      id: 'card-bezier',
      category: 'Card Reveals',
      title: "Curved Bezier Reveal",
      description: "6 cards curve outward to reveal content",
      code: `// 6-card bezier reveal (2 columns × 3 rows) - completes by 60%
const cardPositions = [
  { row: 0, col: 0, dir: { x: -1, y: -1 } },
  { row: 1, col: 0, dir: { x: -1, y: 0 } },
  { row: 2, col: 0, dir: { x: -1, y: 1 } },
  { row: 0, col: 1, dir: { x: 1, y: -1 } },
  { row: 1, col: 1, dir: { x: 1, y: 0 } },
  { row: 2, col: 1, dir: { x: 1, y: 1 } },
];

{cardPositions.map((pos, i) => {
  const t = Math.max(0, Math.min(1, (progress - 0.15) / 0.45)); // Complete by 60%
  const curve = t * t * (3 - 2 * t);
  const offsetX = pos.dir.x * curve * 400;
  const offsetY = pos.dir.y * curve * 250;
  
  return (
    <div
      key={i}
      style={{
        left: \`\${pos.col === 0 ? '25%' : '75%'}\`,
        top: \`\${pos.row === 0 ? '15%' : pos.row === 1 ? '50%' : '85%'}\`,
        transform: \`translate(calc(-50% + \${offsetX}px), calc(-50% + \${offsetY}px))\`,
        opacity: 1 - curve * 0.7,
      }}
    >
      Card {i + 1}
    </div>
  );
})}`,
      render: (progress) => {
        const cardPositions = [
          { row: 0, col: 0, dir: { x: -1, y: -1 } },
          { row: 1, col: 0, dir: { x: -1, y: 0 } },
          { row: 2, col: 0, dir: { x: -1, y: 1 } },
          { row: 0, col: 1, dir: { x: 1, y: -1 } },
          { row: 1, col: 1, dir: { x: 1, y: 0 } },
          { row: 2, col: 1, dir: { x: 1, y: 1 } },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((pos, i) => {
              const t = Math.max(0, Math.min(1, (progress - 0.15) / 0.45)); // Start at 15%, complete by 60%
              const curve = t * t * (3 - 2 * t);
              const offsetX = pos.dir.x * curve * 400;
              const offsetY = pos.dir.y * curve * 250;
              const curveX = pos.dir.x * Math.sin(curve * Math.PI) * 100;
              
              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '25%' : '75%'}`,
                    top: `${pos.row === 0 ? '15%' : pos.row === 1 ? '50%' : '85%'}`,
                    transform: `
                      translate(calc(-50% + ${offsetX + curveX}px), calc(-50% + ${offsetY}px))
                      rotate(${curve * pos.dir.x * 15}deg)
                      scale(${1 - curve * 0.2})
                    `,
                    opacity: 1 - curve * 0.7,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
            
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center px-8"
              style={{
                opacity: Math.max(0, (progress - 0.4) / 0.3),
                transform: `scale(${0.8 + Math.min(1, (progress - 0.4) / 0.3) * 0.2})`,
              }}
            >
              <h2 className="text-4xl font-bold text-white mb-4 text-center">
                Your Content Revealed
              </h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-3d',
      category: 'Card Reveals',
      title: "3D Perspective Flip",
      description: "Cards flip in 3D while moving away",
      code: `// 3D flip reveal
<div style={{ perspective: '1500px' }}>
  {cards.map((card, i) => (
    <div
      key={i}
      style={{
        transform: \`
          translate3d(\${offsetX}px, \${offsetY}px, \${-t * 200}px)
          rotateY(\${rotateY}deg)
          rotateX(\${rotateX}deg)
        \`,
      }}
    />
  ))}
</div>`,
      render: (progress) => {
        const cardPositions = [
          { row: 0, col: 0, dir: { x: -1, y: -1 } },
          { row: 1, col: 0, dir: { x: -1, y: 0 } },
          { row: 2, col: 0, dir: { x: -1, y: 1 } },
          { row: 0, col: 1, dir: { x: 1, y: -1 } },
          { row: 1, col: 1, dir: { x: 1, y: 0 } },
          { row: 2, col: 1, dir: { x: 1, y: 1 } },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1500px' }}>
            {cardPositions.map((pos, i) => {
              const t = Math.max(0, (progress - 0.3) / 0.7);
              const offsetX = pos.dir.x * t * 450;
              const offsetY = pos.dir.y * t * 300;
              const rotateY = pos.dir.x * t * 90;
              const rotateX = -pos.dir.y * t * 45;
              
              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '25%' : '75%'}`,
                    top: `${pos.row === 0 ? '15%' : pos.row === 1 ? '50%' : '85%'}`,
                    transform: `
                      translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${-t * 200}px)
                      rotateY(${rotateY}deg)
                      rotateX(${rotateX}deg)
                    `,
                    opacity: 1 - t * 0.8,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
            
            <div 
              className="absolute inset-0 flex items-center justify-center px-8"
              style={{
                opacity: Math.max(0, (progress - 0.5) / 0.3),
              }}
            >
              <h2 className="text-4xl font-bold text-white">3D Flip Reveal</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-spiral',
      category: 'Card Reveals',
      title: "Spiral Outward",
      description: "Cards spiral out in circular motion",
      code: `// Spiral animation
const angle = Math.atan2(pos.dir.y, pos.dir.x);
const spiralAngle = angle + t * Math.PI * 2;
const radius = t * 400;
const offsetX = Math.cos(spiralAngle) * radius;
const offsetY = Math.sin(spiralAngle) * radius;`,
      render: (progress) => {
        const cardPositions = [
          { row: 0, col: 0, dir: { x: -1, y: -1 } },
          { row: 1, col: 0, dir: { x: -1, y: 0 } },
          { row: 2, col: 0, dir: { x: -1, y: 1 } },
          { row: 0, col: 1, dir: { x: 1, y: -1 } },
          { row: 1, col: 1, dir: { x: 1, y: 0 } },
          { row: 2, col: 1, dir: { x: 1, y: 1 } },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((pos, i) => {
              const t = Math.max(0, (progress - 0.3) / 0.7);
              const angle = Math.atan2(pos.dir.y, pos.dir.x);
              const spiralAngle = angle + t * Math.PI * 2;
              const radius = t * 400;
              const offsetX = Math.cos(spiralAngle) * radius;
              const offsetY = Math.sin(spiralAngle) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '25%' : '75%'}`,
                    top: `${pos.row === 0 ? '15%' : pos.row === 1 ? '50%' : '85%'}`,
                    transform: `
                      translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
                      rotate(${t * 360}deg)
                      scale(${1 - t * 0.3})
                    `,
                    opacity: 1 - t * 0.7,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
            
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.4) / 0.4) }}
            >
              <h2 className="text-4xl font-bold text-white">Spiral Motion</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-elastic',
      category: 'Card Reveals',
      title: "Elastic Spring",
      description: "Cards bounce with elastic physics",
      code: `// Elastic easing
const elasticOut = (t) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};`,
      render: (progress) => {
        const elasticOut = (t) => {
          const c4 = (2 * Math.PI) / 3;
          return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        };

        const cardPositions = [
          { row: 0, col: 0, dir: { x: -1, y: -1 } },
          { row: 1, col: 0, dir: { x: -1, y: 0 } },
          { row: 2, col: 0, dir: { x: -1, y: 1 } },
          { row: 0, col: 1, dir: { x: 1, y: -1 } },
          { row: 1, col: 1, dir: { x: 1, y: 0 } },
          { row: 2, col: 1, dir: { x: 1, y: 1 } },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((pos, i) => {
              const delay = i * 0.05;
              const t = Math.max(0, Math.min(1, (progress - 0.3 - delay) / 0.5));
              const elastic = elasticOut(t);
              const offsetX = pos.dir.x * elastic * 450;
              const offsetY = pos.dir.y * elastic * 300;
              
              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '25%' : '75%'}`,
                    top: `${pos.row === 0 ? '15%' : pos.row === 1 ? '50%' : '85%'}`,
                    transform: `
                      translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
                      rotate(${elastic * pos.dir.x * 20}deg)
                    `,
                    opacity: 1 - t * 0.7,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
            
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.5) / 0.3) }}
            >
              <h2 className="text-4xl font-bold text-white">Elastic Bounce</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-accordion',
      category: 'Card Reveals',
      title: "Accordion Fold",
      description: "Cards fold away like an accordion",
      code: `// Accordion fold with scaleX
<div
  style={{
    transform: \`
      scaleX(\${1 - t * 0.8})
      rotateY(\${dir.x * t * 90}deg)
    \`,
    transformOrigin: dir.x > 0 ? 'left center' : 'right center',
  }}
/>`,
      render: (progress) => {
        const cardPositions = [
          { row: 0, col: 0, dir: { x: -1, y: -1 } },
          { row: 1, col: 0, dir: { x: -1, y: 0 } },
          { row: 2, col: 0, dir: { x: -1, y: 1 } },
          { row: 0, col: 1, dir: { x: 1, y: -1 } },
          { row: 1, col: 1, dir: { x: 1, y: 0 } },
          { row: 2, col: 1, dir: { x: 1, y: 1 } },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1200px' }}>
            {cardPositions.map((pos, i) => {
              const t = Math.max(0, (progress - 0.3) / 0.7);
              const offsetX = pos.dir.x * t * 500;
              const offsetY = pos.dir.y * t * 300;
              const scaleX = 1 - t * 0.8;
              
              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '25%' : '75%'}`,
                    top: `${pos.row === 0 ? '15%' : pos.row === 1 ? '50%' : '85%'}`,
                    transform: `
                      translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))
                      scaleX(${scaleX})
                      rotateY(${pos.dir.x * t * 90}deg)
                    `,
                    opacity: 1 - t * 0.6,
                    transformOrigin: pos.dir.x > 0 ? 'left center' : 'right center',
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}
            
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.6) / 0.3) }}
            >
              <h2 className="text-4xl font-bold text-white">Accordion Fold</h2>
            </div>
          </div>
        );
      }
    },

    // HOVER EFFECTS
    {
      id: 'hover-3d-tilt',
      category: 'Hover Effects',
      title: "3D Perspective Tilt",
      description: "Card tilts in 3D based on mouse position",
      code: `// 3D tilt following mouse position
const [rotation, setRotation] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;
  setRotation({ x: rotateX, y: rotateY });
};

<div
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setRotation({ x: 0, y: 0 })}
  style={{
    transform: \`perspective(1000px) rotateX(\${rotation.x}deg) rotateY(\${rotation.y}deg)\`,
    transition: 'transform 0.1s ease-out',
  }}
>
  Content
</div>`,
      render: () => {
        const [rotation, setRotation] = useState({ x: 0, y: 0 });

        const handleMouseMove = (e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          setRotation({ x: rotateX, y: rotateY });
        };

        return (
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotation({ x: 0, y: 0 })}
            className="bg-gradient-to-br from-purple-600 to-blue-600 p-12 rounded-2xl shadow-2xl max-w-md cursor-pointer"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">3D Tilt</h2>
            <p className="text-white">Move your mouse around!</p>
          </div>
        );
      }
    },
    {
      id: 'hover-magnetic',
      category: 'Hover Effects',
      title: "Magnetic Attraction",
      description: "Element follows cursor with magnetic effect",
      code: `// Magnetic pull effect
const [position, setPosition] = useState({ x: 0, y: 0 });
const [isHovered, setIsHovered] = useState(false);

const handleMouseMove = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  setPosition({ x: x * 0.3, y: y * 0.3 });
};

<div
  onMouseMove={handleMouseMove}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => { setPosition({ x: 0, y: 0 }); setIsHovered(false); }}
  style={{
    transform: \`translate(\${position.x}px, \${position.y}px) scale(\${isHovered ? 1.1 : 1})\`,
    transition: 'transform 0.2s ease-out',
  }}
>
  Content
</div>`,
      render: () => {
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = useState(false);

        const handleMouseMove = (e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          setPosition({ x: x * 0.3, y: y * 0.3 });
        };

        return (
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setPosition({ x: 0, y: 0 }); setIsHovered(false); }}
            className="bg-gradient-to-br from-pink-600 to-rose-600 p-12 rounded-2xl shadow-2xl max-w-md cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.1 : 1})`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Magnetic</h2>
            <p className="text-white">I follow your cursor!</p>
          </div>
        );
      }
    },
    {
      id: 'hover-liquid',
      category: 'Hover Effects',
      title: "Liquid Morph",
      description: "Blob-like morphing animation on hover",
      code: `// Liquid morph with border-radius animation
const [isHovered, setIsHovered] = useState(false);

<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    borderRadius: isHovered ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '20px',
    transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  }}
>
  Content
</div>`,
      render: () => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 p-12 max-w-md cursor-pointer shadow-2xl"
            style={{
              borderRadius: isHovered ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '20px',
              transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
              transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Liquid Morph</h2>
            <p className="text-white">Watch me transform!</p>
          </div>
        );
      }
    },
    {
      id: 'hover-glitch',
      category: 'Hover Effects',
      title: "Glitch Effect",
      description: "Digital glitch with RGB split",
      code: `// Glitch effect with pseudo-element shadows
const [isGlitching, setIsGlitching] = useState(false);

<div
  onMouseEnter={() => setIsGlitching(true)}
  onMouseLeave={() => setIsGlitching(false)}
  className="relative"
  style={{
    animation: isGlitching ? 'glitch 0.3s infinite' : 'none',
  }}
>
  <style>{\`
    @keyframes glitch {
      0%, 100% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
    }
  \`}</style>
  Content
</div>`,
      render: () => {
        const [isGlitching, setIsGlitching] = useState(false);

        return (
          <div className="relative">
            <div
              onMouseEnter={() => setIsGlitching(true)}
              onMouseLeave={() => setIsGlitching(false)}
              className="bg-gradient-to-br from-green-600 to-emerald-600 p-12 rounded-2xl shadow-2xl max-w-md cursor-pointer relative"
              style={{
                animation: isGlitching ? 'glitch 0.15s infinite' : 'none',
                textShadow: isGlitching ? '2px 0 red, -2px 0 cyan' : 'none',
              }}
            >
              <style>{`
                @keyframes glitch {
                  0%, 100% { transform: translate(0); }
                  20% { transform: translate(-3px, 3px); }
                  40% { transform: translate(-3px, -3px); }
                  60% { transform: translate(3px, 3px); }
                  80% { transform: translate(3px, -3px); }
                }
              `}</style>
              <h2 className="text-3xl font-bold text-white mb-4">Glitch</h2>
              <p className="text-white">Digital interference!</p>
            </div>
          </div>
        );
      }
    },
    {
      id: 'hover-neon-glow',
      category: 'Hover Effects',
      title: "Neon Glow Pulse",
      description: "Pulsing neon glow effect",
      code: `// Animated neon glow
const [isHovered, setIsHovered] = useState(false);

<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    boxShadow: isHovered 
      ? '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)'
      : '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: isHovered ? 'neonPulse 1.5s infinite' : 'none',
    transition: 'box-shadow 0.3s ease',
  }}
>
  Content
</div>`,
      render: () => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-gray-900 border-2 border-purple-500 p-12 rounded-2xl max-w-md cursor-pointer"
            style={{
              boxShadow: isHovered 
                ? '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.2)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
              animation: isHovered ? 'neonPulse 1.5s infinite' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <style>{`
              @keyframes neonPulse {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(1.3); }
              }
            `}</style>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Neon Glow</h2>
            <p className="text-purple-300">Cyberpunk vibes!</p>
          </div>
        );
      }
    },
    {
      id: 'hover-ripple',
      category: 'Hover Effects',
      title: "Ripple Wave",
      description: "Expanding ripple from click point",
      code: `// Ripple effect from click position
const [ripples, setRipples] = useState([]);

const createRipple = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const newRipple = { id: Date.now(), x, y };
  setRipples([...ripples, newRipple]);
  setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== newRipple.id)), 1000);
};

<div onClick={createRipple} style={{ position: 'relative', overflow: 'hidden' }}>
  {ripples.map((ripple) => (
    <span
      key={ripple.id}
      style={{
        position: 'absolute',
        left: ripple.x,
        top: ripple.y,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        animation: 'ripple 1s ease-out',
      }}
    />
  ))}
</div>`,
      render: () => {
        const [ripples, setRipples] = useState([]);

        const createRipple = (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const newRipple = { id: Date.now(), x, y };
          setRipples([...ripples, newRipple]);
          setTimeout(() => setRipples((r) => r.filter((rip) => rip.id !== newRipple.id)), 1000);
        };

        return (
          <div
            onClick={createRipple}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 p-12 rounded-2xl shadow-2xl max-w-md cursor-pointer"
          >
            <style>{`
              @keyframes ripple {
                0% {
                  transform: translate(-50%, -50%) scale(0);
                  opacity: 1;
                }
                100% {
                  transform: translate(-50%, -50%) scale(20);
                  opacity: 0;
                }
              }
            `}</style>
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute bg-white rounded-full pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: '20px',
                  height: '20px',
                  animation: 'ripple 1s ease-out',
                }}
              />
            ))}
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ripple Wave</h2>
            <p className="text-white relative z-10">Click anywhere!</p>
          </div>
        );
      }
    },
    {
      id: '3d-rotation',
      category: '3D Effects',
      title: "3D Rotation + Slide",
      description: "Rotates in 3D while sliding",
      code: `// 3D rotation combined with horizontal movement
<div
  style={{
    transform: \`
      translateX(\${(progress - 0.5) * 300}px) 
      perspective(1000px) 
      rotateY(\${progress * 360}deg)
    \`,
  }}
/>`,
      render: (progress) => {
        const adjustedProgress = Math.min(1, progress / 0.65);
        return (
          <div
            className="bg-gradient-to-r from-violet-600 to-purple-600 p-8 rounded-2xl shadow-2xl max-w-md"
            style={{
              transform: `translateX(${(adjustedProgress - 0.5) * 300}px) perspective(1000px) rotateY(${adjustedProgress * 360}deg)`,
              opacity: adjustedProgress,
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">3D Rotation</h2>
            <p className="text-white">Spins while moving!</p>
          </div>
        );
      }
    },
    {
      id: 'carousel',
      category: '3D Effects',
      title: "Carousel Rotation",
      description: "3D circular carousel effect",
      code: `// 3D carousel
const cards = Array.from({ length: 5 });
cards.map((_, i) => {
  const angle = (i / cards.length) * Math.PI * 2 + progress * Math.PI * 2;
  const x = Math.cos(angle) * 250;
  const z = Math.sin(angle) * 250;
  
  return (
    <div
      style={{
        transform: \`translate3d(\${x}px, -50%, \${z}px) rotateY(\${-angle}rad)\`,
      }}
    />
  );
})`,
      render: (progress) => {
        const cards = Array.from({ length: 5 }, (_, i) => i);
        
        return (
          <div className="w-full max-w-4xl px-8">
            <div className="relative w-full h-96" style={{ perspective: '1000px' }}>
              {cards.map((i) => {
                const angle = (i / cards.length) * Math.PI * 2 + progress * Math.PI * 2;
                const radius = 250;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-xl shadow-2xl overflow-hidden"
                    style={{
                      transform: `
                        translate3d(calc(-50% + ${x}px), -50%, ${z}px)
                        rotateY(${-angle}rad)
                      `,
                      opacity: 0.5 + (Math.cos(angle) + 1) * 0.25,
                      width: '128px',
                      height: '128px',
                    }}
                  >
                    <Image
                      src={cardImages[i % cardImages.length].src}
                      alt={`Artcoin ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    },
    {
      id: 'disperse-center',
      category: 'Disperse & Scatter',
      title: "Disperse from Center",
      description: "Items fly out in all directions",
      code: `// Disperse in all directions
const items = [
  { angle: 0, distance: 150 },
  { angle: 45, distance: 150 },
  // ... more angles
];

items.map((item) => {
  const radians = (item.angle * Math.PI) / 180;
  const x = Math.cos(radians) * item.distance * progress;
  const y = Math.sin(radians) * item.distance * progress;
  
  return (
    <div style={{ transform: \`translate(\${x}px, \${y}px)\` }} />
  );
})`,
      render: (progress) => {
        const items = [
          { angle: 0, distance: 150, color: 'from-red-500 to-orange-500' },
          { angle: 45, distance: 150, color: 'from-yellow-500 to-amber-500' },
          { angle: 90, distance: 150, color: 'from-green-500 to-emerald-500' },
          { angle: 135, distance: 150, color: 'from-cyan-500 to-blue-500' },
          { angle: 180, distance: 150, color: 'from-blue-500 to-indigo-500' },
          { angle: 225, distance: 150, color: 'from-purple-500 to-pink-500' },
          { angle: 270, distance: 150, color: 'from-pink-500 to-rose-500' },
          { angle: 315, distance: 150, color: 'from-orange-500 to-red-500' },
        ];
        
        return (
          <div className="w-full max-w-4xl px-8">
            <div className="relative w-full h-96">
              {items.map((item, i) => {
                const radians = (item.angle * Math.PI) / 180;
                const x = Math.cos(radians) * item.distance * progress;
                const y = Math.sin(radians) * item.distance * progress;
                
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-xl shadow-2xl overflow-hidden"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${1 - progress * 0.3})`,
                      opacity: 1 - progress * 0.5,
                      width: '120px',
                      height: '120px',
                    }}
                  >
                    <Image
                      src={cardImages[i % cardImages.length].src}
                      alt={`Artcoin ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    },
    {
      id: 'elastic-bounce',
      category: 'Advanced Physics',
      title: "Elastic Bounce",
      description: "Bounces with elastic easing",
      code: `// Elastic easing function
const elasticProgress = (p) => {
  if (p === 0 || p === 1) return p;
  const c4 = (2 * Math.PI) / 3;
  return p < 0.5
    ? -(Math.pow(2, 20 * p - 10) * Math.sin((20 * p - 11.125) * c4)) / 2
    : (Math.pow(2, -20 * p + 10) * Math.sin((20 * p - 11.125) * c4)) / 2 + 1;
};`,
      render: (progress) => {
        const adjustedProgress = Math.min(1, progress / 0.6);
        const elasticProgress = (p) => {
          if (p === 0 || p === 1) return p;
          const c4 = (2 * Math.PI) / 3;
          return p < 0.5
            ? -(Math.pow(2, 20 * p - 10) * Math.sin((20 * p - 11.125) * c4)) / 2
            : (Math.pow(2, -20 * p + 10) * Math.sin((20 * p - 11.125) * c4)) / 2 + 1;
        };
        
        return (
          <div
            className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-8 rounded-2xl shadow-2xl max-w-md"
            style={{
              transform: `translateX(${(1 - elasticProgress(adjustedProgress)) * -120}%)`,
              opacity: adjustedProgress,
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Elastic Bounce</h2>
            <p className="text-white">Bounces in with spring physics!</p>
          </div>
        );
      }
    },
    {
      id: 'scale-move',
      category: 'Advanced Physics',
      title: "Scale + Move",
      description: "Grows while moving horizontally",
      code: `// Combined scale and movement (completes by 65% scroll)
<div
  style={{
    transform: \`
      translateX(\${(progress - 0.5) * 200}px)
      scale(\${0.5 + progress * 0.5})
    \`,
    opacity: progress,
  }}
/>`,
      render: (progress) => {
        const adjustedProgress = Math.min(1, progress / 0.65); // Complete by 65%
        return (
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-12 rounded-3xl shadow-2xl max-w-lg"
            style={{
              transform: `translateX(${(adjustedProgress - 0.5) * 200}px) scale(${0.5 + adjustedProgress * 0.5})`,
              opacity: adjustedProgress,
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Scale + Move</h2>
            <p className="text-white text-lg">
              Grows and moves simultaneously.
            </p>
          </div>
        );
      }
    },
    {
      id: 'card-kaleidoscope',
      category: 'Card Reveals',
      title: "Kaleidoscope Burst",
      description: "Cards rotate and flip outward creating kaleidoscope pattern",
      code: `// Kaleidoscope rotation with flip
{cards.map((card, i) => {
  const angle = (i / 6) * Math.PI * 2;
  const radius = progress * 350;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const rotation = progress * 720 + (i * 60);
  const flipY = progress * 180;

  return (
    <div
      key={i}
      style={{
        transform: \`
          translate(calc(-50% + \${x}px), calc(-50% + \${y}px))
          rotate(\${rotation}deg)
          rotateY(\${flipY}deg)
        \`,
        opacity: 1 - progress * 0.8,
      }}
    />
  );
})}`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1500px' }}>
            {cardPositions.map((i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = progress * 350;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const rotation = progress * 720 + (i * 60);
              const flipY = progress * 180;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                      rotate(${rotation}deg)
                      rotateY(${flipY}deg)
                    `,
                    opacity: 1 - progress * 0.8,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.5) / 0.5) }}
            >
              <h2 className="text-4xl font-bold text-white">Kaleidoscope</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-domino',
      category: 'Card Reveals',
      title: "Domino Fall",
      description: "Cards fall like dominoes in sequence",
      code: `// Sequential domino fall effect
{cards.map((card, i) => {
  const delay = i * 0.1;
  const cardProgress = Math.max(0, Math.min(1, (progress - delay) / 0.3));
  const rotateX = cardProgress * 90;
  const offsetY = cardProgress * 400;

  return (
    <div
      style={{
        transform: \`
          translate(calc(-50% + 0px), calc(-50% + \${offsetY}px))
          rotateX(\${rotateX}deg)
        \`,
        transformOrigin: 'top center',
      }}
    />
  );
})}`,
      render: (progress) => {
        const cardPositions = [
          { col: 0 }, { col: 1 }, { col: 2 },
          { col: 0 }, { col: 1 }, { col: 2 }
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1200px' }}>
            {cardPositions.map((pos, i) => {
              const delay = i * 0.1;
              const cardProgress = Math.max(0, Math.min(1, (progress - delay) / 0.4));
              const rotateX = cardProgress * 90;
              const offsetY = cardProgress * 400;
              const row = Math.floor(i / 3);

              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${25 + pos.col * 25}%`,
                    top: `${30 + row * 40}%`,
                    transform: `
                      translate(-50%, calc(-50% + ${offsetY}px))
                      rotateX(${rotateX}deg)
                    `,
                    transformOrigin: 'top center',
                    opacity: 1 - cardProgress * 0.7,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.7) / 0.3) }}
            >
              <h2 className="text-4xl font-bold text-white">Domino Effect</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-vortex',
      category: 'Card Reveals',
      title: "Vortex Warp",
      description: "Cards spiral into a vortex warp",
      code: `// Vortex warp with scale and rotation
const spiralRadius = (1 - progress) * 300;
const spiralRotation = progress * Math.PI * 4;
const vortexScale = 1 - progress * 0.8;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const baseAngle = (i / 6) * Math.PI * 2;
              const spiralAngle = baseAngle + progress * Math.PI * 4;
              const spiralRadius = (1 - progress) * 300;
              const x = Math.cos(spiralAngle) * spiralRadius;
              const y = Math.sin(spiralAngle) * spiralRadius;
              const vortexScale = 1 - progress * 0.8;
              const rotation = progress * 1080;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                      rotate(${rotation}deg)
                      scale(${vortexScale})
                    `,
                    opacity: 1 - progress,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.3) / 0.5) }}
            >
              <h2 className="text-4xl font-bold text-white">Vortex Warp</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-origami',
      category: 'Card Reveals',
      title: "Origami Unfold",
      description: "Cards unfold like origami paper",
      code: `// Origami multi-fold effect
const foldAngle = (1 - progress) * 180;
const scaleY = 0.2 + progress * 0.8;`,
      render: (progress) => {
        const cardPositions = [
          { row: 0, col: 0 }, { row: 0, col: 1 },
          { row: 1, col: 0 }, { row: 1, col: 1 },
          { row: 2, col: 0 }, { row: 2, col: 1 },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1500px' }}>
            {cardPositions.map((pos, i) => {
              const delay = i * 0.08;
              const cardProgress = Math.max(0, Math.min(1, (progress - delay) / 0.5));
              const foldAngle = (1 - cardProgress) * 180;
              const scaleY = 0.2 + cardProgress * 0.8;

              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '30%' : '70%'}`,
                    top: `${20 + pos.row * 30}%`,
                    transform: `
                      translate(-50%, -50%)
                      rotateX(${foldAngle}deg)
                      scaleY(${scaleY})
                    `,
                    transformOrigin: 'center center',
                    opacity: cardProgress,
                    width: '140px',
                    height: '140px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.6) / 0.3) }}
            >
              <h2 className="text-4xl font-bold text-white">Origami Unfold</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-wave-collapse',
      category: 'Card Reveals',
      title: "Wave Collapse",
      description: "Cards collapse in wave pattern",
      code: `// Sinusoidal wave collapse
const waveOffset = Math.sin((i / 6) * Math.PI * 2 + progress * Math.PI * 2) * 100;
const collapseScale = 1 - progress * 0.9;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const waveOffset = Math.sin((i / 6) * Math.PI * 2 + progress * Math.PI * 2) * 100;
              const collapseScale = 1 - progress * 0.9;
              const rotation = progress * 180;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${waveOffset}px), -50%)
                      scale(${collapseScale})
                      rotate(${rotation}deg)
                    `,
                    opacity: 1 - progress * 0.8,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.5) / 0.4) }}
            >
              <h2 className="text-4xl font-bold text-white">Wave Collapse</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-dna-helix',
      category: 'Card Reveals',
      title: "DNA Helix Spin",
      description: "Cards rotate in double helix pattern",
      code: `// DNA double helix rotation
const helixAngle = progress * Math.PI * 4 + (i * Math.PI / 3);
const helixRadius = 200;
const x = Math.cos(helixAngle) * helixRadius;
const y = (i - 3) * 80 + progress * 300;
const z = Math.sin(helixAngle) * helixRadius;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1500px' }}>
            {cardPositions.map((i) => {
              const helixAngle = progress * Math.PI * 4 + (i * Math.PI / 3);
              const helixRadius = 200;
              const x = Math.cos(helixAngle) * helixRadius;
              const y = (i - 3) * 80 + progress * 300;
              const z = Math.sin(helixAngle) * helixRadius;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px)
                      rotateY(${helixAngle}rad)
                    `,
                    opacity: 1 - progress * 0.7,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.6) / 0.3) }}
            >
              <h2 className="text-4xl font-bold text-white">DNA Helix</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-phoenix',
      category: 'Card Reveals',
      title: "Phoenix Rise",
      description: "Cards rise and scatter like phoenix feathers",
      code: `// Phoenix wing spread pattern
const wingAngle = (i % 3 - 1) * 60;
const riseHeight = progress * 500;
const spreadX = (i % 3 - 1) * progress * 250;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const row = Math.floor(i / 3);
              const wingAngle = (i % 3 - 1) * 60 * progress;
              const riseHeight = progress * (400 + row * 100);
              const spreadX = (i % 3 - 1) * progress * 250;
              const rotation = progress * 360 + (i * 30);

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${spreadX}px), calc(-50% - ${riseHeight}px))
                      rotate(${wingAngle}deg)
                      rotateY(${rotation}deg)
                    `,
                    opacity: 1 - progress * 0.8,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.5) / 0.4) }}
            >
              <h2 className="text-4xl font-bold text-white">Phoenix Rise</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-hourglass',
      category: 'Card Reveals',
      title: "Hourglass Flip",
      description: "Cards flip and squeeze through hourglass shape",
      code: `// Hourglass squeeze with vertical compression
const squeezeScale = 1 - Math.sin(progress * Math.PI) * 0.7;
const flipRotation = progress * 180;`,
      render: (progress) => {
        const cardPositions = [
          { row: 0, col: 0 }, { row: 0, col: 1 },
          { row: 1, col: 0 }, { row: 1, col: 1 },
          { row: 2, col: 0 }, { row: 2, col: 1 },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]" style={{ perspective: '1200px' }}>
            {cardPositions.map((pos, i) => {
              const delay = Math.abs(2.5 - i) * 0.1;
              const cardProgress = Math.max(0, Math.min(1, (progress - delay) / 0.4));
              const squeezeScale = 1 - Math.sin(cardProgress * Math.PI) * 0.7;
              const flipRotation = cardProgress * 180;
              const offsetY = (pos.row - 1) * 150 * (1 - cardProgress);

              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${pos.col === 0 ? '35%' : '65%'}`,
                    top: '50%',
                    transform: `
                      translate(-50%, calc(-50% + ${offsetY}px))
                      scaleX(${squeezeScale})
                      rotateY(${flipRotation}deg)
                    `,
                    opacity: 1 - cardProgress * 0.6,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.6) / 0.3) }}
            >
              <h2 className="text-4xl font-bold text-white">Hourglass</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-quantum',
      category: 'Card Reveals',
      title: "Quantum Shift",
      description: "Cards teleport and phase shift",
      code: `// Quantum phase shift with random positions
const phaseShift = Math.sin(progress * Math.PI * 6) * 50;
const quantumOpacity = 0.3 + Math.abs(Math.sin(progress * Math.PI * 8)) * 0.7;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const phaseShift = Math.sin((progress + i * 0.2) * Math.PI * 6) * 50;
              const phaseY = Math.cos((progress + i * 0.3) * Math.PI * 4) * 80;
              const quantumOpacity = 0.3 + Math.abs(Math.sin((progress + i * 0.15) * Math.PI * 8)) * 0.7;
              const glitchRotation = progress * 720 + Math.sin(progress * Math.PI * 10) * 45;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${phaseShift}px), calc(-50% + ${phaseY}px))
                      rotate(${glitchRotation}deg)
                      scale(${1 - progress * 0.5})
                    `,
                    opacity: quantumOpacity * (1 - progress * 0.5),
                    width: '120px',
                    height: '120px',
                    filter: `blur(${progress * 3}px)`,
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.5) / 0.4) }}
            >
              <h2 className="text-4xl font-bold text-white">Quantum Shift</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-prism',
      category: 'Card Reveals',
      title: "Prism Refraction",
      description: "Cards separate like light through prism",
      code: `// Prism color separation effect
const prismAngle = (i / 6) * 30 - 15;
const separation = progress * 400;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const prismAngle = (i / 6) * 30 - 15;
              const radians = (prismAngle * Math.PI) / 180;
              const separation = progress * 400;
              const x = Math.sin(radians) * separation;
              const y = -Math.cos(radians) * separation * 0.3;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                      rotate(${prismAngle * progress}deg)
                    `,
                    opacity: 1 - progress * 0.7,
                    width: '120px',
                    height: '120px',
                    filter: `hue-rotate(${i * 60}deg) brightness(${1 + progress * 0.3})`,
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.5) / 0.4) }}
            >
              <h2 className="text-4xl font-bold text-white">Prism Refraction</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-nebula',
      category: 'Card Reveals',
      title: "Nebula Expansion",
      description: "Cards expand outward like cosmic nebula",
      code: `// Nebula expansion with rotation and blur
const nebulaDist = Math.pow(progress, 1.5) * 450;
const rotation = progress * 540;`,
      render: (progress) => {
        const cardPositions = [
          { angle: 0 }, { angle: 60 }, { angle: 120 },
          { angle: 180 }, { angle: 240 }, { angle: 300 },
        ];

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((pos, i) => {
              const radians = (pos.angle * Math.PI) / 180;
              const nebulaDist = Math.pow(progress, 1.5) * 450;
              const x = Math.cos(radians) * nebulaDist;
              const y = Math.sin(radians) * nebulaDist;
              const rotation = progress * 540 + pos.angle;
              const scale = 1 + progress * 0.5;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                      rotate(${rotation}deg)
                      scale(${scale})
                    `,
                    opacity: 1 - progress * 0.9,
                    width: '120px',
                    height: '120px',
                    filter: `blur(${progress * 8}px)`,
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.4) / 0.4) }}
            >
              <h2 className="text-4xl font-bold text-white">Nebula Expansion</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-orbit',
      category: 'Card Reveals',
      title: "Planetary Orbit",
      description: "Cards orbit in elliptical paths",
      code: `// Elliptical orbit animation
const orbitAngle = progress * Math.PI * 3 + (i / 6) * Math.PI * 2;
const orbitRadiusX = 300;
const orbitRadiusY = 180;
const x = Math.cos(orbitAngle) * orbitRadiusX;
const y = Math.sin(orbitAngle) * orbitRadiusY;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const orbitAngle = progress * Math.PI * 3 + (i / 6) * Math.PI * 2;
              const orbitRadiusX = 300;
              const orbitRadiusY = 180;
              const x = Math.cos(orbitAngle) * orbitRadiusX;
              const y = Math.sin(orbitAngle) * orbitRadiusY;
              const rotation = -orbitAngle * (180 / Math.PI);
              const scale = 0.8 + Math.sin(orbitAngle) * 0.3;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                      rotate(${rotation}deg)
                      scale(${scale})
                    `,
                    opacity: 0.5 + Math.abs(Math.cos(orbitAngle)) * 0.5,
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 1 }}
            >
              <h2 className="text-4xl font-bold text-white">Planetary Orbit</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-matrix-rain',
      category: 'Card Reveals',
      title: "Matrix Rain",
      description: "Cards fall like Matrix digital rain",
      code: `// Matrix-style falling effect
const fallSpeed = (i % 3 + 1) * 100;
const fallDistance = progress * 600 + (i * fallSpeed);
const digitalGlitch = Math.sin(progress * Math.PI * 20) * 10;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px] overflow-hidden">
            {cardPositions.map((i) => {
              const column = i % 3;
              const fallSpeed = (i % 3 + 1) * 100;
              const fallDistance = (progress * 600 + (i * fallSpeed)) % 800;
              const digitalGlitch = Math.sin((progress + i * 0.1) * Math.PI * 20) * 10;
              const opacity = Math.sin((fallDistance / 800) * Math.PI);

              return (
                <div
                  key={i}
                  className="absolute rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    left: `${25 + column * 25}%`,
                    top: '0%',
                    transform: `
                      translate(calc(-50% + ${digitalGlitch}px), ${fallDistance - 100}px)
                    `,
                    opacity: opacity * 0.8,
                    width: '100px',
                    height: '100px',
                    filter: `brightness(${1 + opacity * 0.5}) contrast(1.2)`,
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 1 }}
            >
              <h2 className="text-4xl font-bold text-green-400">Matrix Rain</h2>
            </div>
          </div>
        );
      }
    },
    {
      id: 'card-blackhole',
      category: 'Card Reveals',
      title: "Black Hole Gravity",
      description: "Cards get pulled into gravitational singularity",
      code: `// Black hole gravity well effect
const gravityDist = Math.pow(progress, 2) * 400;
const spiralAngle = progress * Math.PI * 6;
const gravityScale = 1 - Math.pow(progress, 2) * 0.95;`,
      render: (progress) => {
        const cardPositions = Array.from({ length: 6 }, (_, i) => i);

        return (
          <div className="relative w-full max-w-6xl h-[700px]">
            {cardPositions.map((i) => {
              const baseAngle = (i / 6) * Math.PI * 2;
              const spiralAngle = baseAngle + progress * Math.PI * 6;
              const gravityDist = (1 - Math.pow(progress, 2)) * 350;
              const x = Math.cos(spiralAngle) * gravityDist;
              const y = Math.sin(spiralAngle) * gravityDist;
              const gravityScale = 1 - Math.pow(progress, 2) * 0.95;
              const rotation = progress * 1440;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    transform: `
                      translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                      rotate(${rotation}deg)
                      scale(${gravityScale})
                    `,
                    opacity: 1 - Math.pow(progress, 1.5),
                    width: '120px',
                    height: '120px',
                    filter: `blur(${progress * 10}px) brightness(${1 - progress * 0.8})`,
                  }}
                >
                  <Image
                    src={cardImages[i].src}
                    alt={`Artcoin ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            })}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: Math.max(0, (progress - 0.3) / 0.5) }}
            >
              <div className="w-32 h-32 rounded-full bg-black border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.8)]" />
              <h2 className="absolute text-4xl font-bold text-white mt-48">Black Hole</h2>
            </div>
          </div>
        );
      }
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 text-white p-3 rounded-lg shadow-2xl"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-slate-800/95 backdrop-blur-lg border-r border-slate-700 overflow-y-auto transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-72`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Animations</h2>
          <p className="text-sm text-gray-400 mb-6">56 effects total</p>

          <nav className="space-y-1">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-purple-400 hover:bg-slate-700/50 rounded-lg transition"
                >
                  <span>{category}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${expandedCategory === category ? 'rotate-90' : ''}`}
                  />
                </button>

                {expandedCategory === category && (
                  <div className="ml-3 mt-1 space-y-1">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToAnimation(item.id)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Hero */}
        <div className="h-screen flex items-center justify-center sticky top-0">
          <div className="text-center z-10 px-4 pt-20 lg:pt-0">
            <h1 className="text-6xl font-bold text-white mb-4">
              Complete Animation Library
            </h1>
            <p className="text-xl text-purple-300 mb-4">
              56 Animations • Scroll + Hover Effects • Copy & Paste Ready
            </p>
            <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur max-w-3xl mx-auto mt-8">
              <p className="text-sm text-gray-300">
                Use the sidebar to navigate through categories. Click any animation name
                to jump directly to it. Includes 41 scroll animations and 15 advanced hover
                effects. Each includes a copy button for instant code access.
              </p>
            </div>
          </div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          </div>
        </div>

        {/* Animations */}
        <div className="relative z-20 bg-slate-900">
          {animations.map((anim, index) => (
            <section 
              key={anim.id}
              id={anim.id}
              ref={el => sectionsRef.current[index] = el}
              className="min-h-screen flex items-center justify-center py-20 relative"
            >
              <button
                onClick={() => copyCode(anim.code, index)}
                className="absolute top-8 right-8 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all z-30 shadow-lg"
              >
                {copiedIndex === index ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy Code
                  </>
                )}
              </button>

              <div className="w-full flex items-center justify-center px-4">
                {anim.render(getProgress(index))}
              </div>

              <div className="absolute top-8 left-8 bg-slate-800/90 backdrop-blur px-6 py-3 rounded-lg max-w-md">
                <div className="text-xs text-purple-400 font-bold mb-1">{anim.category}</div>
                <h3 className="text-xl font-bold text-white mb-1">{anim.title}</h3>
                <p className="text-sm text-purple-300">{anim.description}</p>
              </div>
            </section>
          ))}

          {/* Final Section */}
          <section className="min-h-screen flex items-center justify-center py-20">
            <div className="text-center max-w-4xl px-8">
              <h2 className="text-5xl font-bold text-white mb-8">
                56 Animations Ready! 🚀
              </h2>
              <div className="bg-slate-800 p-8 rounded-2xl text-left space-y-4">
                <h3 className="text-2xl font-bold text-purple-400">Quick Stats:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <h4 className="font-bold text-white mb-2">Categories:</h4>
                    <ul className="space-y-1 text-sm">
                      {Object.entries(categories).map(([category, items]) => (
                        <li key={category}>• {category} ({items.length})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Features:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>✓ Professional sidebar navigation</li>
                      <li>✓ 41 scroll + 15 hover animations</li>
                      <li>✓ Copy button on each</li>
                      <li>✓ Advanced effects</li>
                      <li>✓ Mobile responsive</li>
                      <li>✓ Next.js ready</li>
                      <li>✓ No external libraries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MasterScrollPlayground;