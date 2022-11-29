import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Linter } from '@nrwl/linter';
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
      displayName: 'my-extension',
      linter: Linter.EsLint,
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.displayName },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      description: 'my-extension extension',
      name: 'my-extension',
      displayName: 'my-extension',
      importPath: '@proj/my-extension',
      linter: Linter.EsLint,
      parsedTags: [],
      projectRoot: 'libs/my-extension',
      strict: true,
    });
  });

  it('Should normalize options with name in camel case', async () => {
    const schema: Schema = {
      displayName: 'myExtension',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.displayName },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      description: 'myExtension extension',
      name: 'my-extension',
      displayName: 'myExtension',
      importPath: '@proj/my-extension',
      linter: Linter.EsLint,
      parsedTags: [],
      projectRoot: 'libs/my-extension',
      strict: true,
    });
  });

  it('Should normalize options with directory', async () => {
    const schema: Schema = {
      displayName: 'my-extension',
      directory: 'directory',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.displayName },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      description: 'my-extension extension',
      name: 'my-extension',
      directory: 'directory',
      displayName: 'my-extension',
      importPath: '@proj/directory/my-extension',
      linter: Linter.EsLint,
      parsedTags: [],
      projectRoot: 'libs/directory/my-extension',
      strict: true,
    });
  });

  it('Should normalize options that has directory in its name', async () => {
    const schema: Schema = {
      displayName: 'directory/my-extension',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.displayName },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      description: 'directory/my-extension extension',
      name: 'directory-my-extension',
      displayName: 'directory/my-extension',
      importPath: '@proj/directory/my-extension',
      linter: Linter.EsLint,
      parsedTags: [],
      projectRoot: 'libs/directory/my-extension',
      strict: true,
    });
  });

  it('Should normalize options with display name', async () => {
    const schema: Schema = {
      displayName: 'my-extension',
    };

    await libraryGenerator(appTree, {
      ...defaultOptions,
      ...{ name: schema.displayName },
    });

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      description: 'my-extension extension',
      name: 'my-extension',
      displayName: 'my-extension',
      importPath: '@proj/my-extension',
      linter: Linter.EsLint,
      parsedTags: [],
      projectRoot: 'libs/my-extension',
      strict: true,
    });
  });
});
