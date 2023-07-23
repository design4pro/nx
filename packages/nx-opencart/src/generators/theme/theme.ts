import { formatFiles, Tree } from '@nx/devkit';
import { normalizeOptions } from './lib/normalize-options';
import { Schema } from './schema';
import { addProject } from './lib/add-project';
import { createFiles } from './lib/create-files';
import initGenerator from '../init/init';
import { runTasksInSerial } from '@nx/workspace/src/utilities/run-tasks-in-serial';

export async function themeGenerator(tree: Tree, options: Schema) {
  const normalizedOptions = normalizeOptions(tree, options);

  createFiles(tree, normalizedOptions);

  addProject(tree, normalizedOptions);

  const initTask = await initGenerator(tree, {
    ...options,
    skipFormat: options.skipFormat,
  });

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(initTask);
}

export default themeGenerator;
