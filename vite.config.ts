import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    hmr: true,
    watch: {
      usePolling: false,
    },
    port: 5173,
  },
  plugins: [
    react({
      babel: {
        plugins: [],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    // Remove outDir to use the default behavior
    // This will output files relative to the input structure
    sourcemap: true,
    emptyOutDir: false, // Don't clear the directory on build
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});