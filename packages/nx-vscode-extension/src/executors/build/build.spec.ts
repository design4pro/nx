import { ExecutorContext } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';

const options: BuildExecutorSchema = {};

describe('Build Executor', () => {
  let context: ExecutorContext;

  it('Can run', async () => {
    // const output = await buildExecutor(options, context);

    expect(true).toBe(true);
  });
});
