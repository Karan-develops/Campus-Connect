import type { Metadata } from "next";
import AcademicsContent from "./academics-content";

export const metadata: Metadata = {
  title: "Academics | Campus Diary",
  description: "Explore our diverse range of academic programs and streams.",
};

const AcademicsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Our Academic Programs
      </h1>
      <AcademicsContent />
    </div>
  );
};

export default AcademicsPage;
