import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }), // This generates .d.ts files
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UniversalTimePicker",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
  server: {
    port: 5174,
    strictPort: false,
    open: true,
  },
});
