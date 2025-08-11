import React from "react";
import { useRouter } from "next/navigation";
import DeckIcon from "../../icons/DeckIcon"; // Import DeckIcon directly

const NoDecks = () => {
  const router = useRouter();

  const handleCreateDeck = () => {
    router.push("/"); // Navigate to the home page
  };

  return (
    <div className="text-center py-12">
      <div className="flex justify-center">
        <DeckIcon className="w-24 h-24 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        No decks found
      </h3>
      <button
        onClick={handleCreateDeck}
        className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors mx-auto"
      >
        <span>Create Your First Deck</span>
      </button>
    </div>
  );
};

export default NoDecks;
