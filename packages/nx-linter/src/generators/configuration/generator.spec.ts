import { logger, readJson, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { libraryGenerator } from '@nrwl/node';
import { Configuration as StylelintConfiguration } from 'stylelint';
import generator from './generator';
import { ConfigurationGeneratorSchema } from './schema';

const defaultOptions: ConfigurationGeneratorSchema = {
  project: 'test',
  skipFormat: false,
};

describe('nx-linter:configuration generator', () => {
  let tree: Tree;

  beforeAll(async () => {
    logger.info = jest.fn();
  });

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should add stylelint target, run init generator and create project .stylelinrrc.json', async () => {
    const projectStylelint = `libs/test/.stylelintrc.json`;

    await libraryGenerator(tree, { name: 'test' });
    await generator(tree, defaultOptions);

    const config = readProjectConfiguration(tree, 'test');

    expect(config).toBeDefined();
    expect(config.targets.stylelint).toBeDefined();
    expect(config.targets.stylelint.executor).toBe('nx-linter:stylelint');
    expect(config.targets.stylelint.options.config).toBe(projectStylelint);
    expect(config.targets.stylelint.options.format).toBeUndefined();
    expect(tree.exists('.stylelintrc.json')).toBeTruthy();
    expect(tree.exists(projectStylelint)).toBeTruthy();

    const projectStylelintConfig: Partial<StylelintConfiguration> = readJson(
      tree,
      projectStylelint
    );
    expect(projectStylelintConfig.extends).toHaveLength(1);
    expect(projectStylelintConfig.extends).toContain('../../.stylelintrc.json');
  });

  it('should fail when project already has a stylelint target', async () => {
    expect.assertions(2);

    await libraryGenerator(tree, { name: 'test' });
    await generator(tree, defaultOptions);

    const config = readProjectConfiguration(tree, 'test');
    expect(config.targets.stylelint).toBeDefined();

    try {
      await generator(tree, defaultOptions);
    } catch (error) {
      expect(error.message).toBe(
        "Project 'test' already has a stylelint target."
      );
    }
  });

  it('should add a stylelint target with the specified formatter', async () => {
    await libraryGenerator(tree, { name: 'test' });
    await generator(tree, { ...defaultOptions, format: 'json' });

    const config = readProjectConfiguration(tree, 'test');

    expect(config).toBeDefined();
    expect(config.targets.stylelint).toBeDefined();
    expect(config.targets.stylelint.executor).toBe('nx-linter:stylelint');
    expect(config.targets.stylelint.options.format).toBe('json');
  });
});
