"use client";
import React, { useState } from "react";
import TemplateHeader from "./components/TemplateHeader";
import CategoriesSidebar from "./components/CategoriesSidebar";
import TemplateCard from "./components/TemplateCard";
import TemplateListItem from "./components/TemplateListItem";
import NoResults from "./components/NoResults";

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TemplateHeader />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="flex-1">
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

            {sortedTemplates.length === 0 && <NoResults />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
