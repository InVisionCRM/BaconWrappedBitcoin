"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"

interface NavbarDropdownProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function NavbarDropdown({ label, children, className }: NavbarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all ubuntu-bold text-white hover:brightness-110 ${className}`}
        style={{
          background: "linear-gradient(150deg, rgba(208, 208, 208, 0.15) 0%, rgba(204, 204, 204, 0.12) 50.17%, rgba(200, 200, 200, 0.1) 100%)",
        }}
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full mt-2 right-0 min-w-[280px] max-w-md"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderRadius: "16px",
              padding: "16px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: `
                0.067px 1.008px 0.505px 0px rgba(0, 0, 0, 0.05),
                0.29px 4.357px 2.183px 0px rgba(0, 0, 0, 0.08),
                0.78px 11.698px 5.862px 0px rgba(0, 0, 0, 0.1),
                2.198px 32.971px 16.522px 0px rgba(0, 0, 0, 0.15),
                4px 60px 30.067px 0px rgba(0, 0, 0, 0.2)
              `,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

