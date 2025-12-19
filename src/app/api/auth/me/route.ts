import { NextResponse } from 'next/server';

/**
 * Mock /api/auth/me endpoint for local development
 * Returns 401 when no session cookie present (triggers dashboard auth redirect)
 *
 * In production, this would be handled by the real API at api.omnigaze.com
 */
export async function GET(request: Request) {
  // Check for session cookie (would be set by login/verify in real API)
  const cookie = request.headers.get('cookie');
  const hasSession = cookie?.includes('omnigaze_session');

  if (!hasSession) {
    return NextResponse.json(
      { error: 'Not authenticated', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  // Mock user data for development
  return NextResponse.json({
    customerId: 12345,
    email: 'demo@example.com',
    tier: 'community',
    tierDisplayName: 'Community',
    serverLimit: 50,
    userLimit: 1,
    isActive: true,
  });
}
