import React from "react";
import Link from "next/link";
import { Deck } from "../[deckId]/types";

const DeckListItem = ({
  deck,
  selectedDecks,
  handleSelectDeck,
  setShowVersionModal,
}: {
  deck: Deck;
  selectedDecks: number[];
  handleSelectDeck: (id: number) => void;
  setShowVersionModal: (id: number | null) => void;
}) => (
  <Link href={`/decks/${deck.id}`}>
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 hover:border-orange-500 transition-all duration-300">
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={selectedDecks.includes(deck.id)}
          onChange={() => handleSelectDeck(deck.id)}
          className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
        />

        {/* Thumbnail */}
        <div
          className="w-16 h-16 rounded-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-white">{deck.title}</h3>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>{deck.slides?.length || 0} slides</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Last Modified: N/A</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-3 line-clamp-1">
            {/* No description available from backend yet */}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowVersionModal(deck.id)}
                className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-400 transition-colors"
              >
                <span>View Versions</span>
              </button>

              {/* No collaborators available from backend yet */}
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"></button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"></button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"></button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default DeckListItem;