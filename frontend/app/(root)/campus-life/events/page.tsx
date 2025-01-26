import type { Metadata } from "next"
import EventsContent from "./events-content"

export const metadata: Metadata = {
  title: "Events | Campus Diary",
  description: "Discover exciting events and activities happening at Campus Diary.",
}

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Events at Campus Diary</h1>
      <EventsContent />
    </div>
  )
}

