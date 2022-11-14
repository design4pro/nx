import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { Linter } from '@nrwl/linter';
import { Schema } from '../schema';
import { normalizeOptions } from './normalize-options';

describe('Normalize Options', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyV1Workspace();
  });

  it('should normalize options with name in kebab case', () => {
    const schema: Schema = {
      displayName: 'my-extension',
      linter: Linter.EsLint,
    };

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

  it('should normalize options with name in camel case', () => {
    const schema: Schema = {
      displayName: 'myExtension',
    };
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

  it('should normalize options with directory', () => {
    const schema: Schema = {
      displayName: 'my-extension',
      directory: 'directory',
    };
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

  it('should normalize options that has directory in its name', () => {
    const schema: Schema = {
      displayName: 'directory/my-extension',
    };
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

  it('should normalize options with display name', () => {
    const schema: Schema = {
      displayName: 'my-extension',
    };
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
