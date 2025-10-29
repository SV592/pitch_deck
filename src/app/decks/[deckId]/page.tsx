import React from "react";
import DeckEditorWrapper from "./components/DeckEditorWrapper";
import { Deck } from "./types";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

interface DeckEditorPageProps {
  params: { deckId: string };
}

const DeckEditorPage = async ({ params }: DeckEditorPageProps) => {
  const { deckId } = params;

  const session = await getSession();

  if (!session?.accessToken) {
    redirect('/api/auth/login');
  }

  let deck: Deck | null = null;
  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
    const response = await fetch(`${backendUrl}/decks/${deckId}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
      cache: 'no-store',
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
    redirect('/decks');
  }

  if (!deck) {
    redirect('/decks');
  }

  return <DeckEditorWrapper deck={deck} accessToken={session.accessToken} />;
};

export default DeckEditorPage;
