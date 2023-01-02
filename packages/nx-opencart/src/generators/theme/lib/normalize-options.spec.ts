import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Schema } from '../schema';
import { normalizeOptions } from './normalize-options';

describe('Normalize Options', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('Should normalize options with name in kebab case', () => {
    const schema: Schema = {
      name: 'my-extension',
    };

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'my-extension',
      className: 'MyExtension',
      fileName: 'my_extension',
      projectName: 'my-extension',
      projectRoot: './my-extension',
      projectDirectory: 'my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options with name in camel case', () => {
    const schema: Schema = {
      name: 'myExtension',
    };

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'myExtension',
      className: 'MyExtension',
      fileName: 'my_extension',
      projectName: 'my-extension',
      projectRoot: './my-extension',
      projectDirectory: 'my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options with directory', () => {
    const schema: Schema = {
      name: 'my-extension',
      directory: 'directory',
    };

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'my-extension',
      className: 'MyExtension',
      fileName: 'my_extension',
      directory: 'directory',
      projectName: 'directory-my-extension',
      projectRoot: './directory/my-extension',
      projectDirectory: 'directory/my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options that has directory in its name', () => {
    const schema: Schema = {
      name: 'directory/my-extension',
    };

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'directory/my-extension',
      className: 'DirectoryMyExtension',
      fileName: 'directory_my_extension',
      projectName: 'directory-my-extension',
      projectRoot: './directory/my-extension',
      projectDirectory: 'directory/my-extension',
      parsedTags: [],
    });
  });

  it('Should normalize options that has directory in its name', () => {
    const schema: Schema = {
      name: 'My Extension',
    };

    const options = normalizeOptions(appTree, schema);

    expect(options).toEqual({
      name: 'My Extension',
      className: 'MyExtension',
      fileName: 'my_extension',
      projectName: 'my-extension',
      projectRoot: './my-extension',
      projectDirectory: 'my-extension',
      parsedTags: [],
    });
  });
});
