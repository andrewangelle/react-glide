import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lib',
    lib: {
      entry: './src/index.tsx',
      name: 'react-glide',
      fileName: (_format) => 'index.mjs',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        assetFileNames: (assetInfo) => {
          const oldName = 'react-glide.css';
          const newName = 'reactGlide.css';

          if (assetInfo.names.includes(oldName)) {
            return newName;
          }

          return assetInfo.names[0];
        },
      },
    },
  },
});
