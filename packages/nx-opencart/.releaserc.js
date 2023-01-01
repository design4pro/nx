const {
  createReleaseConfigWithScopeFilter,
} = require('@design4pro/nx-release');
const options = require('../../.releaserc');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-opencart',
  projectRoot: 'packages/nx-opencart',
  buildOutput: 'dist/packages/nx-opencart',
  options,
  changelogFile: 'CHANGELOG.md',
});
