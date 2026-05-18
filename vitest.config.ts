import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    include: ["src/**/*.test.{js,ts}"],
    setupFiles: "./src/setupTests.ts",
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/*.stories.tsx",
        "**/index.tsx",
        "**/types.ts",
        "**/utils.ts",
      ],
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
