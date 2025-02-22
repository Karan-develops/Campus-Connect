import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getDbIdByClerkID } from "@/actions/extraUser.actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  try {
    const listings = await prisma.skillExchange.findMany({
      where: query
        ? {
            OR: [
              { offeredSkill: { contains: query, mode: "insensitive" } },
              { desiredSkill: { contains: query, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching skill exchange listings:", error);
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
    const { offeredSkill, desiredSkill, description } = await req.json();

    const listing = await prisma.skillExchange.create({
      data: {
        offeredSkill,
        desiredSkill,
        description,
        userId: dbId,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error creating skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
