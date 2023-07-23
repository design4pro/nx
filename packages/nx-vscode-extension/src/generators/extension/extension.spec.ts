import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import extensionGenerator from './extension';
import { Schema } from './schema';

describe('nx-vscode-extension generator', () => {
  let appTree: Tree;

  const options: Schema = {
    name: 'test',
    displayName: 'test',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('Should run successfully', async () => {
    await extensionGenerator(appTree, options);

    const config = readProjectConfiguration(appTree, options.name);

    expect(config).toBeDefined();
  });
});
