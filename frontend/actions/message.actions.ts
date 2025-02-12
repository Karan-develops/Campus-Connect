"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getMessages(otherUserId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error) {
    console.log("Error getting messages:", error);
    throw error;
  }
}

export async function sendMessage(receiverId: string, content: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!dbUser) {
      throw new Error("User not found");
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: dbUser.id,
        receiverId,
      },
    });

    return message;
  } catch (error) {
    console.log("Error sending messages:", error);
    throw error;
  }
}

export async function getOtherUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  return user;
}
