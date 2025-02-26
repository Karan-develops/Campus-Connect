import type { Metadata } from "next";
import ContactContent from "./contact-content";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Contact Us | Campus Connect",
  description:
    "Get in touch with Campus Connect. We're here to answer your questions and provide support.",
};

export default async function ContactPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <ContactContent userId={null} />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <ContactContent userId={userId} />
    </div>
  );
}
