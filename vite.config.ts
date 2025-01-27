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
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar advertencias específicas
        if (warning.code === 'UNUSED_EXTERNAL') {
          return; // Ignorar esta advertencia específica
        }
        // Para ignorar todos los demás errores
        warn(warning); // Mostrar advertencia pero continuar el build
      },
    },
    minify: "esbuild",
    sourcemap: false,
  },
});
