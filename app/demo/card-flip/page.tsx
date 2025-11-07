import DemoCardFlip from "../components/demo-card-flip"
import Link from "next/link"

export default function CardFlipPage() {
  return (
    <div className="relative w-screen h-screen">
      <Link
        href="/demo"
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/30 transition-all"
      >
        ← Back to Demos
      </Link>
      <DemoCardFlip />
    </div>
  )
}
