"use client";
import React, { useState } from "react";

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

  const VersionModal = ({ deck }: { deck: any }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Version History - {deck.title}
            </h3>
            <button
              onClick={() => setShowVersionModal(null)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            ></button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {deck.versions.map((version: any, index: number) => (
              <div
                key={version.version}
                className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index === 0
                        ? "bg-orange-500 text-white"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {version.version.replace("v", "")}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{version.version}</span>
                      {index === 0 && (
                        <span className="text-xs bg-orange-500 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <span>{version.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>
                          {new Date(version.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{version.changes}</p>

                  {index !== 0 && (
                    <div className="flex space-x-2 mt-3">
                      <button className="text-xs bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition-colors">
                        Restore
                      </button>
                      <button className="text-xs bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded transition-colors">
                        Compare
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DeckCard = ({ deck }: { deck: any }) => (
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
            <span>{new Date(deck.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const DeckListItem = ({ deck }: { deck: any }) => (
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
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">My Decks</h1>
        </div>
        <div>
          <p className="text-gray-400 mt-1">
            Create, manage, and collaborate on your presentation decks
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Decks Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {decks.map((deck) => (
              <DeckListItem key={deck.id} deck={deck} />
            ))}
          </div>
        )}

        {/* No Results */}
        {decks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No decks found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors mx-auto">
              <span>Create Your First Deck</span>
            </button>
          </div>
        )}
      </div>

      {/* Version Modal */}
      {showVersionModal && (
        <VersionModal deck={decks.find((d) => d.id === showVersionModal)} />
      )}
    </div>
  );
};

export default DecksPage;
