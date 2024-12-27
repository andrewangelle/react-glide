export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
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
};
