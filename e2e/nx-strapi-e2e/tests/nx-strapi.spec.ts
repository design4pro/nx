import {
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('nx-strapi e2e', () => {
  it('should create nx-strapi', async (done) => {
    const plugin = uniq('nx-strapi');
    ensureNxProject('@design4pro/nx-strapi', 'dist/packages/nx-strapi');
    await runNxCommandAsync(`generate @design4pro/nx-strapi:app ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Strapi build done');

    done();
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async (done) => {
      const plugin = uniq('nx-strapi');
      ensureNxProject('@design4pro/nx-strapi', 'dist/packages/nx-strapi');
      await runNxCommandAsync(
        `generate @design4pro/nx-strapi:app ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
      done();
    });
  });
});
