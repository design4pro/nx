import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('nx-opencart e2e', () => {
  it('should create nx-opencart', async () => {
    const plugin = uniq('nx-opencart');
    ensureNxProject('@design4pro/nx-opencart', 'dist/packages/nx-opencart');
    await runNxCommandAsync(
      `generate @design4pro/nx-opencart:nx-opencart ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-opencart');
      ensureNxProject('@design4pro/nx-opencart', 'dist/packages/nx-opencart');
      await runNxCommandAsync(
        `generate @design4pro/nx-opencart:nx-opencart ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`apps/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = uniq('nx-opencart');
      ensureNxProject('@design4pro/nx-opencart', 'dist/packages/nx-opencart');
      await runNxCommandAsync(
        `generate @design4pro/nx-opencart:nx-opencart ${plugin} --tags e2etag,e2ePackage`
      );
      const project = readJson(`apps/${plugin}/project.json`);
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
