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
    const { content } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: dbId,
        skillExchangeId: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    await prisma.skillExchange.update({
      where: { id: params.id },
      data: {
        comments: {
          create: {
            content,
            userId: dbId,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error commenting on skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
