import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { themeGenerator } from './theme';
import { Schema } from './schema';

describe('nx-opencart generator', () => {
  let appTree: Tree;
  const options: Schema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await themeGenerator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
