import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: Request) {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
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
