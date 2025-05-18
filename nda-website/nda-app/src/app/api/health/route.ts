import { NextResponse } from 'next/server';

/**
 * Simple health check endpoint to verify the server is running
 * This is useful for Render's health checks
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
  });
}
