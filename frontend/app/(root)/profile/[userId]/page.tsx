import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import ProfileContent from "./profile-content";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Student Profile | Campus Diary",
  description: "View and manage your student profile at Campus Diary.",
};

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await currentUser();
  if (!user) {
    return notFound();
  }

  const profile = await prisma.user.findUnique({
    where: { clerkId: params.userId },
    include: {
      projects: true,
      achievements: true,
      extracurriculars: true,
      portfolioItems: true,
      privacySettings: true,
    },
  });

  if (!profile) {
    return notFound();
  }

  const isOwnProfile = user.id === params.userId;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Student Profile</h1>
      <ProfileContent
        profile={profile}
        isOwnProfile={user.id === profile.clerkId}
      />
    </div>
  );
}
