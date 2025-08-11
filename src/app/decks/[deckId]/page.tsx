import React from "react";
import DeckEditorWrapper from "./components/DeckEditorWrapper";
import { Deck } from "./types";
import { getAccessToken } from "@auth0/nextjs-auth0";

interface DeckEditorPageProps {
  params: { deckId: string };
}

const DeckEditorPage = async ({ params }: DeckEditorPageProps) => {
  const { deckId } = params;

  let deck: Deck | null = null;
  let accessToken: string | null = null;
  try {
    const tokenResult = await getAccessToken();
    accessToken = tokenResult.accessToken || null;
    if (!accessToken) {
      throw new Error("No access token found.");
    }

    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
    const response = await fetch(`${backendUrl}/decks/${deckId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch deck: ${response.status} ${response.statusText}`
      );
      throw new Error(`Failed to fetch deck: ${response.statusText}`);
    }

    deck = await response.json();
    console.log("Fetched deck:", deck);
  } catch (error: any) {
    console.error("Error loading deck:", error);
  }

  if (!deck) {
    return (
      <div>
        Error: Deck not found or could not be loaded. Check console for details.
      </div>
    );
  }

  return <DeckEditorWrapper deck={deck} accessToken={accessToken} />;
};

export default DeckEditorPage;
