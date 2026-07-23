import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// Two modes from one config:
// - `vite`       (serve): runs the demo app in ./demo
// - `vite build` (build): builds the library from ./src into ./dist
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: "demo",
      plugins: [react()],
    };
  }

  return {
    plugins: [react(), dts({ include: ["src"], rollupTypes: true })],
    build: {
      cssCodeSplit: false,
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "ReactMorphCharts",
        fileName: (format) =>
          `react-morph-charts.${format === "es" ? "js" : "cjs"}`,
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          exports: "named",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
