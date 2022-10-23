/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types='vitest' />
/// <reference types='vite/client' />

import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})