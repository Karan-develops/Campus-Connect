import type { Metadata } from "next";
import AdmissionsContent from "./admissions-content";

export const metadata: Metadata = {
  title: "Admissions | Campus Connect",
  description:
    "Learn about our admission process, requirements, and important dates for joining our college community.",
};

export default function AdmissionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admissions</h1>
      <AdmissionsContent />
    </div>
  );
}
