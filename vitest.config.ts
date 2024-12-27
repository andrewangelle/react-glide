/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types='vitest' />
/// <reference types='vite/client' />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
