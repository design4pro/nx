import {
  formatFiles,
  generateFiles,
  logger,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { getTemplateOptions } from '../../utils/get-template-options';
import initGenerator from '../init/init';
import { NormalizedSchema, normalizeOptions } from './lib/normalize-options';
import { AddSchema } from './schema';

function addReleaseTarget(tree: Tree, options: NormalizedSchema) {
  const projectConfig = readProjectConfiguration(tree, options.project);

  projectConfig.targets.release = {
    executor: '@nrwl/workspace:run-commands',
    options: {
      commands: [
        {
          command: `npx semantic-release -e ./${options.projectDist}/.releaserc.json`,
        },
      ],
    },
  };

  updateProjectConfiguration(tree, options.project, projectConfig);
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...getTemplateOptions(tree),
    ...options,
    ...names(options.project),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export async function addGenerator(tree: Tree, options: AddSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  if (normalizedOptions.releaseTargetExists) {
    throw new Error(
      `Project '${options.project}' already has a release target.`
    );
  }

  logger.info(
    `Adding Semantic Release configuration and target to '${options.project}' ...\n`
  );

  addFiles(tree, normalizedOptions);

  addReleaseTarget(tree, normalizedOptions);

  const initTask = await initGenerator(tree, {
    ...options,
    skipFormat: true,
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(initTask);
}

export default addGenerator;
