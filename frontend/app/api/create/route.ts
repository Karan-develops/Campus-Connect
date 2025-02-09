import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { type, data } = body;

    let result;

    switch (type) {
      case "event":
        result = await prisma.event.create({
          data: {
            ...data,
            creatorId: userId,
          },
        });
        break;
      case "club":
        result = await prisma.club.create({
          data: {
            ...data,
            creatorId: userId,
          },
        });
        break;
      case "sport":
        result = await prisma.sport.create({
          data: {
            ...data,
            creatorId: userId,
          },
        });
        break;
      default:
        return new NextResponse("Invalid type", { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating Campus-Create Form:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
