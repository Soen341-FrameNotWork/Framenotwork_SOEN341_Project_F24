import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]/route'; // Adjust path if necessary
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_req: NextApiRequest) {
  try {
    // Ensure both req and res are passed to getServerSession
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
      return NextResponse.json({ message: "You must be logged in." }, { status: 401 });
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
    return NextResponse.json({ message: "Internal Server Error"},{status:500});
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextApiRequest) {
  try {
    // Ensure both req and res are passed to getServerSession
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "You must be logged in." },{status:401});
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
    return NextResponse.json({ message: "Internal Server Error" },{status:500});
  }
}