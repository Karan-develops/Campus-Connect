import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MyCreationsContent from "./my-creations-content";

export const metadata: Metadata = {
  title: "My Creations | Campus Diary",
  description:
    "View and manage your created events, clubs, and sports at Campus Diary.",
};

export default async function MyCreationsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Creations</h1>
      <MyCreationsContent userId={userId} />
    </div>
  );
}
