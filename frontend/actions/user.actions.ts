"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      throw new Error("No user found");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.emailAddresses[0].emailAddress,
        username:
          user.username || user.emailAddresses[0].emailAddress.split("@")[0],
        avatarUrl: user.imageUrl,
        major: "",
        year: "",
        bio: "",
        githubUrl: "",
        linkedinUrl: "",
        privacySettings: {
          create: {
            showEmail: true,
            showProjects: true,
            showAchievements: true,
            showExtracurriculars: true,
            showPortfolio: true,
          },
        },
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Error syncing user", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        projects: true,
        achievements: true,
        extracurriculars: true,
        portfolioItems: true,
        privacySettings: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by Clerk ID", error);
    throw error;
  }
}

export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    username?: string;
    major?: string;
    year?: string;
    bio?: string;
    githubUrl?: string;
    linkedinUrl?: string;
  }
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile", error);
    throw error;
  }
}

export async function updatePrivacySettings(
  userId: string,
  settings: {
    showEmail?: boolean;
    showProjects?: boolean;
    showAchievements?: boolean;
    showExtracurriculars?: boolean;
    showPortfolio?: boolean;
  }
) {
  try {
    const updatedSettings = await prisma.privacySettings.update({
      where: { userId },
      data: settings,
    });
    return updatedSettings;
  } catch (error) {
    console.error("Error updating privacy settings", error);
    throw error;
  }
}
