"use client";

import Masonry from "react-masonry-css";
import ArtworkCard from "@/components/ArtworkCard";
import { Artwork } from "@/types/artwork";

const breakpoints = {
  default: 4,
  1024: 3,
  768: 2,
  500: 1,
};

export default function MasonryGrid({ artworks }: { artworks: Artwork[] }) {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-6"
      columnClassName="space-y-6"
    >
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </Masonry>
  );
}