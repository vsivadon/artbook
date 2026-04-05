"use client";

import { useState } from "react";
import Lightbox from "@/components/ui/Lightbox";

import Masonry from "react-masonry-css";
import ArtworkCard from "@/components/ArtworkCard";
import { Artwork } from "@/types/artwork";

const breakpoints = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

export default function MasonryGrid({ artworks }: { artworks: Artwork[] }) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <>
      <Masonry
        breakpointCols={breakpoints}
        className="flex gap-4"
        columnClassName="space-y-4"
      >
        {artworks.map((artwork) => (
          <div key={artwork.id} onClick={() => setSelected(artwork)}>
            <ArtworkCard artwork={artwork} />
          </div>
        ))}
      </Masonry>

      <Lightbox artwork={selected} onClose={() => setSelected(null)} />
    </>
  );
}