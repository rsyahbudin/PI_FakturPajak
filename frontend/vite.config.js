import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Adjust the path based on your actual project structure
    },
  },
  server: {
    middlewareMode: true,
    // Middleware function to disable caching
    middleware: (app) => {
      app.use((req, res, next) => {
        // Disable caching
        res.setHeader('Cache-Control', 'no-store');
        next();
      });
    },
  },
});
