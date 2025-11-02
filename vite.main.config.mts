import { builtinModules, createRequire } from "node:module";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const require = createRequire(import.meta.url);
const { dependencies = {} } = require("./package.json") as {
  dependencies?: Record<string, string>;
};

const externalPackages = [
  "electron",
  ...Object.keys(dependencies),
  ...builtinModules,
  ...builtinModules.map((moduleId) => `node:${moduleId}`),
];

// https://vitejs.dev/config
export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.main.json"] })],
  publicDir: false,
  build: {
    outDir: ".vite/build",
    emptyOutDir: false,
    sourcemap: true,
    minify: false,
    target: "node20",
    lib: {
      entry: "src/main/index.ts",
      formats: ["es"] as const,
    },
    rollupOptions: {
      external: externalPackages,
      output: {
        entryFileNames: "main.js",
      },
    },
  },
  optimizeDeps: {
    include: ["reflect-metadata"],
  },
});
