const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-strapi',
  projectRoot: 'packages/nx-strapi',
  buildOutput: 'dist/packages/nx-strapi',
});
