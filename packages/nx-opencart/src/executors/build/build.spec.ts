import { BuildExecutorSchema } from './schema';
import { buildExecutor } from './build';

const options: BuildExecutorSchema = {};

describe('Build Executor', () => {
  it('can run', async () => {
    const output = await buildExecutor(options);
    expect(output.success).toBe(true);
  });
});
