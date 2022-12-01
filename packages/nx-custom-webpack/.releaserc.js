const {
  createReleaseConfigWithScopeFilter,
} = require('@design4pro/nx-release');
const options = require('../../.releaserc');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-custom-webpack',
  projectRoot: 'packages/nx-custom-webpack',
  buildOutput: 'dist/packages/nx-custom-webpack',
  options,
  changelogFile: 'CHANGELOG.md',
});
