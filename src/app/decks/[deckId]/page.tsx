import React from "react";
import DeckEditorWrapper from "./components/DeckEditorWrapper";
import { Deck } from "./types";
import { getAccessToken } from '@auth0/nextjs-auth0';

interface DeckEditorPageProps {
  params: { deckId: string };
}

const DeckEditorPage = async ({ params }: DeckEditorPageProps) => {
  const { deckId } = params;

  let deck: Deck | null = null;
  try {
    const { accessToken } = await getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found.");
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/decks/${deckId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch deck: ${response.statusText}`);
    }

    deck = await response.json();
  } catch (error) {
    // Handle error, e.g., redirect to an error page or show a message
  }

  if (!deck) {
    return <div>Error: Deck not found or could not be loaded.</div>;
  }

  return <DeckEditorWrapper deck={deck} />;
};

export default DeckEditorPage;
