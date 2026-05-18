import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: './src/index.tsx',
  tsconfig: './tsconfig.json',
  format: 'esm',
  outDir: 'lib',
  minify: true,
  hash: false,
  fixedExtension: true,
  platform: 'browser',
  dts: true,
  deps: {
    neverBundle: ['react', 'react/jsx-runtime'],
  },
  css: {
    fileName: 'reactGlide.css',
    minify: true,
  },
  outExtensions: () => ({
    js: '.mjs',
    dts: '.ts',
  }),
});
