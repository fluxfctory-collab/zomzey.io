import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Preload the one font file the opening needs (Latin, variable weight).
const preloadFont = (): Plugin => ({
  name: 'preload-instrument-sans',
  apply: 'build',
  transformIndexHtml(html, ctx) {
    const file = Object.keys(ctx.bundle ?? {}).find((f) => /instrument-sans-latin-wght-normal.*\.woff2$/.test(f))
    if (!file) return html
    return {
      html,
      tags: [{ tag: 'link', attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' }, injectTo: 'head' }],
    }
  },
})

export default defineConfig({
  plugins: [react(), preloadFont()],
  build: {
    rollupOptions: {
      // The homepage, plus a living style guide rendered from the same tokens and components.
      input: {
        main: new URL('./index.html', import.meta.url).pathname,
        styleguide: new URL('./styleguide.html', import.meta.url).pathname,
      },
    },
  },
})
