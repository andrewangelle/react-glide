import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  async viteFinal(config: StorybookConfig) {
    return mergeConfig(config, {
      resolve: {
        tsconfigPaths: true,
      },
      plugins: [react()],
    });
  },
};
