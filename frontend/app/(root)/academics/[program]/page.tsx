import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LearnMoreContent from "./learn-more-content";

export const metadata: Metadata = {
  title: "Learn More | Academics | Campus Diary",
  description:
    "Explore detailed information about our academic programs at Campus Diary.",
};

export default async function LearnMorePage({
  params: paramsPromise,
}: {
  params: Promise<{ program: string }>;
}) {
  const params = await paramsPromise;
  const programName = decodeURIComponent(params.program.replace(/-/g, " "));

  // DB se data lana h baadme
  const validPrograms = [
    "B.Tech Computer Science and Engineering",
    "B.Tech Information Technology",
    "B.Tech Electronics and Communication",
    "Bachelor of Commerce",
    "Bachelor of Business Administration",
    "B.Tech Artifical Intelligence and Data Science",
    "B.Tech Mechanical Engineering",
    "B.Tech AI and Machine Learning",
  ];

  if (!validPrograms.includes(programName)) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{programName}</h1>
      <LearnMoreContent programName={programName} />
    </div>
  );
}
