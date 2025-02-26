import type React from "react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Authentication | Campus Connect",
  description: "Sign in or create an account for Campus Connect",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
