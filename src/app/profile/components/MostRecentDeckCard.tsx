import React from "react";
import Link from "next/link";

const timeAgo = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export default function MostRecentDeckCard({ deck }) {
  if (!deck) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg">
      <h4 className="text-lg font-semibold mb-3">Last Deck Worked On</h4>
      <div className="bg-gray-700/50 p-4 rounded-lg flex items-center justify-between">
        <div>
          <p className="font-semibold text-white">{deck.title}</p>
          <p className="text-sm text-gray-400">
            Updated {timeAgo(deck.updatedAt)}
          </p>
        </div>
        <Link
          href={`/decks/${deck.id}`}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-white"
        >
          <span>Open</span>
        </Link>
      </div>
    </div>
  );
}
