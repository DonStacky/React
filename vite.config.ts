import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fonts: '/public/fonts',
      image: '/src/assets/image',
      data: '/src/assets/data',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/_constants.scss"; @import "./src/assets/styles/_fonts.scss";`,
      },
    },
  },
});
