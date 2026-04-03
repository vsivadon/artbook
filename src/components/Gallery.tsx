"use client";

import { useState } from "react";
import MasonryGrid from "@/components/MasonryGrid";
import { Artwork } from "@/types/artwork";
import TagSelect from "@/components/ui/TagSelect";

export default function Gallery({ artworks }: { artworks: Artwork[] }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState<"none" | "year-asc" | "year-desc">("none");

  const [filters, setFilters] = useState<{
    tags: string[];
    rating: number | null;
  }>({
    tags: [],
    rating: null,
  });

  // 🔍 + 🎛️ FILTRAGE
  const filtered = artworks.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.artist.toLowerCase().includes(search.toLowerCase()) ||
      art.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => art.tags.includes(tag));

    const matchesRating =
      !filters.rating || art.rating >= filters.rating;

    return matchesSearch && matchesTags && matchesRating;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "year-asc") {
      return (a.year || 0) - (b.year || 0);
    }
    if (sort === "year-desc") {
      return (b.year || 0) - (a.year || 0);
    }
    return 0;
  });

  const allTags = Array.from(new Set(artworks.flatMap((a) => a.tags)));

  return (
    <div className="relative">
      {/* 🔘 BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 px-4 py-2 bg-white text-black rounded-full shadow-lg z-30"
      >
        Filters
      </button>

      {/* 🌫️ OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🎛️ SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-zinc-900 p-6 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* CLOSE */}
        <button
          onClick={() => setIsOpen(false)}
          className="mb-4 text-sm text-zinc-400"
        >
          Close ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-white">
          Filters
        </h2>

        <div className="mb-6">
          <p className="text-sm mb-2 text-zinc-400">Tags</p>

          <TagSelect
            options={allTags}
            selected={filters.tags}
            onChange={(tags) =>
              setFilters((prev) => ({
                ...prev,
                tags,
              }))
            }
          />
        </div>

        {/* RATING */}
        <div className="mb-6">
          <p className="text-sm mb-2 text-zinc-400">Rating</p>
          <div className="flex gap-2">
            {[5, 4, 3].map((r) => (
              <button
                key={r}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    rating: prev.rating === r ? null : r,
                  }))
                }
                className={`px-2 py-1 rounded text-xs ${
                  filters.rating === r
                    ? "bg-white text-black"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                ⭐ {r}+
              </button>
            ))}
          </div>
        </div>

        {/* RESET */}
        <button
          onClick={() => {
            setFilters({ tags: [], rating: null });
            setSearch("");
          }}
          className="mt-4 px-3 py-2 bg-red-500 text-white rounded text-sm"
        >
          Reset filters
        </button>

      <div className="mb-6">
        <p className="text-sm mb-2 text-zinc-400">Sort by</p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setSort("year-desc")}
            className={`px-2 py-1 rounded text-xs ${
              sort === "year-desc"
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-300"
            }`}
          >
            Newest first
          </button>

          <button
            onClick={() => setSort("year-asc")}
            className={`px-2 py-1 rounded text-xs ${
              sort === "year-asc"
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-300"
            }`}
          >
            Oldest first
          </button>

          <button
            onClick={() => setSort("none")}
            className="px-2 py-1 rounded text-xs bg-zinc-700 text-zinc-300"
          >
            Default
          </button>
        </div>
      </div>

      </aside>

      {/* 🖼️ MAIN CONTENT */}
      <div className="p-6">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search artworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-zinc-900 text-white outline-none"
        />

        {/* COUNT */}
        <p className="mb-4 text-sm text-zinc-400">
          {filtered.length} artworks
        </p>

        {/* GALLERY */}
        <MasonryGrid artworks={sorted} />
      </div>
    </div>
  );
}