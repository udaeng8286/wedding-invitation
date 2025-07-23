import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: [
      "primevue/resources/themes/lara-light-indigo/theme.css",
      "primevue/resources/primevue.min.css",
      "primeicons/primeicons.css",
    ],
  },
});
