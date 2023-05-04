import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
    plugins: [react()],
    define: {
      __APP_KEY__: JSON.stringify(env.APP_KEY),
      __NODE_ENV__: JSON.stringify(env.NODE_ENV),
    },
  };
});
