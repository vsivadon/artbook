"use client";

import { Artwork } from "@/types/artwork";
import ZoomableImage from "@/components/ui/ZoomableImage";

export default function Lightbox({
  artwork,
  onClose,
}: {
  artwork: Artwork | null;
  onClose: () => void;
}) {
  if (!artwork) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="flex flex-col items-center">

        <div onClick={(e) => e.stopPropagation()}>
          <ZoomableImage
            src={artwork.image}
            alt={artwork.title}
          />
        </div>

        {/* 👇 Texte (optionnel : peut fermer ou non selon ton choix) */}
        <div className="mt-4 text-white text-center px-4">
          <h2 className="text-xl font-semibold">{artwork.title}</h2>
          <p className="text-zinc-400">{artwork.artist}</p>
        </div>

      </div>
    </div>
  );
}