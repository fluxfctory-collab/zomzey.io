// Writes the duotone "reach" photographs used by the opening's LED wall.
// Each source photo (already prepared by prepare-images.mjs) is mapped through a three-stop
// gradient: navy shadows → the reach colour → a pale tint of it. Nothing is downloaded.
// Usage: npm run images:reach
import { mkdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'public', 'images')
const outDir = join(root, 'public', 'images', 'reach')
const widths = [160, 320, 640, 960] // 160 feeds the blurred colour spill only

// Observed identity colours (tokens.css): navy plus the four colours the opening assigns
// to followers, footfall, fans and audience.
const NAVY = [0, 2, 34]
const panels = [
  { id: 'followers', slug: 'tech-podcast', colour: '#ff6600' },
  { id: 'footfall', slug: 'bookshop', colour: '#ffd42e' },
  { id: 'fans', slug: 'gig-crowd', colour: '#20e3a2' },
  { id: 'audience', slug: 'workshop', colour: '#1fa9ff' },
]

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t)

/** 256-entry lookup: shadows stay navy, mid-tones take the colour, highlights a pale tint. */
function gradientMap(hex) {
  const colour = rgb(hex)
  const pale = mix(colour, [255, 255, 255], 0.72)
  const lut = new Uint8Array(256 * 3)
  for (let i = 0; i < 256; i++) {
    const t = i / 255
    const c = t < 0.58 ? mix(NAVY, colour, t / 0.58) : mix(colour, pale, (t - 0.58) / 0.42)
    lut.set(c.map((v) => Math.round(Math.min(255, Math.max(0, v)))), i * 3)
  }
  return lut
}

await mkdir(outDir, { recursive: true })
const manifest = JSON.parse(await readFile(join(root, 'scripts', 'images.manifest.json'), 'utf8'))
const known = new Set(manifest.images.map((i) => i.slug))

for (const panel of panels) {
  if (!known.has(panel.slug)) throw new Error(`Unknown source photo ${panel.slug}`)
  // Greyscale with a 1% / 99% stretch, so every panel uses the full tonal range.
  const grey = sharp(join(srcDir, `${panel.slug}-960.webp`)).greyscale().normalise({ lower: 1, upper: 99 })
  const { data, info } = await grey.raw().toBuffer({ resolveWithObject: true })
  const lut = gradientMap(panel.colour)
  const out = Buffer.alloc(info.width * info.height * 3)
  for (let i = 0; i < info.width * info.height; i++) {
    const v = data[i * info.channels]
    out[i * 3] = lut[v * 3]
    out[i * 3 + 1] = lut[v * 3 + 1]
    out[i * 3 + 2] = lut[v * 3 + 2]
  }
  const toned = sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  for (const w of widths) {
    await toned
      .clone()
      .resize({ width: Math.min(w, info.width) })
      .webp({ quality: 78, effort: 6 })
      .toFile(join(outDir, `${panel.id}-${w}.webp`))
  }
  console.log(`✓ ${panel.id} ← ${panel.slug} (${info.width}×${info.height})`)
}
