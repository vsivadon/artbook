"use client";

import { useState, useRef, useEffect } from "react";

export default function TagSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((tag) =>
    tag.toLowerCase().includes(query.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* INPUT */}
      <div
        className="bg-zinc-800 rounded-lg p-2 flex flex-wrap gap-2 cursor-text"
        onClick={() => setOpen(true)}
      >
        {selected.map((tag) => (
          <span
            key={tag}
            onClick={(e) => {
              e.stopPropagation();
              toggleTag(tag);
            }}
            className="bg-white text-black px-2 py-1 rounded text-xs cursor-pointer"
          >
            {tag} ✕
          </span>
        ))}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tags..."
          className="bg-transparent outline-none text-sm text-white"
        />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full bg-zinc-900 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
          {filtered.map((tag) => (
            <div
              key={tag}
              onClick={() => toggleTag(tag)}
              className="px-3 py-2 hover:bg-zinc-800 cursor-pointer text-sm text-white"
            >
              {selected.includes(tag) ? "✓ " : ""}{tag}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-3 py-2 text-zinc-500 text-sm">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  );
}