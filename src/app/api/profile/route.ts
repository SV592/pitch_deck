import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function profile(req: NextRequest) {
  try {
    const { accessToken } = await getAccessToken(req);
    console.log("Next.js API Route: Sending Access Token:", accessToken);

    const response = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching profile from backend:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});