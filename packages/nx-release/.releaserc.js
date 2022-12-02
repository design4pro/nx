const {
  createReleaseConfigWithScopeFilter,
} = require('@design4pro/nx-release');
const options = require('../../.releaserc');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-release',
  projectRoot: 'packages/nx-release',
  buildOutput: 'dist/packages/nx-release',
  options,
  changelogFile: 'CHANGELOG.md',
});
