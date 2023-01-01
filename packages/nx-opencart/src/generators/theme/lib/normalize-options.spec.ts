import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/workspace';
import { Schema } from '../schema';
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
    const schema: Schema = {
      name: 'my-extension',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.name },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'my-extension',
      projectName: 'my-extension',
      projectRoot: 'libs/my-extension',
      projectDirectory: 'my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options with name in camel case', async () => {
    const schema: Schema = {
      name: 'myExtension',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.name },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'myExtension',
      projectName: 'my-extension',
      projectRoot: 'libs/my-extension',
      projectDirectory: 'my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options with directory', async () => {
    const schema: Schema = {
      name: 'my-extension',
      directory: 'directory',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.name },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'my-extension',
      directory: 'directory',
      projectName: 'directory-my-extension',
      projectRoot: 'libs/directory/my-extension',
      projectDirectory: 'directory/my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options that has directory in its name', async () => {
    const schema: Schema = {
      name: 'directory/my-extension',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.name },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'directory/my-extension',
      projectName: 'directory-my-extension',
      projectRoot: 'libs/directory/my-extension',
      projectDirectory: 'directory/my-extension',
      parsedTags: [],
    });
  });
});
