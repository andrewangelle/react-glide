import tsConfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import type { Plugin } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }) as Plugin,
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.stories.tsx',
        '**/index.tsx',
        '**/types.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
    },
  },
});
