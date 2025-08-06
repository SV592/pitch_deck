import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function getDecks(req: NextRequest) {
  try {
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found." }, { status: 401 });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/decks`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Failed to fetch decks from backend." }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error in /api/get-decks route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
