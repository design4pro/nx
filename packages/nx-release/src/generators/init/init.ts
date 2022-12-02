import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  Tree,
} from '@nrwl/devkit';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import * as path from 'path';
import { getTemplateOptions } from '../../utils/get-template-options';
import { nxReleaseVersion, semanticReleaseVersion } from '../../utils/versions';
import { Schema } from './schema';

export function updateDependencies(tree: Tree) {
  const devDependencies = {};
  const dependencies = {};

  devDependencies['@design4pro/nx-release'] = nxReleaseVersion;
  devDependencies['semantic-release'] = semanticReleaseVersion;

  return addDependenciesToPackageJson(tree, dependencies, devDependencies);
}

function addFiles(tree: Tree) {
  const templateOptions = {
    ...getTemplateOptions(tree),
  };

  if (!tree.exists('.releaserc.js')) {
    generateFiles(
      tree,
      path.join(__dirname, 'root-files'),
      '.',
      templateOptions
    );
  }
}

export async function initGenerator(tree: Tree, options: Schema) {
  addFiles(tree);

  const updateDepsTask = updateDependencies(tree);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(updateDepsTask);
}

export default initGenerator;
