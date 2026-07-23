import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds the static demo site (./demo) into ./docs, e.g. for GitHub Pages.
// Inlined into a single HTML file (no separate <script type="module"> src)
// so it also works when opened directly from disk via file://, where
// browsers block loading external ES modules.
export default defineConfig({
  root: "demo",
  base: "./",
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
  },
});
