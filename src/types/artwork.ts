export type Artwork = {
  id: string;
  title: string;
  artist: string;
  year?: number;
  image: string;
  tags: string[];
  rating: number;
  notes?: string;
};