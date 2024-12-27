import path from 'path';
import typescript from '@rollup/plugin-typescript';
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
        globals: {
          react: 'react',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'reactGlide.css';
          return assetInfo.name || '';
        },
      },
      plugins: [typescriptPlugin],
    },
  },
});
