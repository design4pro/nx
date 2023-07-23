import { readJson, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { nxWebpackVersion } from '../../utils/versions';
import { initGenerator } from './init';
import { Schema } from './schema';

describe('init', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should update package.json', async () => {
    const initOptions: Schema = { skipFormat: false };

    await initGenerator(tree, initOptions);
    const packageJson = readJson(tree, '/package.json');

    expect(packageJson.devDependencies).toEqual(
      expect.objectContaining({
        '@nx/webpack': nxWebpackVersion,
      })
    );
  });
});
