"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUsers() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: { clerkId: userId },
      },
      include: {
        connections: true,
        connectedBy: true,
      },
    });

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!dbUser) {
      throw new Error("User not Found");
    }

    return users.map((user) => {
      const isConnected =
        user.connections.some((conn) => conn.connectedId === dbUser.id) ||
        user.connectedBy.some((conn) => conn.userId === dbUser.id);

      return { ...user, isConnected };
    });
  } catch (error) {
    console.error("Error fetching user connections:", error);
    throw error;
  }
}

export async function connectWithUser(connectedId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    const dbId = dbUser?.id;

    if (!dbId) {
      throw new Error("Unauthorized");
    }

    // Ensure the connection doesn't already exist
    const existingConnection = await prisma.connection.findFirst({
      where: {
        OR: [
          { userId: dbId, connectedId },
          { userId: connectedId, connectedId: dbId },
        ],
      },
    });

    if (existingConnection) {
      throw new Error("Users are already connected.");
    }

    // Create bi-directional connections
    const connection = await prisma.connection.createMany({
      data: [
        { userId: dbId, connectedId: connectedId },
        { userId: connectedId, connectedId: dbId },
      ],
    });

    return connection;
  } catch (error) {
    console.log("Error connecting with user:", error);
    throw error;
  }
}
