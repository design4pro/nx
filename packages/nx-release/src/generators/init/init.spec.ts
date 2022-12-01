import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { nxReleaseVersion, semanticReleaseVersion } from '../../utils/versions';
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
        '@design4pro/nx-release': nxReleaseVersion,
        'semantic-release': semanticReleaseVersion,
      })
    );
  });
});
