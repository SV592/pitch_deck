import React from "react";
import DeckEditorWrapper from "./components/DeckEditorWrapper";
import { Deck } from "./types";

// Placeholder data for the deck
const placeholderDeck: Deck = {
  id: 1,
  title: "My Awesome Pitch Deck",
  slides: [
    {
      id: "1",
      title: "Introduction",
      content:
        "<p>Welcome to our pitch! This is where we introduce our revolutionary idea.</p>",
      order: 1,
    },
    {
      id: "2",
      title: "The Problem",
      content:
        "<p>The world has a problem that needs solving. Here we identify the pain points and challenges.</p>",
      order: 2,
    },
    {
      id: "3",
      title: "Our Solution",
      content:
        "<p>And we are the solution! Our innovative approach will transform the industry.</p>",
      order: 3,
    },
  ],
  versions: [],
};

export async function generateStaticParams() {
  return [{ deckId: "1" }]; // Using a placeholder ID
}

const DeckEditorPage = () => {
  return <DeckEditorWrapper deck={placeholderDeck} />;
};

export default DeckEditorPage;
