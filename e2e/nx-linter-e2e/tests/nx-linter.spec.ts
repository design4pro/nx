import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nx/plugin/testing';
describe('nx-linter e2e', () => {
  it('should create nx-linter', async (done) => {
    const plugin = uniq('nx-linter');
    ensureNxProject('@design4pro/nx-linter', 'dist/packages/nx-linter');
    await runNxCommandAsync(`generate @design4pro/nx-linter:init ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');

    done();
  });

  describe('--directory', () => {
    it('should create src in the specified directory', async (done) => {
      const plugin = uniq('nx-linter');
      ensureNxProject('@design4pro/nx-linter', 'dist/packages/nx-linter');
      await runNxCommandAsync(
        `generate @design4pro/nx-linter:init ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
      done();
    });
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-linter');
      ensureNxProject('@design4pro/nx-linter', 'dist/packages/nx-linter');
      await runNxCommandAsync(
        `generate @design4pro/nx-linter:init ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
