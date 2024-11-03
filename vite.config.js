import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/web3-2024-project-group-16/' : '/',
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
        isProduction ? 'https://echoes.azurewebsites.net' : 'http://localhost:3000'
      ),
    },
  };
});