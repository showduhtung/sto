import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { viteStaticCopy as copy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./server"),
    },
  },
  // copy({
  //   targets: [
  //     { src: 'data/*', dest: 'data' },
  //     { src: 'src/assets/*', dest: 'src/assets' },
  //   ],
  // }),
});
