import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Only apply middleware to admin routes
  if (pathname.startsWith('/admin')) {
    const email = req.nextUrl.searchParams.get('email');
    
    // If no email is provided, redirect to email page
    if (!email) {
      return NextResponse.redirect(new URL('/email', req.url));
    }
    
    try {
      // Check if user is an admin
      const adminCheckResponse = await fetch(`${req.nextUrl.origin}/api/auth/check-admin?email=${encodeURIComponent(email)}`);
      const adminCheckData = await adminCheckResponse.json();
      
      if (!adminCheckResponse.ok || !adminCheckData.isAdmin) {
        // Redirect non-admin users to documents page
        return NextResponse.redirect(new URL(`/documents?email=${encodeURIComponent(email)}`, req.url));
      }
    } catch (error) {
      console.error('Error in middleware:', error);
      // On error, redirect to email page
      return NextResponse.redirect(new URL('/email', req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
