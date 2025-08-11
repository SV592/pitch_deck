import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = withApiAuthRequired(async function updateDeck(req: NextRequest, { params }: { params: { deckId: string } }) {
  
  try {
    const { deckId } = params;
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found." }, { status: 401 });
    }

    const body = await req.json();

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/decks/${deckId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to update deck in backend: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage += `, message: ${errorData.message || 'Unknown error'}`;
      } catch (parseError) {
        errorMessage += `, response: ${errorText}`;
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const updatedDeck = await response.json();
    return NextResponse.json(updatedDeck);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const DELETE = withApiAuthRequired(async function deleteDeck(req: NextRequest, { params }: { params: { deckId: string } }) {
  try {
    const { deckId } = params;
    const { accessToken } = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json({ error: "No access token found." }, { status: 401 });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/decks/${deckId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
