import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Setting Up SCSS and Tailwind for Styling
import tailwindcss from "@tailwindcss/vite";
// import autoprefixer from "autoprefixer";
// import postcss from "postcss";

// https://vite.dev/config/
export default defineConfig({
  base: "/merch_io/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    // postcss,
    preprocessorOptions: {
      scss: {
        // Allowing every `scss` file to "see" core.scss automatically
        additionalData: `@use "@/assets/styles/core" as *;`,
      },
    },
  },
});
