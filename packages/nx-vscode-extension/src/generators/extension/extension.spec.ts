import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
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

  it('should run successfully', async () => {
    await extensionGenerator(appTree, options);

    const config = readProjectConfiguration(appTree, 'test');

    expect(config).toBeDefined();
  });
});
