import path from 'path';
import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const typescriptPlugin = typescript({
  exclude: [
    './src/**/*.stories.tsx',
    './src/**/*.test.ts',
    './src/**/*.test.tsx',
    './ssr-testing/**/*',
    '.storybook/**/*',
    'node_modules/**/*',
    'vite.config.ts',
    'vitest.config.ts',
  ],
});

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'react-glide',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        assetFileNames: (assetInfo) => {
          console.log(assetInfo);
          const oldName = 'react-glide.css';
          const newName = 'reactGlide.css';

          if (assetInfo.names.includes(oldName)) {
            return newName;
          }

          return assetInfo.names[0];
        },
      },
      plugins: [typescriptPlugin],
    },
  },
});
