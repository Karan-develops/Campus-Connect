import type { Metadata } from "next";
import SkillExchangeContent from "./skill-exchange-content";

export const metadata: Metadata = {
  title: "Skill Exchange | Campus Connect",
  description: "Exchange skills with your peers and learn something new",
};

export default function SkillExchangePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Skill Exchange Hub
      </h1>
      <SkillExchangeContent />
    </div>
  );
}
