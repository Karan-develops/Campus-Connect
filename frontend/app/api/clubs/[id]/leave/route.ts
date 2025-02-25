import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getDbIdByClerkID } from "@/actions/extraUser.actions";

export async function POST(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const params = await paramsPromise;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbId = await getDbIdByClerkID(userId);

  if (!dbId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const club = await prisma.club.update({
      where: { id: params.id },
      data: {
        members: {
          disconnect: { id: dbId },
        },
      },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    return NextResponse.json(club);
  } catch (error) {
    console.error("Error leaving club:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
