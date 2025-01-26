"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("No user found");
    }
    console.log("**********************");
    console.log("User in syncUser", user);
    console.log("**********************");
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
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

export async function getProfileByUsername(username: string) {
  try {
    const profile = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        projects: true,
        achievements: true,
        extracurriculars: true,
        portfolioItems: true,
        privacySettings: true,
      },
    });

    if (!profile) {
      throw new Error("User not found");
    }

    return profile;
  } catch (error) {
    console.error("Error fetching profile by username:", error);
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
      where: { clerkId: userId },
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
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedSettings = await prisma.privacySettings.update({
      where: { userId: user.id },
      data: settings,
    });
    return updatedSettings;
  } catch (error) {
    console.error("Error updating privacy settings", error);
    throw error;
  }
}
