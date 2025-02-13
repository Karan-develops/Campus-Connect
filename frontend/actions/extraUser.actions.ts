"use server";

import prisma from "@/lib/prisma";

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
        clubs: true,
        sports: true,
        events: true,
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

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
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

    if (!user) {
      return null;
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
        clubs: true,
        sports: true,
        events: true,
      },
    });

    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by Clerk ID:", error);
    throw error;
  }
}
