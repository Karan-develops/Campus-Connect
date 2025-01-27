"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses?.length) {
      throw new Error("No valid user found");
    }

    const primaryEmail = user.emailAddresses[0].emailAddress;

    const existingUser = await prisma.user.findFirst({
      where: {
        clerkId: user.id,
      },
      include: {
        privacySettings: true,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    // Generate a unique username
    const baseUsername = user.username || primaryEmail.split("@")[0];
    let uniqueUsername = baseUsername;
    let count = 1;

    while (true) {
      const usernameExists = await prisma.user.findUnique({
        where: { username: uniqueUsername },
      });

      if (!usernameExists) break;

      uniqueUsername = `${baseUsername}${count}`;
      count++;
    }

    // Create new user with all required fields
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name:
          `${user.firstName || ""} ${user.lastName || ""}`.trim() || "New User",
        email: primaryEmail,
        username: uniqueUsername,
        avatarUrl: user.imageUrl || "",
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
      include: {
        privacySettings: true,
      },
    });

    revalidatePath("/");
    return newUser;
  } catch (error) {
    console.error("Error in syncUser:", error);
    throw new Error("Failed to sync user");
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
    // If updating username, check if it's unique
    if (data.username) {
      const existingUser = await prisma.user.findUnique({
        where: {
          username: data.username,
          NOT: {
            clerkId: userId,
          },
        },
      });

      if (existingUser) {
        throw new Error("Username already taken");
      }
    }

    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data,
      include: {
        privacySettings: true,
      },
    });

    revalidatePath(`/profile/${updatedUser.username}`);
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

    revalidatePath(`/profile/${userId}`);
    return updatedSettings;
  } catch (error) {
    console.error("Error updating privacy settings", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
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
    console.error("Error fetching user by Clerk ID:", error);
    throw error;
  }
}
