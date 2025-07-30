import React from "react";
import DeckEditor from "./components/DeckEditor";
import { Deck } from "./types";

// Placeholder data for the deck
const placeholderDeck: Deck = {
  id: 1,
  title: "My Awesome Pitch Deck",
  slides: [
    {
      id: "1",
      title: "Introduction",
      content: "Welcome to our pitch!",
      order: 1,
    },
    {
      id: "2",
      title: "The Problem",
      content: "The world has a problem...",
      order: 2,
    },
    {
      id: "3",
      title: "Our Solution",
      content: "And we are the solution!",
      order: 3,
    },
  ],
  versions: [],
};

export async function generateStaticParams() {
  return [{ deckId: '1' }]; // Using a placeholder ID
}

const DeckEditorPage = () => {
  return (
    <div className="container bg- mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{placeholderDeck.title}</h1>
      <DeckEditor deck={placeholderDeck} />
    </div>
  );
};

export default DeckEditorPage;
