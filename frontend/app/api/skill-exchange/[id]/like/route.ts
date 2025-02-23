import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const listing = await prisma.skillExchange.update({
      where: { id: params.id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error liking skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
