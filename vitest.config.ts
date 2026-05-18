import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    include: ['src/**/*.test.{js,ts,tsx,jsx}'],
    setupFiles: './src/setupTests.ts',
    environment: 'happy-dom',
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.stories.tsx',
        '**/index.tsx',
        '**/types.ts',
        '**/utils.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
    },
  },
});
