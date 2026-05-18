export default {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/react-vite",
  },

  core: {
    builder: "@storybook/builder-vite",
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
