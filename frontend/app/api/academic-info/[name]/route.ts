import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const resolvedParams = await params;
    const programName = decodeURIComponent(resolvedParams.name);
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/academic-info/${programName}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Academic-Info data");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Academic-Info data" },
      { status: 500 }
    );
  }
}
