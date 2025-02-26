import { Metadata } from "next";
import PlacementsContent from "./placements-content";

export const metadata: Metadata = {
  title: "Placements | Campus Connect",
  description:
    "Explore our outstanding placement records and student success stories.",
};

export default function PlacementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Placements</h1>
      <PlacementsContent />
    </div>
  );
}
