import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './add';
import { NxReleaseGeneratorSchema } from './schema';

describe('nx-release generator', () => {
  let appTree: Tree;
  const options: NxReleaseGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyV1Workspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
