import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

// Single server-side chokepoint for slide regeneration. The browser must never
// call the NestJS backend directly: this route holds the access token and is
// where the prompt-injection detector will be wired in before forwarding.
export const POST = withApiAuthRequired(async function regenerateSlide(
  req: NextRequest,
  { params }: { params?: Record<string, string | string[]> }
) {
  try {
    const deckId = params?.deckId as string;
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found." }, { status: 401 });
    }

    const body = await req.json();

    // Bind the request to the deck in the URL so the browser can't target a
    // different deck than the route it called.
    const payload = { ...body, deckId };

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/decks/slides/regenerate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to regenerate slide: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage += `, message: ${errorData.message || 'Unknown error'}`;
      } catch {
        errorMessage += `, response: ${errorText}`;
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
