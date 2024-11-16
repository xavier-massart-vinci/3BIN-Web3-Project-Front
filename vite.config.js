import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: '/',
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
        isProduction ? 'http://BACK_END_IP:4000' : 'http://localhost:3000'
      ),
    },
  };
});