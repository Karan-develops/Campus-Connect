import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { bio, githubUrl, linkedinUrl } = body;

    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: { bio, githubUrl, linkedinUrl },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
