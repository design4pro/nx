import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libraryGenerator } from '@nx/workspace';
import generator from '../add';
import { AddSchema } from '../schema';
import { normalizeOptions } from './normalize-options';

describe('Normalize Options', () => {
  let appTree: Tree;

  const defaultOptions = {
    buildable: true,
    compiler: 'tsc',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('Should normalize options with name in kebab case', async () => {
    const schema: AddSchema = {
      project: 'my-lib',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.project },
    });

    await generator(appTree, schema);

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      changelog: true,
      changelogFile: 'CHANGELOG.md',
      project: 'my-lib',
      projectDist: 'dist/libs/my-lib',
      projectRoot: 'libs/my-lib',
      relativeWorkspaceRoot: '../../',
      releaseTargetExists: true,
    });
  });
});
