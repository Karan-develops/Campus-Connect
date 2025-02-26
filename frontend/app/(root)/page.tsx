import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Welcome to Campus Connect - Empowering Minds, Shaping Futures",
  description:
    "Discover a world-class education at Campus Connect. Explore our programs, campus life, and opportunities for personal and professional growth.",
};

export default async function Home() {
  return <HomePage />;
}
