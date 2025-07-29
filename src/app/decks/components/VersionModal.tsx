import React from "react";
import { Deck, Version } from "../[deckId]/types";

const VersionModal = ({
  deck,
  setShowVersionModal,
}: {
  deck: Deck;
  setShowVersionModal: (id: number | null) => void;
}) => (
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
          {deck.versions.map((version: Version, index: number) => (
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
                      <span>{new Date(version.date).toLocaleDateString()}</span>
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

export default VersionModal;