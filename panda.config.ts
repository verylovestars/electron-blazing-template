import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  globalCss: {
    html: {
      '--global-font-body': 'Inter, sans-serif',
    }
  },
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/renderer/**/*.{js,jsx,ts,tsx}",
    "./src/renderer/pages/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "./src/renderer/shared/styled-system",
  outExtension: "js",
  forceConsistentTypeExtension: true,
});
