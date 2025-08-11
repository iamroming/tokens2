// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseConfig } from './lib/supabase-config';

export async function middleware(request: NextRequest) {
  try {
    // These values are now guaranteed to be strings
    const { url: supabaseUrl, anonKey: supabaseKey } = supabaseConfig;
    
    // Example usage - these will now be type-safe
    const headers = new Headers(request.headers);
    headers.set('x-supabase-url', supabaseUrl); // No more type error
    
    return NextResponse.next({
      request: { headers }
    });
    
  } catch (error) {
    console.error('Middleware error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};