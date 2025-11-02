import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import autoprefixer from 'autoprefixer'
const projectRootDir = path.dirname(fileURLToPath(import.meta.url));

import pandacss from '@pandacss/dev/postcss'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
    
    tsconfigPaths({ projects: ["./tsconfig.renderer.json"] }),
  ],
  envPrefix: ["RENDERER_", "VITE_"],
  resolve: {
    alias: {
      "@renderer": path.resolve(projectRootDir, "src/renderer"),
      "@": path.resolve(projectRootDir, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: path.resolve(projectRootDir, ".vite/renderer/main_window"),
    sourcemap: true,
    target: "es2022",
    rollupOptions: {
      input: path.resolve(projectRootDir, "index.html"),
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
  optimizeDeps: {
    include: ["reflect-metadata", "react", "react-dom", "mobx-react-lite"],
    esbuildOptions: {
      jsx: "automatic",
    },
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [pandacss(), autoprefixer]
    }
  },
  clearScreen: false,
});

