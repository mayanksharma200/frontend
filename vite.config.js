import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: "./dist/bundle-analysis.html",
      open: true, // Automatically open the report after build
      gzipSize: true, // Show gzip size in report
      brotliSize: true, // Show brotli size in report
    }),
  ],
  base: "/",
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (
        //     id.includes("node_modules/react") ||
        //     id.includes("node_modules/react-dom")
        //   ) {
        //     return "react-vendor";
        //   }
        //   if (id.includes("node_modules/framer-motion")) {
        //     return "framer-motion";
        //   }
        //   if (id.includes("node_modules/swiper")) {
        //     return "swiper";
        //   }
        //   if (id.includes("node_modules/axios")) {
        //     return "axios";
        //   }
        //   if (id.includes("node_modules/micromark")) {
        //     return "micromark";
        //   }
        //   if (id.includes("node_modules/react-toastify")) {
        //     return "react-toastify";
        //   }
        //   if (id.includes("node_modules/react-router")) {
        //     return "react-router";
        //   }
        //   // fallback vendor chunk for other node_modules
        //   if (id.includes("node_modules")) {
        //     return "vendor";
        //   }
        // },
      },
    },
  },
});
