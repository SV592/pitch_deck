"use client";
import React, { useState } from "react";

const TemplatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "All Templates", count: 156 },
    { id: "writing", name: "Writing", count: 32 },
    { id: "marketing", name: "Marketing", count: 28 },
    { id: "coding", name: "Coding", count: 24 },
    { id: "design", name: "Design", count: 19 },
    { id: "email", name: "Email", count: 16 },
    { id: "presentation", name: "Presentation", count: 15 },
    { id: "education", name: "Education", count: 12 },
    { id: "business", name: "Business", count: 10 },
  ];

  const templates = [
    {
      id: 1,
      title: "Blog Post Generator",
      description:
        "Create engaging blog posts with AI assistance. Perfect for content creators and marketers.",
      category: "writing",
      author: "MindMerge Team",
      rating: 4.8,
      downloads: 2847,
      views: 12450,
      isPro: false,
      isFavorite: true,
      createdAt: "2024-01-15",
      tags: ["Content", "SEO", "Marketing"],
      thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "Email Campaign Builder",
      description:
        "Design professional email campaigns that convert. Includes A/B testing suggestions.",
      category: "email",
      author: "Sarah Chen",
      rating: 4.9,
      downloads: 1923,
      views: 8765,
      isPro: true,
      isFavorite: false,
      createdAt: "2024-01-10",
      tags: ["Email", "Marketing", "Conversion"],
      thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "Code Documentation",
      description:
        "Generate comprehensive documentation for your code projects automatically.",
      category: "coding",
      author: "Alex Rodriguez",
      rating: 4.7,
      downloads: 3156,
      views: 15230,
      isPro: false,
      isFavorite: true,
      createdAt: "2024-01-08",
      tags: ["Documentation", "Development", "API"],
      thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: 4,
      title: "Social Media Posts",
      description:
        "Create engaging social media content for multiple platforms with one template.",
      category: "marketing",
      author: "Marketing Pro",
      rating: 4.6,
      downloads: 4521,
      views: 18940,
      isPro: true,
      isFavorite: false,
      createdAt: "2024-01-05",
      tags: ["Social Media", "Content", "Engagement"],
      thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      id: 5,
      title: "Presentation Outline",
      description:
        "Structure compelling presentations with AI-powered outlines and talking points.",
      category: "presentation",
      author: "Presentation Expert",
      rating: 4.5,
      downloads: 1876,
      views: 7432,
      isPro: false,
      isFavorite: true,
      createdAt: "2024-01-03",
      tags: ["Presentation", "Business", "Speaking"],
      thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
    {
      id: 6,
      title: "UI Component Generator",
      description:
        "Generate React components with TypeScript and Tailwind CSS styling.",
      category: "coding",
      author: "Dev Tools",
      rating: 4.9,
      downloads: 2134,
      views: 9876,
      isPro: true,
      isFavorite: false,
      createdAt: "2024-01-01",
      tags: ["React", "TypeScript", "UI"],
      thumbnail: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    },
  ];

  const sortedTemplates = [...templates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const TemplateCard = ({ template }: { template: any }) => (
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Templates</h1>
            <p className="text-gray-400 mt-1">
              Discover and use AI-powered templates to boost your productivity
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="text-xs opacity-75">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Templates Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTemplates.map((template) => (
                  <TemplateListItem key={template.id} template={template} />
                ))}
              </div>
            )}

            {/* No Results */}
            {sortedTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* <Search className="w-12 h-12 text-gray-600" /> */}
                </div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No templates found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
