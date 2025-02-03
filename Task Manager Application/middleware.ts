import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function to protect routes.
 * Checks for the presence of a 'token' cookie.
 * If the token is not present, redirects the user to the login page.
 * If the token is present, allows the request to proceed.
 * 
 * @param {NextRequest} request - The incoming HTTP request.
 * @returns {NextResponse} - The response object to redirect or continue.
 */
export function middleware(request: NextRequest) {
    // Retrieve the 'token' cookie from the request.
    const token = request.cookies.get('token')?.value;

    // If the token is not found, redirect to the login page.
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If the token is found, proceed with the request.
    return NextResponse.next();
}

// Configuration for the middleware to apply to specific routes.
export const config = {
    // This middleware will only be applied to routes matching '/dashboard/:path*'.
    matcher: ['/dashboard/:path*', '/task/:path*'],
};
