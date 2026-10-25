/**
 * Build-time image optimisation.
 *
 * Originals live in content-audit/raw/images/ (archived, unmodified, for
 * traceability). This script emits WebP derivatives into public/media/.
 *
 * Run: npm run optimize-images
 */
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("content-audit/raw/images");
const OUT = path.resolve("public/media");

const PORTRAITS = new Set([
  "rois.jpg", "mahir.jfif", "shoukhin.jpg", "athin.jpg", "yeahyea.jpeg",
  "mathin.jpeg", "salman.jpg", "adipta.jfif", "nazmul.jpg", "usha.jpg",
  "simi.jpeg", "illin.jpg", "ifti.jpg", "saad.jpg", "sokanto.jpeg",
  "abul-kashem-VC-UIU.jpg", "Dr.-Hasan-Sarwar.jpg", "abid.jpg",
]);

const LOGOS = new Set([
  "umrt_logo.png", "urrt_text.png", "aboutuslogo.png", "robot.png",
  "uiu-logo.png", "cair-logo.png", "solidworks-logo.png",
  "protospace-logo.png", "Dassauly-systemes-logo.png", "DFRobot-logo.png",
  "daily-star-logo.png", "Prothom_Alo_logo.svg.png",
  "the-business-standard-logo-02.png",
]);

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function run() {
  await mkdir(OUT, { recursive: true });
  const files = await readdir(SRC);

  let before = 0;
  let after = 0;
  const rows = [];

  for (const file of files) {
    const inPath = path.join(SRC, file);
    const info = await stat(inPath);
    if (!info.isFile()) continue;

    const stem = path.parse(file).name;
    const outPath = path.join(OUT, `${stem}.webp`);

    let pipeline = sharp(inPath, { failOn: "none" });

    if (PORTRAITS.has(file)) {
      pipeline = pipeline
        .resize({ width: 640, height: 800, fit: "cover", position: "attention" })
        .webp({ quality: 80 });
    } else if (LOGOS.has(file)) {
      pipeline = pipeline
        .resize({ width: 480, height: 480, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 90, alphaQuality: 100 });
    } else {
      pipeline = pipeline
        .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 });
    }

    const buf = await pipeline.toBuffer();
    await writeFile(outPath, buf);

    before += info.size;
    after += buf.length;
    rows.push([file, kb(info.size), kb(buf.length)]);
  }

  rows.sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  for (const [f, b, a] of rows) {
    console.log(`${f.padEnd(34)} ${b.padStart(9)} -> ${a.padStart(9)}`);
  }
  console.log(
    `\n${rows.length} images: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB ` +
      `(${(100 - (after / before) * 100).toFixed(0)}% reduction)`,
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
