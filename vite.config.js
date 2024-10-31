import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import process from 'process';

// Charger les variables d'environnement
dotenv.config();

const DEVELOPMENT_API_BASE_URL = process.env.VITE_DEVELOPMENT_API_BASE_URL || '/api';
const PRODUCTION_API_BASE_URL = process.env.VITE_PRODUCTION_API_BASE_URL || 'https://santafall.azurewebsites.net';
const DEVELOPMENT_PATH_PREFIX = process.env.VITE_DEVELOPMENT_PATH_PREFIX || '/';
const PRODUCTION_PATH_PREFIX = process.env.VITE_PRODUCTION_PATH_PREFIX || '/web2-2023-project-group-18/';

const buildMode = process.argv[process.argv.indexOf('--mode') + 1];
const isProductionBuild = buildMode === 'production';

const API_BASE_URL = isProductionBuild ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;
const PATH_PREFIX = isProductionBuild ? PRODUCTION_PATH_PREFIX : DEVELOPMENT_PATH_PREFIX;

export default defineConfig({
  base: PATH_PREFIX,
  plugins: [react()],
  define: {
    'process.env': {
      API_BASE_URL,
      PATH_PREFIX,
    },
  },
});
