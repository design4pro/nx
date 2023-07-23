import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  names,
  offsetFromRoot,
  Tree,
} from '@nx/devkit';
import { runTasksInSerial } from '@nx/workspace/src/utilities/run-tasks-in-serial';
import { getRelativePathToRootTsConfig } from '@nx/workspace/src/utilities/typescript';
import * as path from 'path';
import { getLatestVSCodeVersion } from '../../utils/env';
import { getDefaultTemplateOptions } from '../../utils/general';
import {
  globVersion,
  mochaVersion,
  typesGlobVersion,
  typesMochaVersion,
  vsCodeTestElectronVersion,
} from '../../utils/versions';
import { initGenerator } from '../init/init';
import { NormalizedSchema, normalizeOptions } from './lib/normalize-options';
import { Schema } from './schema';

function addProject(tree: Tree, options: NormalizedSchema) {
  addProjectConfiguration(tree, options.name, {
    root: options.projectRoot,
    projectType: 'library',
    sourceRoot: `${options.projectRoot}/src`,
    targets: {
      build: {
        executor: '@design4pro/nx-vscode-extension:build',
      },
    },
    tags: options.parsedTags,
  });
}

async function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...getDefaultTemplateOptions(tree),
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    rootTsConfigPath: getRelativePathToRootTsConfig(tree, options.projectRoot),
    vsCodeEngine: await getLatestVSCodeVersion(),
    globVersion,
    mochaVersion,
    typesGlobVersion,
    typesMochaVersion,
    vsCodeTestElectronVersion,
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export async function extensionGenerator(
  tree: Tree,
  options: Schema
): Promise<GeneratorCallback> {
  const normalizedOptions = normalizeOptions(tree, options);

  await addFiles(tree, normalizedOptions);

  addProject(tree, normalizedOptions);

  const initTask = await initGenerator(tree, {
    ...options,
    skipFormat: true,
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(initTask);
}

export default extensionGenerator;
