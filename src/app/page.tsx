import fs from "fs";
import path from "path";
import YAML from "yaml";
import { Artwork } from "@/types/artwork";
import ArtworkCard from "@/components/ArtworkCard";
import MasonryGrid from "@/components/MasonryGrid";


function getArtworks(): Omit<Artwork, "id">[] {
  const filePath = path.join(process.cwd(), "public", "artworks.yaml");
  const file = fs.readFileSync(filePath, "utf8");
  return YAML.parse(file);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}



export default function Home() {
  const artworks: Artwork[] = getArtworks().map((art) => ({
    ...art,
    id: slugify(art.title + "-" + art.artist),
  }));

  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Art Gallery</h1>

      <MasonryGrid artworks={artworks} />

    </main>
  );
}