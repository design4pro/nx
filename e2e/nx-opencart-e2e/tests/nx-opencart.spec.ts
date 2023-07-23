import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nx/plugin/testing';

describe('nx-opencart e2e', () => {
  it('should create nx-opencart', async () => {
    const theme = uniq('nx-opencart');

    ensureNxProject('@design4pro/nx-opencart', 'dist/packages/nx-opencart');

    await runNxCommandAsync(`generate @design4pro/nx-opencart:theme ${theme}`);

    const result = await runNxCommandAsync(`run ${theme}:build`);

    expect(result.stdout).toContain('Executor ran');
  }, 200000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const theme = uniq('nx-opencart');

      ensureNxProject('@design4pro/nx-opencart', 'dist/packages/nx-opencart');

      await runNxCommandAsync(
        `generate @design4pro/nx-opencart:theme ${theme} --directory subdir`
      );

      expect(() =>
        checkFilesExist(`apps/subdir/${theme}/src/install.json`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const theme = uniq('nx-opencart');

      ensureNxProject('@design4pro/nx-opencart', 'dist/packages/nx-opencart');

      await runNxCommandAsync(
        `generate @design4pro/nx-opencart:theme ${theme} --tags e2etag,e2ePackage`
      );

      const project = readJson(`apps/${theme}/project.json`);

      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
