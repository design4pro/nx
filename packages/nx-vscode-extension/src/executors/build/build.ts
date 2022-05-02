import { ExecutorContext } from '@nrwl/devkit';
import runCommands from '@nrwl/workspace/src/executors/run-commands/run-commands.impl';
import { getProjectConfiguration } from '../../utils/get-project-configuration';
import { printCommand } from '../../utils/print-command';
import { BuildExecutorSchema } from './schema';

export async function buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const { outputPath, ..._rest } = options;

  const command = `tsc -p tsconfig.app.json`.trim();

  printCommand(command);

  return runCommands(
    {
      command,
      outputPath,
      color: true,
      cwd: getProjectConfiguration(context).root,
    },
    context
  );
}

export default buildExecutor;
