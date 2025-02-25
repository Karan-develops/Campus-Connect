import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getDbIdByClerkID } from "@/actions/extraUser.actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const clubs = await prisma.club.findMany({
      where: category ? { category } : undefined,
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    return NextResponse.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbId = await getDbIdByClerkID(userId);

  if (!dbId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, category, description, creator, contactEmail } =
      await req.json();

    const club = await prisma.club.create({
      data: {
        name,
        category,
        description,
        creator,
        contactEmail,
        members: {
          connect: { id: dbId },
        },
      },
    });

    return NextResponse.json(club);
  } catch (error) {
    console.error("Error creating club:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
