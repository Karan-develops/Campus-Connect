import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Welcome to Campus Diary - Empowering Minds, Shaping Futures",
  description:
    "Discover a world-class education at College Name. Explore our programs, campus life, and opportunities for personal and professional growth.",
};

export default function Home() {
  return <HomePage />;
}
