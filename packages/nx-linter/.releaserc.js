const {
  createReleaseConfigWithScopeFilter,
} = require('@design4pro/nx-release');
const options = require('../../.releaserc');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-linter',
  projectRoot: 'packages/nx-linter',
  buildOutput: 'dist/packages/nx-linter',
  options,
  changelogFile: 'CHANGELOG.md',
});
