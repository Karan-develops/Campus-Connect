import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const params = await paramsPromise;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const listing = await prisma.skillExchange.findUnique({
      where: { id: params.id },
      select: { likedBy: true },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    if (listing.likedBy.includes(userId)) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }

    const updatedListing = await prisma.skillExchange.update({
      where: { id: params.id },
      data: {
        likes: { increment: 1 },
        likedBy: { push: userId },
      },
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error("Error liking skill exchange listing:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
