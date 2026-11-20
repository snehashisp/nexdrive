// Vite settings. Vite turns the TypeScript/JSX in src/ into plain JavaScript the browser can run:
//   npm run dev    -> development server with instant reload at http://nexdrive.localhost:3300
//   npm run build  -> optimised files in dist/, which server.js serves
//   npm test       -> unit tests (Vitest reads the `test` block below)
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // `@/…` imports resolve from src/ (mirrored in tsconfig.json "paths").
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Absolute asset links: every screen has its own URL (/learners/L1…), so relative links would break.
  // To host under a sub-folder, set this to that folder (e.g. '/nexdrive/') and update public/sw.js.
  base: '/',
  build: {
    outDir: 'dist',
    // Bundled JS/CSS go in dist/bundle/ so they don't mix with the static files in public/assets/.
    assetsDir: 'bundle',
  },
  server: {
    port: 3300,
    strictPort: true,
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
