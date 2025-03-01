"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
      if (!existingUser.privacySettings) {
        console.warn(`User ${existingUser.id} has no privacy settings!`);
      }
      return existingUser;
    }

    // Unique username generation
    const baseUsername = user.username || primaryEmail.split("@")[0];
    let uniqueUsername = baseUsername;

    const existingCount = await prisma.user.count({
      where: {
        username: { startsWith: baseUsername },
      },
    });

    if (existingCount > 0) {
      uniqueUsername = `${baseUsername}${existingCount}`;
    }

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
    if (!data || Object.keys(data).length === 0) {
      throw new Error("Invalid update data: No fields provided");
    }
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { username: true },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }
    // If updating username, check if it's unique
    if (data.username) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: data.username,
          clerkId: { not: userId },
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

    if (
      data.username &&
      currentUser &&
      data.username !== currentUser.username
    ) {
      redirect(`/profile/${updatedUser.username}`);
    }
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

export async function addProject(
  userId: string,
  projectData: { title: string; description: string; skills: string[] }
) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const newProject = await prisma.project.create({
      data: {
        title: projectData.title,
        description: projectData.description,
        skills: projectData.skills,
        userId: user.id,
      },
    });

    revalidatePath(`/profile/${user.username}`);
    return newProject;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

export async function addAchievement(
  userId: string,
  achievementData: { title: string; description: string; date: string }
) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const parsedDate = new Date(achievementData.date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const achievement = await prisma.achievement.create({
      data: {
        ...achievementData,
        date: parsedDate,
        userId: user.id,
      },
    });

    revalidatePath(`/profile/${user.username}`);
    return { achievement, user };
  } catch (error) {
    console.error("Error adding achievement:", error);
    throw error;
  }
}

export async function addExtracurricular(
  userId: string,
  extracurricularData: {
    name: string;
    role: string;
    description: string;
    startDate: string;
    endDate?: string;
  }
) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const parsedStartDate = new Date(extracurricularData.startDate);
    if (isNaN(parsedStartDate.getTime())) {
      throw new Error("Invalid start date format");
    }

    const parsedEndDate = extracurricularData.endDate
      ? new Date(extracurricularData.endDate)
      : null;
    if (parsedEndDate && isNaN(parsedEndDate.getTime())) {
      throw new Error("Invalid end date format");
    }

    const extracurricular = await prisma.extracurricular.create({
      data: {
        ...extracurricularData,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        userId: user.id,
      },
    });

    revalidatePath(`/profile/${user.username}`);
    return { extracurricular, user };
  } catch (error) {
    console.error("Error adding extracurricular:", error);
    throw error;
  }
}

export async function addPortfolioItem(
  userId: string,
  portfolioItemData: { title: string; description: string; url: string }
) {
  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    try {
      new URL(portfolioItemData.url);
    } catch (e) {
      throw new Error("Invalid URL format");
    }

    const existingPortfolioItem = await prisma.portfolioItem.findFirst({
      where: { userId: user.id, url: portfolioItemData.url },
    });
    if (existingPortfolioItem) {
      throw new Error("Portfolio item with this URL already exists");
    }

    const portfolioItem = await prisma.portfolioItem.create({
      data: {
        ...portfolioItemData,
        userId: user.id,
      },
    });

    revalidatePath(`/profile/${user.username}`);
    return { portfolioItem, user };
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    throw error;
  }
}

export async function fetchProfileData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
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
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function getUserCreations(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        sports: true,
        events: true,
        clubs: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return {
      events: user.events,
      clubs: user.clubs,
      sports: user.sports,
    };
  } catch (error) {
    console.log("Error fetching user creations:", error);
    throw error;
  }
}

export async function getUserConnectionsCount(userId: string) {
  try {
    const connections = await prisma.connection.count({
      where: {
        userId,
      },
    });

    return connections;
  } catch (error) {
    console.log("Error getting user connections:", error);
    throw error;
  }
}

export async function getUserConnectionsDetails(userId: string) {
  try {
    const connections = await prisma.connection.findMany({
      where: {
        OR: [{ userId }],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
        connected: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return connections.map((connection) =>
      connection.userId === userId ? connection.connected : connection.user
    );
  } catch (error) {
    console.log("Error fetching user connection details:", error);
    throw error;
  }
}
