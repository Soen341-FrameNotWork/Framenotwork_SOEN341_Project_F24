import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    // console.log(process.env.NEXTAUTH_SECRET);
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log(process.env.NEXTAUTH_SECRET);

    // If no token is found, redirect to login page
    if (token) {
        // Check user role from token
        const userRole = (token.user as any).role;

        if (userRole === 'instructor') {
            return NextResponse.redirect(new URL('/Instructor', req.url));
        } else {
            return NextResponse.redirect(new URL('/Student', req.url));
        }
    }

    
}

export const config = {
  matcher: '/',
};