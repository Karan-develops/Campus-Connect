import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getDbIdByClerkID } from "@/actions/extraUser.actions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const listing = await prisma.skillExchange.findUnique({
      where: { id: params.id },
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
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error fetching skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const listing = await prisma.skillExchange.update({
      where: { id: params.id, userId: dbId },
      data: {
        offeredSkill,
        desiredSkill,
        description,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error updating skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbId = await getDbIdByClerkID(userId);

  if (!dbId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const listing = await prisma.skillExchange.findUnique({
      where: { id: params.id },
      select: { userId: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.userId !== dbId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.skillExchange.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
