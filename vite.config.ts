import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(process.cwd(), "src/index.ts"),
      name: "CommonProps",
      fileName: "index",
      formats: ["es"]
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    dts({
      include: ["src/**/*.ts"],
      exclude: ["tests/**/*.ts"],
      entryRoot: "src",
    }),
  ],
  test: {
    globals: false,
    environment: "node",
  },
});
