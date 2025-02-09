import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      console.error("Unauthorized: No userId found.");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    const dbUser = user?.id;

    if (!dbUser) {
      console.error("Unauthorized: No dbUser found.");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (!body || typeof body !== "object" || !body.data) {
      console.error("Invalid data structure received:", body);
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { type, data } = body;

    if (!data.name || !data.description) {
      console.error("Missing required fields:", data);
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let result;

    switch (type) {
      case "club":
        result = await prisma.club.create({
          data: {
            name: data.name,
            category: data.category,
            description: data.description,
            contactEmail: data.contactEmail,
            creatorId: dbUser,
          },
        });
        break;

      case "event":
        result = await prisma.event.create({
          data: {
            name: data.name,
            date: data.date,
            location: data.location,
            description: data.description,
            creatorId: dbUser,
          },
        });
        break;

      case "sport":
        result = await prisma.sport.create({
          data: {
            name: data.name,
            type: data.type,
            description: data.description,
            coach: data.coach,
            creatorId: dbUser,
          },
        });
        break;

      default:
        console.error("Invalid type received:", type);
        return new NextResponse("Invalid type", { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating Campus-Create Form:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
