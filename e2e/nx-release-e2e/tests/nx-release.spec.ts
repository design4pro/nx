import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nx/plugin/testing';
describe('nx-release e2e', () => {
  it('should create nx-release', async () => {
    const plugin = uniq('nx-release');
    ensureNxProject('@design4pro/nx-release', 'dist/packages/nx-release');
    await runNxCommandAsync(
      `generate @design4pro/nx-release:nx-release ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-release');
      ensureNxProject('@design4pro/nx-release', 'dist/packages/nx-release');
      await runNxCommandAsync(
        `generate @design4pro/nx-release:nx-release ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = uniq('nx-release');
      ensureNxProject('@design4pro/nx-release', 'dist/packages/nx-release');
      await runNxCommandAsync(
        `generate @design4pro/nx-release:nx-release ${plugin} --tags e2etag,e2ePackage`
      );
      const project = readJson(`libs/${plugin}/project.json`);
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
