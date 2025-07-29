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
          style={{ background: deck.thumbnail }}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-white">{deck.title}</h3>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>{deck.slideCount} slides</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{new Date(deck.lastModified).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-3 line-clamp-1">
            {deck.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowVersionModal(deck.id)}
                className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-400 transition-colors"
              >
                <span>{deck.currentVersion}</span>
              </button>

              {deck.collaborators.length > 0 && (
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-400">
                    {deck.collaborators.length} collaborators
                  </span>
                </div>
              )}
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
