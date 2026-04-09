import path from "path";
import { Artwork } from "@/types/artwork";
import Gallery from "@/components/Gallery";

import ExcelJS from "exceljs";


// function getArtworks(): Omit<Artwork, "id">[] {
//   const filePath = path.join(process.cwd(), "public", "artworks.yaml");
//   const file = fs.readFileSync(filePath, "utf8");
//   return YAML.parse(file);
// }

async function getArtworks(): Promise<Omit<Artwork, "id">[]> {
  const filePath = path.join(process.cwd(), "public", "artworks.xlsx");

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const sheet = workbook.worksheets[0];

  const rows: Omit<Artwork, "id">[] = [];

  const headerRow = sheet.getRow(1);
  const headers: Record<string, number> = {};
  headerRow.eachCell((cell, colNumber) => {
    headers[String(cell.value).toLowerCase().trim()] = colNumber;
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const cellValue = row.getCell(headers.image).value;
    let image_path;
    if (cellValue?.toString().startsWith("https")) {
      image_path = String(cellValue);
    } else {
      image_path = "/images/" + String(cellValue ?? "");
    }

    rows.push({
      title: String(row.getCell(headers.title).value ?? ""),
      artist: String(row.getCell(headers.artist).value ?? ""),
      year: Number(row.getCell(headers.year).value) || 0,
      rating: Number(row.getCell(headers.rating).value) || 0,
      tags: String(row.getCell(headers.tags).value ?? "")
        .split(",")
        .map((t) => t.trim()),
      notes: String(row.getCell(headers.notes).value ?? ""),
      image: image_path,
    });
  });

  return rows;
}


function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default async function Home() {
  const artworks: Artwork[] = (await getArtworks()).map((art) => ({
    ...art,
    id: slugify(art.title + "-" + art.artist),
  }));

  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Art Gallery</h1>

      <Gallery artworks={artworks} />

    </main>
  );
}