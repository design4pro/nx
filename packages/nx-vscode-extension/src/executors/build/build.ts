import { ExecutorContext } from '@nx/devkit';
import runCommands from '@nx/workspace/src/executors/run-commands/run-commands.impl';
import { getProjectConfiguration } from '../../utils/get-project-configuration';
import { printCommand } from '../../utils/print-command';
import { BuildExecutorSchema } from './schema';

export async function buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const { outputPath } = options;

  const command = `tsc -p tsconfig.app.json`.trim();

  printCommand(command);

  return runCommands(
    {
      command,
      outputPath,
      color: true,
      cwd: getProjectConfiguration(context).root,
      __unparsed__: undefined,
    },
    context
  );
}

export default buildExecutor;
