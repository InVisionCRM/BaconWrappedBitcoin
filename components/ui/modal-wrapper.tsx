"use client"

import { ModalBody, ModalContent } from "@/components/ui/animated-modal"
import { ReactNode } from "react"

interface ModalWrapperProps {
  title: string
  children: ReactNode
  maxWidth?: "sm" | "md" | "lg"
}

const maxWidthClasses = {
  sm: "!max-w-sm",
  md: "!max-w-md",
  lg: "!max-w-lg",
}

export function ModalWrapper({ title, children, maxWidth = "md" }: ModalWrapperProps) {
  return (
    <ModalBody>
      <ModalContent className={`!bg-transparent !border-0 !shadow-none ${maxWidthClasses[maxWidth]} !p-0 !rounded-2xl`}>
        <div
          className="overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            borderRadius: "20px",
            padding: "24px",
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
          <h2 className="text-xl font-bold mb-4 ubuntu-bold text-black">{title}</h2>
          {children}
        </div>
      </ModalContent>
    </ModalBody>
  )
}
