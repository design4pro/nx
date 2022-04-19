import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
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
import init from '../init/init';
import { NormalizedSchema, Schema } from './schema';

function normalizeOptions(tree: Tree, options: Schema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addProject(tree: Tree, options: NormalizedSchema) {
  addProjectConfiguration(tree, options.projectName, {
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

export async function generator(tree: Tree, options: Schema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await addFiles(tree, normalizedOptions);

  addProject(tree, normalizedOptions);

  const tasks: GeneratorCallback[] = [
    await init(tree, {
      ...options,
      skipFormat: true,
    }),
  ];

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default generator;
