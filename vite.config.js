import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const env = dotenv.config().parsed;

  return {
    base: isProduction ? "/" : "/",
    plugins: [react()],
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        env?.VITE_API_BASE_URL || "http://localhost:3000"
      ),
    },
  };
});
