"use client";
import React, { useState, useEffect } from "react";
import DecksHeader from "./components/DecksHeader";
import DeckCard from "./components/DeckCard";
import DeckListItem from "./components/DeckListItem";
import VersionModal from "./components/VersionModal";
import NoDecks from "./components/NoDecks";
import { useUser } from '@auth0/nextjs-auth0/client';
import { Deck } from "./[deckId]/types";

const DecksPage: React.FC = () => {
  const { user, isLoading: loadingAuth } = useUser();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  const [showVersionModal, setShowVersionModal] = useState<string | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecks = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/get-decks');
        if (!response.ok) {
          throw new Error(`Failed to fetch decks: ${response.statusText}`);
        }
        const data = await response.json();
        setDecks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDecks();
  }, [user]);

  const handleSelectDeck = (deckId: string) => {
    setSelectedDecks((prev) =>
      prev.includes(deckId)
        ? prev.filter((id) => id !== deckId)
        : [...prev, deckId]
    );
  };

  const handleDeleteDeck = async (deckId: string) => {
    if (!user) {
      alert("You must be logged in to delete a deck.");
      return;
    }

    if (!confirm("Are you sure you want to delete this deck?")) {
      return;
    }

    try {
      const response = await fetch(`/api/decks/${deckId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete deck: ${response.statusText}`);
      }

      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      alert("Deck deleted successfully!");
    } catch (err: any) {
      setError(err.message);
      alert(`Error deleting deck: ${err.message}`);
    }
  };

  if (loadingAuth || isLoading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading decks...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DecksHeader />

      <div className="max-w-7xl mx-auto p-6">
        {decks.length === 0 ? (
          <NoDecks />
        ) : (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  setShowVersionModal={setShowVersionModal}
                  handleDelete={handleDeleteDeck}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {decks.map((deck) => (
                <DeckListItem
                  key={deck.id}
                  deck={deck}
                  selectedDecks={selectedDecks}
                  handleSelectDeck={handleSelectDeck}
                  setShowVersionModal={setShowVersionModal}
                  handleDelete={handleDeleteDeck}
                />
              ))}
            </div>
          )
        )}
      </div>

      {showVersionModal && (() => {
        const deck = decks.find((d) => d.id === showVersionModal);
        if (!deck) return null;
        return (
          <VersionModal
            deck={deck}
            setShowVersionModal={setShowVersionModal}
          />
        );
      })()}
    </div>
  );
};

export default DecksPage;
