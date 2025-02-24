"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getDbIdByClerkID } from "./extraUser.actions";

export async function getSkillExchangeListing(id: string) {
  try {
    const listing = await prisma.skillExchange.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!listing) {
      throw new Error("Listing not found");
    }
    return listing;
  } catch (error) {
    console.error("Error fetching skill exchange listing:", error);
    throw new Error("Internal Server Error");
  }
}

export async function likeListing(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthoried!");
  }
  try {
    const listing = await prisma.skillExchange.findUnique({
      where: { id },
      select: { likedBy: true },
    });

    if (!listing) {
      throw new Error("Listing not Found");
    }

    if (listing.likedBy.includes(userId)) {
      throw new Error("Already Liked!");
    }

    const updatedListing = await prisma.skillExchange.update({
      where: { id },
      data: {
        likes: { increment: 1 },
        likedBy: { push: userId },
      },
    });

    revalidatePath(`/peers/skill-exchange/listing/${id}`);
    return updatedListing;
  } catch (error) {
    console.error("Error liking skill exchange listing:", error);
    throw error;
  }
}

export async function commentOnListing(id: string, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const dbId = await getDbIdByClerkID(userId);

  if (!dbId) {
    throw new Error("User not Found!");
  }

  try {
    const listing = await prisma.skillExchange.update({
      where: { id },
      data: {
        comments: {
          create: {
            content,
            userId: dbId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    revalidatePath(`/peers/skill-exchange/listing/${id}`);
    return listing;
  } catch (error) {
    console.error("Error commenting on skill exchange listing:", error);
    throw error;
  }
}

export async function deleteListing(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const dbId = await getDbIdByClerkID(userId);

  if (!dbId) {
    throw new Error("User not Found!");
  }

  try {
    await prisma.skillExchange.delete({
      where: { id: dbId },
    });

    revalidatePath("/peers/skill-exchange");
  } catch (error) {
    console.error("Error deleting skill exchange listing:", error);
    throw error;
  }
}
