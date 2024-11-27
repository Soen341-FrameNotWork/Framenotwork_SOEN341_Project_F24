import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ensure both req and res are passed to getServerSession
    const session = await getServerSession(authOptions);
    console.log("session: ", session);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Success",
      user: {
        id: session.user.id,
        name: session.user.name,
        role: session.user.role,
      },
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    // Ensure both req and res are passed to getServerSession
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Success",
      user: {
        id: session.user.id,
        name: session.user.name,
        role: session.user.role,
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
