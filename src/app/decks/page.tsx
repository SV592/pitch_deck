"use client";
import React, { useState } from "react";
import DecksHeader from "./components/DecksHeader";
import DeckCard from "./components/DeckCard";
import DeckListItem from "./components/DeckListItem";
import VersionModal from "./components/VersionModal";
import NoDecks from "./components/NoDecks";

const DecksPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDecks, setSelectedDecks] = useState<number[]>([]);
  const [showVersionModal, setShowVersionModal] = useState<number | null>(null);

  const decks = [
    {
      id: 1,
      title: "Product Launch Presentation",
      description:
        "Comprehensive deck for Q2 product launch including market analysis, features, and go-to-market strategy.",
      slideCount: 24,
      currentVersion: "v2.1",
      versions: [
        {
          version: "v2.1",
          date: "2024-01-20",
          author: "You",
          changes: "Updated market analysis slides",
        },
        {
          version: "v2.0",
          date: "2024-01-15",
          author: "Sarah Chen",
          changes: "Major restructure and new branding",
        },
        {
          version: "v1.3",
          date: "2024-01-10",
          author: "You",
          changes: "Added financial projections",
        },
        {
          version: "v1.2",
          date: "2024-01-08",
          author: "Alex Johnson",
          changes: "Updated competitive analysis",
        },
        {
          version: "v1.1",
          date: "2024-01-05",
          author: "You",
          changes: "Initial draft with basic structure",
        },
      ],
      lastModified: "2024-01-20",
      createdAt: "2024-01-05",
      collaborators: ["Sarah Chen", "Alex Johnson"],
      isPublic: false,
      isFavorite: true,
      tags: ["Product", "Launch", "Strategy"],
      thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      status: "active",
    },
  ];

  const handleSelectDeck = (deckId: number) => {
    setSelectedDecks((prev) =>
      prev.includes(deckId)
        ? prev.filter((id) => id !== deckId)
        : [...prev, deckId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DecksHeader />

      <div className="max-w-7xl mx-auto p-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} setShowVersionModal={setShowVersionModal} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {decks.map((deck) => (
              <DeckListItem key={deck.id} deck={deck} selectedDecks={selectedDecks} handleSelectDeck={handleSelectDeck} setShowVersionModal={setShowVersionModal} />
            ))}
          </div>
        )}

        {decks.length === 0 && <NoDecks />}
      </div>

      {showVersionModal && (
        <VersionModal deck={decks.find((d) => d.id === showVersionModal)} setShowVersionModal={setShowVersionModal} />
      )}
    </div>
  );
};

export default DecksPage;