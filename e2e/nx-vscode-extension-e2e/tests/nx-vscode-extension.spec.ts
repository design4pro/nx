import { names } from '@nrwl/devkit';
import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('nx-vscode-extension e2e', () => {
  it('should create nx-vscode-extension', async () => {
    const plugin = names(uniq('nx-vscode-extension'));

    ensureNxProject(
      '@design4pro/nx-vscode-extension',
      'dist/packages/nx-vscode-extension'
    );
    await runNxCommandAsync(
      `generate @design4pro/nx-vscode-extension:extension ${plugin.name} --displayName ${plugin.propertyName}`
    );

    const result = await runNxCommandAsync(`build ${plugin.name}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = names(uniq('nx-vscode-extension'));

      ensureNxProject(
        '@design4pro/nx-vscode-extension',
        'dist/packages/nx-vscode-extension'
      );

      await runNxCommandAsync(
        `generate @design4pro/nx-vscode-extension:extension ${plugin.name} --displayName ${plugin.propertyName} --directory subdir`
      );

      expect(() =>
        checkFilesExist(`libs/subdir/${plugin.name}/src/extension.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = names(uniq('nx-vscode-extension'));

      ensureNxProject(
        '@design4pro/nx-vscode-extension',
        'dist/packages/nx-vscode-extension'
      );

      await runNxCommandAsync(
        `generate @design4pro/nx-vscode-extension:extension ${plugin.name} --displayName ${plugin.propertyName} --tags e2etag,e2ePackage`
      );

      const project = readJson(`libs/${plugin.name}/project.json`);

      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
