import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';
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

    await libraryGenerator(appTree, { ...defaultOptions, ...{ name: schema.project } });

    await generator(appTree, schema);

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      changelog: true,
      changelogFile: 'CHANGELOG.md',
      project: 'my-lib',
      projectDist: 'dist/libs/my-lib',
      projectRoot: 'libs/my-lib',
      releaseTargetExists: true,
    });
  });
});
