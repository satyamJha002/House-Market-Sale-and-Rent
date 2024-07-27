import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  // …
  plugins: [
    react(),
    svgr(),
    legacy({ targets: [">0.2%", "not dead", "not op_mini all"] }),
  ],
});
