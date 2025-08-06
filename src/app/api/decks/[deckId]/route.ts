import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = withApiAuthRequired(async function deleteDeck(req: NextRequest, { params }: { params: { deckId: string } }) {
  try {
    const { deckId } = params;
    const { accessToken } = await getAccessToken();

    console.log("API Route: Access Token available:", !!accessToken);
    if (accessToken) {
      console.log("API Route: Access Token (first 20 chars):", accessToken.substring(0, 20) + "...");
    }

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found." }, { status: 401 });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    console.log("API Route: Attempting to delete from backend:", `${backendUrl}/decks/${deckId}`);
    console.log("API Route: Sending Authorization header:", `Bearer ${accessToken.substring(0, 20)}...`);
    const response = await fetch(`${backendUrl}/decks/${deckId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.log("API Route: Backend response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Route: Backend error response:", errorText);
      let errorMessage = `Failed to delete deck from backend: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage += `, message: ${errorData.message || 'Unknown error'}`;
      } catch (parseError) {
        errorMessage += `, response: ${errorText}`;
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    return NextResponse.json({ message: "Deck deleted successfully." });
  } catch (error: any) {
    console.error('Error in /api/decks/[deckId] route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
