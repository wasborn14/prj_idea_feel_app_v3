import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-console',
    '@storybook/addon-actions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (config) => {
    if (config.resolve !== undefined) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@/const': path.resolve(__dirname, '../src/const'),
        '@/utils': path.resolve(__dirname, '../src/utils'),
        '@/hooks': path.resolve(__dirname, '../src/hooks'),
        '@/components': path.resolve(__dirname, '../src/components'),
        '@/media': path.resolve(__dirname, '../src/media')
      }
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'next-i18next': 'react-i18next'
        }
      }
    }
  }
}
export default config
