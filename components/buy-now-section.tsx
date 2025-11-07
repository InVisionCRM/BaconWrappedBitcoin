"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

function BuyNowWavyBackground({ children, className }: { children: React.ReactNode; className?: string }) {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    let animationId: number;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.filter = "blur(3px)";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const waveColors = [
      "rgba(251, 146, 60, 0.3)", // orange-400
      "rgba(249, 115, 22, 0.2)", // orange-500
      "rgba(234, 88, 12, 0.25)", // orange-600
      "rgba(194, 65, 12, 0.2)",  // orange-700
    ];

    let nt = 0;
    const render = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      nt += 0.002;
      
      // Draw multiple waves
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.lineWidth = 40;
        ctx.strokeStyle = waveColors[i];
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        for (let x = 0; x < rect.width; x += 2) {
          const y = noise(x / 600, 0.3 * i, nt) * 80;
          if (x === 0) {
            ctx.moveTo(x, y + rect.height * 0.7);
          } else {
            ctx.lineTo(x, y + rect.height * 0.7);
          }
        }
        ctx.stroke();
      }
      
      animationId = requestAnimationFrame(render);
    };

    const init = () => {
      resizeCanvas();
      render();
    };

    init();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          width: "100%",
          height: "100%",
          ...(isSafari ? { filter: "blur(3px)" } : {}),
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function BuyNowSection() {
  return (
    <BuyNowWavyBackground className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          {/* Single Compact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Holographic Glass Card - Compact */}
            <motion.div 
              className="relative overflow-hidden rounded-lg border border-white/20 flex flex-col gap-2 px-4 pt-2 pb-2"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                width: '550px',
                height: 'auto',
                minHeight: '80px'
              }}
              whileHover={{
                boxShadow: '0 16px 48px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.2)',
                y: -2
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Contract Address with Copy Icon */}
              <div className="flex items-center justify-center gap-2">
                <code className="text-white/80 font-mono text-sm leading-relaxed text-center">
                  0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e
                </code>
                <button 
                  className="text-white/60 hover:text-white transition-colors duration-200 flex-shrink-0"
                  onClick={() => {
                    navigator.clipboard.writeText("0xB5C4ecEF450fd36d0eBa1420F6A19DBfBeE5292e")
                  }}
                  title="Copy address"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                </button>
              </div>

              {/* Download and Buy Now Buttons */}
              <div className="flex gap-2">
                {/* Download Button */}
                <LinkPreview url="https://internetmoney.io" className="flex-1">
                  {/* Wallet Recommendation Text - Above Download Button */}
                  <p className="text-white/60 text-xs text-center mb-2 t">
                    Need a wallet? Try the Internet Money Wallet!
                  </p>
                  <motion.button
                    className="relative px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xs rounded overflow-hidden w-full"
                    whileHover={{ 
                      scale: 1.00,
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: [
                        "0 0 8px rgba(59, 130, 246, 0.3)",
                        "0 0 12px rgba(59, 130, 246, 0.5)",
                        "0 0 8px rgba(59, 130, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      scale: {
                        duration: 0.2
                      }
                    }}
                    title="Need a wallet? Try the Internet Money Wallet!"
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 opacity-0"
                      animate={{
                        opacity: [0, 0.3, 0],
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                      }}
                    />
                    
                    {/* Button text */}
                    <span className="relative z-10">Download</span>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-50 -z-10" />
                  </motion.button>
                </LinkPreview>

                {/* Buy Now Button */}
                <LinkPreview url="https://pulsex.com" className="flex-1">
                  <motion.button
                    className="relative px-3 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs rounded overflow-hidden w-full"
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: [
                        "0 0 8px rgba(249, 115, 22, 0.3)",
                        "0 0 12px rgba(249, 115, 22, 0.5)",
                        "0 0 8px rgba(249, 115, 22, 0.3)"
                      ]
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      scale: {
                        duration: 0.2
                      }
                    }}
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 opacity-0"
                      animate={{
                        opacity: [0, 0.3, 0],
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                      }}
                    />
                    
                    {/* Button text */}
                    <span className="relative z-10">Buy Now</span>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded bg-gradient-to-r from-orange-500 to-red-500 blur-sm opacity-50 -z-10" />
                  </motion.button>
                </LinkPreview>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </BuyNowWavyBackground>
  );
}
