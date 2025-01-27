import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import ProfileContent from "../profile-content";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Student Profile | Campus Diary",
  description: "View and manage your student profile at Campus Diary.",
};

export default async function ProfilePage({
  params,
}: {
  params: { identifier: string };
}) {
  const user = await currentUser();
  if (!user) {
    return notFound();
  }

  try {
    let profile;
    if (params.identifier.includes("@")) {
      // If the identifier is an email
      profile = await prisma.user.findUnique({
        where: { email: params.identifier },
        include: {
          projects: true,
          achievements: true,
          extracurriculars: true,
          portfolioItems: true,
          privacySettings: true,
        },
      });
    } else {
      // Try to fetch by username first
      profile = await prisma.user.findUnique({
        where: { username: params.identifier },
        include: {
          projects: true,
          achievements: true,
          extracurriculars: true,
          portfolioItems: true,
          privacySettings: true,
        },
      });

      // If not found by username, try by Clerk ID
      if (!profile) {
        profile = await prisma.user.findUnique({
          where: { clerkId: params.identifier },
          include: {
            projects: true,
            achievements: true,
            extracurriculars: true,
            portfolioItems: true,
            privacySettings: true,
          },
        });
      }
    }

    if (!profile) {
      return notFound();
    }

    const isOwnProfile = user.id === profile.clerkId;

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Student Profile</h1>
        <ProfileContent profile={profile} isOwnProfile={isOwnProfile} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return notFound();
  }
}
