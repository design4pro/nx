import { BuildExecutorSchema } from './schema';
import { buildExecutor } from './build';
import { ExecutorContext } from '@nrwl/devkit';

const options: BuildExecutorSchema = {};

describe('Build Executor', () => {
  let context: ExecutorContext;

  it('can run', async () => {
    const output = await buildExecutor(options, context);
    expect(output.success).toBe(true);
  });
});
