"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";


export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Desktop floating nav */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed left-1/2 -translate-x-1/2 transform top-4 sm:top-6 z-[5000] hidden sm:flex items-center justify-center",
          "w-auto",
          "rounded-full backdrop-blur-xl bg-white/10 border border-[#d4af37]/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-white font-bacon",
          "pl-6 pr-2 py-2 space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            aria-label={navItem.name}
            className="relative flex items-center space-x-1 hover:text-white/80 ubuntu-bold px-3 py-2 rounded-full"
          >
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </a>
        ))}
      </motion.div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((v) => !v)}
        className="sm:hidden fixed top-4 left-4 z-[5001] h-10 w-10 rounded-full border border-[#d4af37]/60 bg-white/10 backdrop-blur-xl text-white flex flex-col items-center justify-center space-y-1"
      >
        <span className="sr-only">Toggle menu</span>
        <span className={cn("block h-0.5 w-5 bg-white transition-all", isOpen && "translate-y-1.5 rotate-45")}></span>
        <span className={cn("block h-0.5 w-5 bg-white transition-opacity", isOpen && "opacity-0")}></span>
        <span className={cn("block h-0.5 w-5 bg-white transition-all", isOpen && "-translate-y-1.5 -rotate-45")}></span>
      </button>

      {/* Mobile overlay menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          id="mobile-menu"
          className="sm:hidden fixed inset-0 z-[5000] bg-black/70"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="mt-16 mx-3 rounded-2xl border border-[#d4af37]/60 bg-white/10 backdrop-blur-xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="py-2">
              {navItems.map((navItem: any, idx: number) => (
                <li key={`m-link=${idx}`}>
                  <a
                    href={navItem.link}
                    className="block px-4 py-3 text-base hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    {navItem.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
