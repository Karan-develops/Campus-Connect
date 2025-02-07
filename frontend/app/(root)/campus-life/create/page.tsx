import type { Metadata } from "next";
import CreateContent from "./create-content";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Create | Campus Diary",
  description: "Create new events, clubs, or sports at Campus Diary.",
};

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex text-3xl font-bold mb-8 justify-center items-center">
        Create New Stuff <Sparkles className="ml-3" />
      </h1>
      <CreateContent />
    </div>
  );
}
