import React from "react";

const TemplateCard = ({ template }: { template: { title: string, description: string, thumbnail: string, tags: string[] } }) => (
  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500 transition-all duration-300 group">
    {/* Thumbnail */}
    <div className="h-48 relative" style={{ background: template.thumbnail }}>
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div>
    </div>

    {/* Content */}
    <div className="p-5">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors">
          {template.title}
        </h3>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {template.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {template.tags.slice(0, 3).map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default TemplateCard;
