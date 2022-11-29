import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';
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
