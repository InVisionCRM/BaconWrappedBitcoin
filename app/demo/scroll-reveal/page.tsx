import DemoScrollReveal from "../components/demo-scroll-reveal"
import Link from "next/link"

export default function ScrollRevealPage() {
  return (
    <div className="relative">
      <Link
        href="/demo"
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/30 transition-all"
      >
        ← Back to Demos
      </Link>
      <DemoScrollReveal />
    </div>
  )
}
