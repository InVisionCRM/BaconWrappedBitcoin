import DemoCards from "../components/demo-cards"
import Link from "next/link"

export default function CardsPage() {
  return (
    <div className="relative min-h-screen">
      <Link
        href="/demo"
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full border border-white/30 transition-all"
      >
        ← Back to Demos
      </Link>
      <DemoCards />
    </div>
  )
}
