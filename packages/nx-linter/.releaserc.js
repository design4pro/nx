const { createReleaseConfigWithScopeFilter } = require('../../tools/release');

module.exports = createReleaseConfigWithScopeFilter({
  projectScope: 'nx-linter',
  projectRoot: 'packages/nx-linter',
  buildOutput: 'dist/packages/nx-linter',
});
