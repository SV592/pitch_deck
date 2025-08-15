import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = withApiAuthRequired(async function updateProfile(
  req: NextRequest,
) {
  try {
    const { accessToken } = await getAccessToken(req);
    const body = await req.json();

    const response = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
