
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    // Get the token from the request
    const token = await getToken({ req });

    const { pathname } = req.nextUrl;

    // If no token is found and the user is trying to access a protected route, redirect to signin
    if (!token && pathname !== '/signin') {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    // If user is logged in, check their role and redirect accordingly
    if (token) {
        const userRole = (token.user as any)?.role;

        if (userRole === 'instructor' && pathname !== '/Instructor') {
            return NextResponse.redirect(new URL('/Instructor', req.url));
        } else if (userRole === 'student' && pathname !== '/Student') {
            return NextResponse.redirect(new URL('/Student', req.url));
        }
    }

    // If no redirection is needed, continue with the request
    return NextResponse.next();
}

// Specify which routes the middleware should apply to
export const config = {
    matcher: ['/', '/Instructor', '/Student'], // Add more routes as needed
};