import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("***********************");
  

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      program,
      previousSchool,
      gpa,
      essay,
    } = await req.json();

    console.log("222222222222222222");
    

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !gender ||
      !address ||
      !program ||
      !previousSchool ||
      !gpa ||
      !essay
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("***********************");
    

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/apply-form`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          firstName,
          lastName,
          email,
          phone,
          dateOfBirth,
          gender,
          address,
          program,
          previousSchool,
          gpa,
          essay,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to submit form" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Application Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
