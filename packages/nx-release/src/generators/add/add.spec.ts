import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libraryGenerator } from '@nx/workspace';
import generator from './add';
import { AddSchema } from './schema';

describe('nx-release add generator', () => {
  let appTree: Tree;

  const defaultOptions = {
    buildable: true,
    compiler: 'tsc',
  };

  const schema: AddSchema = { project: 'my-lib' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('Should run successfully', async () => {
    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.project },
    });

    await generator(appTree, schema);

    const config = readProjectConfiguration(appTree, schema.project);

    expect(config).toBeDefined();
  });
});
