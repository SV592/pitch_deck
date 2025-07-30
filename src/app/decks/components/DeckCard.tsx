import React from "react";
import Link from "next/link";
import { Deck } from "../[deckId]/types";

const DeckCard = ({
  deck,
  setShowVersionModal,
}: {
  deck: Deck;
  setShowVersionModal: (id: number | null) => void;
}) => (
  <Link href={`/decks/${deck.id}`}>
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500 transition-all duration-300 group">
      {/* Thumbnail */}
      <div
        className="h-48 relative cursor-pointer"
        style={{ background: deck.thumbnail }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"></button>
            <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"></button>
            <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"></button>
          </div>
        </div>

        {/* Slide Count */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-1 bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs text-white">
            {/* <FileText className="w-3 h-3" /> */}
            <span>{deck.slideCount} slides</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors line-clamp-2">
            {deck.title}
          </h3>
          <div className="relative">
            <button className="p-1 hover:bg-gray-700 rounded transition-colors"></button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {deck.description}
        </p>

        {/* Version Info */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowVersionModal(deck.id)}
            className="flex items-center space-x-1 text-sm text-orange-500 hover:text-orange-400 transition-colors"
          >
            <span>{deck.currentVersion}</span>
          </button>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <span>{deck.lastModified ? new Date(deck.lastModified).toLocaleDateString() : ''}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default DeckCard;
