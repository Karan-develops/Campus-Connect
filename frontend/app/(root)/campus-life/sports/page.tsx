import type { Metadata } from "next"
import SportsContent from "./sports-content"

export const metadata: Metadata = {
  title: "Sports | Campus Dairy",
  description: "Explore the vibrant sports programs and facilities at Campus Dairy.",
}

export default function SportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sports at Campus Dairy</h1>
      <SportsContent />
    </div>
  )
}

