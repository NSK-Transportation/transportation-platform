import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const resolvePath = (p: string) => path.resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
      "@ui": resolvePath("./src/shared/ui"),
      "@api": resolvePath("./src/shared/api"),
      "@icons": resolvePath("./src/shared/assets/icons"),
      "@utils": resolvePath("./src/shared/utils"),
      "@hooks": resolvePath("./src/shared/hooks"),
      "@consts": resolvePath("./src/shared/consts"),
    },
  },
});
