import { ExecutorContext } from '@nrwl/devkit';
import { buildExecutor } from './build';
import { BuildExecutorSchema } from './schema';

const options: BuildExecutorSchema = {};

describe('Build Executor', () => {
  let context: ExecutorContext;

  it('can run', async () => {
    const output = await buildExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
