const {
  createReleaseConfigWithScopeFilter,
} = require('@design4pro/nx-release');
const options = require('../../.releaserc');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-strapi',
  projectRoot: 'packages/nx-strapi',
  buildOutput: 'dist/packages/nx-strapi',
  options,
  changelogFile: 'CHANGELOG.md',
});
