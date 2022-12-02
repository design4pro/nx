const {
  createReleaseConfigWithScopeFilter,
} = require('@design4pro/nx-release');
const options = require('../../.releaserc');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-vscode-extension',
  projectRoot: 'packages/nx-vscode-extension',
  buildOutput: 'dist/packages/nx-vscode-extension',
  options,
  changelogFile: 'CHANGELOG.md',
});
