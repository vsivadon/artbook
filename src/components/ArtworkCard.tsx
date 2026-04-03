import Image from "next/image";
import { Artwork } from "@/types/artwork";
import { artworkCardStyles as styles } from "./artworkCardStyles";
import Stars from "./ui/Stars";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <article className={styles.card}>
      <Image
        src={artwork.image}
        alt={artwork.title}
        width={500}
        height={500}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>{artwork.title}</h2>
        <p className={styles.artist}>{artwork.artist}</p>

        {artwork.year && (
          <p className={styles.year}>{artwork.year}</p>
        )}

        <Stars rating={artwork.rating} />

        <div className={styles.tagsContainer}>
          {artwork.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {artwork.notes && (
          <p className={styles.notes}>{artwork.notes}</p>
        )}
      </div>
    </article>
  );
}