// Generates every derived brand asset from the two originals in public/images.
// Re-run with `npm run assets` whenever the logo or photo changes.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const LOGO = "public/images/sultan-saudagar-logo.png";
const PHOTO = "public/images/sultan-saudagar-profile.jpg";
// Background colour sampled from the logo artwork, so crops blend seamlessly.
const BG = { r: 1, g: 6, b: 23, alpha: 1 };

await mkdir("public/brand", { recursive: true });
await mkdir("public/images/profile", { recursive: true });
await mkdir("public/og", { recursive: true });

// --- Logo mark: the "S" symbol cropped from the banner and padded to a square.
const markRect = { left: 488, top: 118, width: 532, height: 422 };
const pad = Math.round((markRect.width - markRect.height) / 2);
const markSquare = await sharp(LOGO)
  .extract(markRect)
  .extend({ top: pad + 24, bottom: pad + 24, left: 24, right: 24, background: BG })
  .png()
  .toBuffer();

for (const size of [64, 128, 256, 512]) {
  await sharp(markSquare).resize(size, size).webp({ quality: 90 }).toFile(`public/brand/mark-${size}.webp`);
}

// Rounded app-icon variants for favicons / home-screen icons.
async function roundedIcon(size, radiusRatio = 0.22) {
  const r = Math.round(size * radiusRatio);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`,
  );
  return sharp(markSquare).resize(size, size).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

await writeFile("src/app/icon.png", await roundedIcon(192));
await writeFile("src/app/apple-icon.png", await sharp(markSquare).resize(180, 180).png().toBuffer());
await writeFile("public/brand/icon-512.png", await sharp(markSquare).resize(512, 512).png().toBuffer());

// favicon.ico: a single 48px PNG wrapped in an ICO container.
const ico48 = await roundedIcon(48);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(48, 6);
header.writeUInt8(48, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(ico48.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("src/app/favicon.ico", Buffer.concat([header, ico48]));

// --- Open Graph image (1200x630) from the full brand banner.
await sharp(LOGO)
  .extract({ left: 0, top: 100, width: 1536, height: 806 })
  .resize(1200, 630)
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/og/og-default.jpg");

// Lightweight full banner for in-page brand use.
await sharp(LOGO).resize(1200).webp({ quality: 88 }).toFile("public/brand/banner-1200.webp");

// --- Portrait: responsive widths, original appearance preserved (resize only).
for (const w of [480, 800, 1200]) {
  await sharp(PHOTO).resize(w).webp({ quality: 84 }).toFile(`public/images/profile/portrait-${w}.webp`);
}
await sharp(PHOTO).resize(1200).jpeg({ quality: 84, mozjpeg: true }).toFile("public/images/profile/portrait-1200.jpg");

// Head-and-shoulders crop for compact placements (footer, contact).
const headCrop = { left: 470, top: 60, width: 600, height: 600 };
for (const w of [160, 320]) {
  await sharp(PHOTO).extract(headCrop).resize(w, w).webp({ quality: 86 }).toFile(`public/images/profile/headshot-${w}.webp`);
}

console.log("Brand assets generated.");
