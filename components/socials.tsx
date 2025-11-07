"use client"

import { ModalTrigger } from "@/components/ui/animated-modal"
import { ModalWrapper } from "@/components/ui/modal-wrapper"
import { SocialShareButtons } from "@/components/ui/social-share-buttons"

export function SocialsTrigger() {
  return <ModalTrigger>Community</ModalTrigger>
}

export function SocialsModal() {
  return (
    <ModalWrapper title="Join the Community">
      <SocialShareButtons
        url={typeof window !== "undefined" ? window.location.href : "https://baconwrappedbitcoin.com"}
        message="Check out Bacon Wrapped Bitcoin - The tastiest memecoin on PulseChain! 🥓₿"
        platforms={["twitter", "telegram", "discord", "copylink"]}
        size={44}
        gap={16}
        className="justify-center"
      />
    </ModalWrapper>
  )
}

