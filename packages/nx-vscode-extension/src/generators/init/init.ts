import {
  addDependenciesToPackageJson,
  formatFiles,
  GeneratorCallback,
  Tree,
} from '@nrwl/devkit';
import { jestInitGenerator } from '@nrwl/jest';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { getLatestVSCodeVersion } from '../../utils/env';
import {
  globVersion,
  mochaVersion,
  typesGlobVersion,
  typesMochaVersion,
  vsCodeTestElectronVersion,
} from '../../utils/versions';
import { InitGeneratorSchema } from './schema';

export function updateDependencies(tree: Tree, engine: string) {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@types/vscode': engine,
      '@types/glob': typesGlobVersion,
      '@types/mocha': typesMochaVersion,
      '@vscode/test-electron': vsCodeTestElectronVersion,
      glob: globVersion,
      mocha: mochaVersion,
    }
  );
}

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];
  const vsCodeEngine = await getLatestVSCodeVersion();

  if (!options.unitTestRunner || options.unitTestRunner === 'jest') {
    const jestTask = jestInitGenerator(tree, {});
    tasks.push(jestTask);
  }

  const updateDepsTask = updateDependencies(tree, vsCodeEngine);
  tasks.push(updateDepsTask);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default initGenerator;
