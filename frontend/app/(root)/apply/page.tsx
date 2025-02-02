import type { Metadata } from "next";
import ApplicationForm from "./application-form";

export const metadata: Metadata = {
  title: "Apply for Admission | Campus Diary",
  description:
    "Submit your application for admission to Campus Diary. Join our vibrant academic community and shape your future.",
};

export default function ApplyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Apply for Admission
      </h1>
      <ApplicationForm />
    </div>
  );
}
