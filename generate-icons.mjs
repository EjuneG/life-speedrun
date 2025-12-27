import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [
  { size: 192, name: 'pwa-192x192.png' },
  { size: 512, name: 'pwa-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 16, name: 'favicon-16x16.png' }
];

async function generateIcons() {
  const inputPath = join(__dirname, 'icon', 'life-speedrun-icon.png');
  const outputDir = join(__dirname, 'public');

  console.log('Generating PWA icons...\n');

  for (const { size, name } of sizes) {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 10, g: 10, b: 10, alpha: 1 }
      })
      .toFile(join(outputDir, name));

    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
