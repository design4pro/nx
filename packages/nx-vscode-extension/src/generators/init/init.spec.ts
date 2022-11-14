import { readJson, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { getLatestVSCodeVersion } from '../../utils/env';
import {
  globVersion,
  mochaVersion,
  typesGlobVersion,
  typesMochaVersion,
  vsCodeTestElectronVersion,
} from '../../utils/versions';
import { initGenerator } from './init';
import { InitGeneratorSchema } from './schema';

describe('init', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyV1Workspace();
  });

  it('should update package.json', async () => {
    const initOptions: InitGeneratorSchema = { skipFormat: false };
    const vsCodeEngine = await getLatestVSCodeVersion();

    await initGenerator(tree, initOptions);
    const packageJson = readJson(tree, '/package.json');

    expect(packageJson.devDependencies).toEqual(
      expect.objectContaining({
        '@types/vscode': vsCodeEngine,
        '@types/glob': typesGlobVersion,
        '@types/mocha': typesMochaVersion,
        '@vscode/test-electron': vsCodeTestElectronVersion,
        glob: globVersion,
        mocha: mochaVersion,
      })
    );
  });
});
