// export default function Stars({ rating }: { rating: number }) {
//   return (
//     <div>
//       {Array.from({ length: 5 }).map((_, i) => {
//         if (rating >= i + 1) return <span key={i}>★</span>;
//         if (rating >= i + 0.5) return <span key={i}>⯪</span>;
//         return <span key={i}>☆</span>;
//       })}
//     </div>
//   );
// }

import { Star } from "lucide-react";

export default function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = rating >= i + 1;
        const half = rating >= i + 0.5 && rating < i + 1;

        return (
          <div key={i} className="relative w-4 h-4">
            {/* étoile vide */}
            <Star className="text-zinc-600 absolute" size={16} />

            {/* étoile pleine */}
            {full && (
              <Star className="text-yellow-400 fill-yellow-400 absolute" size={16} />
            )}

            {/* demi étoile */}
            {half && (
              <div className="absolute overflow-hidden w-1/2">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}