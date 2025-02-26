import type { Metadata } from "next"
import SportsContent from "./sports-content"

export const metadata: Metadata = {
  title: "Sports | Campus Connect",
  description: "Explore the vibrant sports programs and facilities at Campus Connect.",
}

export default function SportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sports at Campus Connect</h1>
      <SportsContent />
    </div>
  )
}

