module.exports = {
  stories: ['../components/**/*.stories.(js|mdx)'],
  addons: [
    'storybook-addon-designs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
};
