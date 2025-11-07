"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CryptoPrice } from "@/components/ui/crypto-price";
import { LinkPreview } from "@/components/ui/link-preview";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link?: string;
    component?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Render modal components outside navbar */}
      {navItems.map((item, idx) => item.component && <div key={`modal-${idx}`}>{item.component}</div>)}

      {/* Desktop nav */}
      <motion.div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 top-4 sm:top-6 z-[5000] hidden sm:flex items-center gap-2 rounded-full px-4 py-3 poppins-bold",
          className
        )}
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(201, 201, 201, 0.12) 8.99%, rgba(161, 161, 161, 0.1) 31.88%, rgba(117, 117, 117, 0.08) 73%, rgba(255, 255, 255, 0.15) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="pr-2 mr-2 border-r border-white/20">
          <CryptoPrice 
            contractAddress="0xA1077a294dDE1B09bB078844df40758a5D0f9a27"
            currency="usd" 
            showIcon 
            showSymbol 
            abbreviate 
            className="text-white"
            customIcon="/wpls-logo.png"
            customName="WPLS"
          />
        </div>
        {navItems.map((item, idx) => {
          // Check if the link is an external website
          const isExternalLink = item.link && (item.link.startsWith('http') || item.link.startsWith('https'));
          
          if (isExternalLink) {
            return (
              <LinkPreview
                key={idx}
                url={item.link!}
                className="px-4 py-2 text-sm text-white hover:opacity-80 transition-opacity"
              >
                {item.name}
              </LinkPreview>
            );
          }
          
          return (
            <a
              key={idx}
              href={item.link || "#"}
              className="px-4 py-2 text-sm text-white hover:opacity-80 transition-opacity"
            >
              {item.name}
            </a>
          );
        })}
        <div className="pl-2 ml-2 border-l border-white/20">
          <CryptoPrice coin="bitcoin" currency="usd" showIcon showSymbol abbreviate className="text-white" />
        </div>
      </motion.div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-[5001] h-10 w-10 rounded-full bg-white/10 backdrop-blur-xl text-white flex flex-col items-center justify-center gap-1"
        aria-label="Toggle mobile navigation menu"
      >
        <span className={cn("block h-0.5 w-5 bg-white transition-all", isOpen && "translate-y-1.5 rotate-45")} />
        <span className={cn("block h-0.5 w-5 bg-white transition-opacity", isOpen && "opacity-0")} />
        <span className={cn("block h-0.5 w-5 bg-white transition-all", isOpen && "-translate-y-1.5 -rotate-45")} />
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-[5000] bg-black/70" onClick={() => setIsOpen(false)}>
          <div className="mt-16 mx-3 rounded-2xl bg-white/10 backdrop-blur-xl text-white" onClick={(e) => e.stopPropagation()}>
            <ul className="py-2 poppins-bold">
              {navItems.map((item, idx) => {
                const isExternalLink = item.link && (item.link.startsWith('http') || item.link.startsWith('https'));
                
                return (
                  <li key={idx}>
                    {isExternalLink ? (
                      <div onClick={() => setIsOpen(false)}>
                        <LinkPreview
                          url={item.link!}
                          className="block px-4 py-3 hover:bg-white/10"
                        >
                          {item.name}
                        </LinkPreview>
                      </div>
                    ) : (
                      <a href={item.link || "#"} className="block px-4 py-3 hover:bg-white/10" onClick={() => setIsOpen(false)}>
                        {item.name}
                      </a>
                    )}
                  </li>
                );
              })}
              <li className="px-4 py-3 border-t border-white/10 mt-2">
                <CryptoPrice coin="bitcoin" currency="usd" showIcon showSymbol abbreviate className="text-white" />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
