const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-vscode-extension',
  projectRoot: 'packages/nx-vscode-extension',
  buildOutput: 'dist/packages/nx-vscode-extension',
});
