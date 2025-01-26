import type { Metadata } from "next";
import StudentsClubContent from "./club-content";

export const metadata: Metadata = {
  title: "Student Clubs | Campus Diary",
  description:
    "Explore the diverse range of student clubs and organizations at Campus Diary.",
};

export default function StudentsClubPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Student Clubs and Organizations
      </h1>
      <StudentsClubContent />
    </div>
  );
}
