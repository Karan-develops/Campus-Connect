import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us | Campus Diary",
  description:
    "Get in touch with Campus Diary. We're here to answer your questions and provide support.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <ContactContent />
    </div>
  );
}
