import { formatFiles, Tree } from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { updateDependencies } from './lib/update-dependencies';
import { Schema } from './schema';

export async function initGenerator(tree: Tree, options: Schema) {
  const updateDepsTask = updateDependencies(tree);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(updateDepsTask);
}

export default initGenerator;
