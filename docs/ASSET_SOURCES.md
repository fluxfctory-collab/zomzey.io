# Asset sources

## Logo

| Item | Detail |
| --- | --- |
| Asset | Official ZOMZEY header wordmark, white on transparent, 961 × 145px |
| Source | `https://zomzey.io/wp-content/uploads/2026/05/new99.png` (spec source S6) |
| Status | **Not included.** `zomzey.io` is denied by this build environment's network egress policy (HTTP 403 on CONNECT for both shell and fetch tools), and no approved local copy was supplied |
| What the build shows | A dashed slot with the logo's exact 961:145 proportions, labelled "Official logo file", with the accessible name "ZOMZEY". No invented, retyped or reconstructed mark |
| Drop-in | Save the original file unchanged as `public/brand/zomzey-logo.png`, then run `npm run build && npm run export`. `vite.config.ts` detects the file and `BrandLogo` renders it in the header and footer at 158px (138px below 1024px) |
| Usage rules | Navy backgrounds only; never recoloured, rotated, animated or placed on paper (see `STYLE_GUIDE.md`) |

## Font

| Item | Detail |
| --- | --- |
| Family | Instrument Sans (variable, weight 400–700), matching the font loaded globally by the current zomzey.io homepage |
| Package | `@fontsource-variable/instrument-sans@5.3.0` (npm), self-hosted, with the Latin subset preloaded |
| Licence | SIL Open Font License 1.1. Copy kept at `public/fonts/InstrumentSans-OFL.txt`. Upstream: https://github.com/google/fonts/blob/main/ofl/instrumentsans/OFL.txt |

## Photographs

All 18 photographs come from the **Open Images Dataset V7** (Google), which lists each image as **CC BY 2.0** and records the original Flickr page and author. They were downloaded from the dataset's public mirror (`open-images-dataset.s3.amazonaws.com`) by `scripts/prepare-images.mjs`, which applies EXIF orientation and writes WebP files at 160, 320, 640 and 960px widths. Nothing else was edited; crops use CSS `object-position` only. The usual stock hosts (Unsplash, Pexels, Wikimedia, Pixabay) and Flickr itself were blocked by the network policy.

Attribution is shown in the prototype through **Photo credits** in the footer, and in each example dialog ("Illustrative photo: author, CC BY 2.0").

| Slug | Used for | Title (Flickr) | Author | Open Images ID |
| --- | --- | --- | --- | --- |
| `book-pages` | Books project ticket (opening, mobile story); debut-novel opportunity | [Libro](https://www.flickr.com/photos/bluefever/2547557832) | ' PaiO | `4ffd4d6f3d12253b` |
| `reading-aloud` | Books project in the relationship story | [me reading a book](https://www.flickr.com/photos/jimlandover3/3657781806) | Jim.landover3 | `b0670fed268da345` |
| `reader-park` | Book reviewer (opening, story, explorer) | [reading politics](https://www.flickr.com/photos/visual_dichotomy/4240056336) | Grant | `8c0456e241bda30f` |
| `bookshop` | Independent bookshop (opening, story, explorer, picture-book opportunity) | [Last day in Davis square](https://www.flickr.com/photos/mellis/2373450535) | David Mellis | `a09ff3a4b88d6f97` |
| `reading-group` | Reading community (opening, mobile story) | [Beijing 19](https://www.flickr.com/photos/ronmacphotos/4941706006) | Ronnie Macdonald | `801a22eb361e3623` |
| `potter-hands` | Products project; ceramics opportunity | [IMG_0459](https://www.flickr.com/photos/gregcutler/1427768969) | greckor | `b9947bfa672b8742` |
| `creator-desk` | Home-studio creator; kitchen-demo opportunity | [Untitled](https://www.flickr.com/photos/johanl/8289365270) | Johan Larsson | `00a36f96e31731c4` |
| `indie-shop` | Independent retailer | [Vintage!](https://www.flickr.com/photos/linznicholson/4361464257) | Lindsey Nicholson | `3e7b262c786a139f` |
| `craft-market` | Makers' market (opening, explorer) | [Thai Pottery](https://www.flickr.com/photos/lollyknit/688514866) | LollyKnit | `defc1ce61d5afdfb` |
| `guitarist` | Music project; folk EP opportunity | [Sound Check](https://www.flickr.com/photos/powerbooktrance/457354973) | Terry Johnston | `d419f0ef5d53ee43` |
| `home-studio` | Music creator | [Keys8](https://www.flickr.com/photos/riverdog/16558260/) | bkRiverdog | `def215709bcd2bd6` |
| `small-venue` | Small venue (opening, explorer) | [Red Stage](https://www.flickr.com/photos/bfishadow/3144319914) | bfishadow | `9d1ccb1c2bbc0e50` |
| `gig-crowd` | Fan community | [Roses](https://www.flickr.com/photos/52188855@N05/8021257866) | Samuel Breen | `cc2054ffe6092c88` |
| `phone-app` | Apps project; study-app opportunity | [Doodle Jumper](https://www.flickr.com/photos/carbonnyc/4581311847) | David Goehring | `043f3655deab6e7c` |
| `tech-podcast` | Tech reviewer (opening, explorer) | [Los Content Curators | Presentación del libro](https://www.flickr.com/photos/catorze/11690374424) | Javier Leiva | `ff913093c0fb6898` |
| `workshop` | Workshop educator | [spice corps montreal 2](https://www.flickr.com/photos/evablue/5738800135) | Eva Blue | `e18f8379d3e272b5` |
| `meetup` | Niche community | [LadyHacks 2014](https://www.flickr.com/photos/oh_you/13042451783) | corinnepw | `1e471949af0ac2f5` |
| `agency-meeting` | Talent agency example (explorer) | [Untitled](https://www.flickr.com/photos/dr_po/8958641373/) | P.O. Arnäs | `5a6ba94604bb2cd0` |

Licence: https://creativecommons.org/licenses/by/2.0/

### Usage notes and limits

- **Licence verification:** Open Images states that it lists these images as CC BY 2.0 but makes no warranty about each image's licence status. The licences could not be re-checked on Flickr from this environment. Before any production or public use, verify each licence on its Flickr page, or replace the images with commissioned or licensed photography.
- **People:** CC BY covers copyright, not model releases. Every person shown illustrates a scenario. Each is labelled as an example and is never presented as a ZOMZEY member, reviewer or endorser. For production, use released photography.
- **Excluded during selection:** images whose titles name public figures or named acts (for example Joe Lansdale, Larry Nesper, Catalina Botero Marino, "Jon Langford and His Sadies", "Kristina Morales & Bayou Shufflers"), watermarked images, and images dominated by third-party brand logos.

## Icons and graphics

- Interface icons (menu, close, search, chevron, external, filters) are simple inline SVG paths written for this project (`src/components/Icon.tsx`).
- Routes, ports and dot halos are generated SVG (`src/lib/routes.ts`); no third-party illustration.
