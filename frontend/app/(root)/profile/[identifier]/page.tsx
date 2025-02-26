import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import ProfileContent from "../profile-content";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Student Profile | Campus Connect",
  description: "View and manage your student profile at Campus Connect.",
};

export default async function ProfilePage({
  params: paramsPromise,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const params = await paramsPromise;
  const user = await currentUser();
  if (!user) {
    return notFound();
  }

  try {
    let profile;
    if (params.identifier.includes("@")) {
      profile = await prisma.user.findUnique({
        where: { email: params.identifier },
        include: {
          projects: true,
          achievements: true,
          extracurriculars: true,
          portfolioItems: true,
          privacySettings: true,
          events: true,
          sports: true,
          clubs: true,
        },
      });
    } else {
      profile = await prisma.user.findUnique({
        where: { username: params.identifier },
        include: {
          projects: true,
          achievements: true,
          extracurriculars: true,
          portfolioItems: true,
          privacySettings: true,
          events: true,
          sports: true,
          clubs: true,
        },
      });

      if (!profile) {
        profile = await prisma.user.findUnique({
          where: { clerkId: params.identifier },
          include: {
            projects: true,
            achievements: true,
            extracurriculars: true,
            portfolioItems: true,
            privacySettings: true,
            events: true,
            sports: true,
            clubs: true,
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
        <ProfileContent
          cId={user.id}
          profile={profile}
          isOwnProfile={isOwnProfile}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return notFound();
  }
}
