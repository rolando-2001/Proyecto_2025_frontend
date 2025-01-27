import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: '0.0.0.0', // Escuchar en todas las direcciones
    port: process.env.PORT || 5173,  // Puerto dinámico si no se asigna otro
  },
});
