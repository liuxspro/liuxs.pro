import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/js/main.js"],
  splitting: false,
  format: ["cjs"],
  // Generate declaration file
  dts: false,
  // Clean output directory before each build
  clean: true,
  outDir: "static/js",
});
