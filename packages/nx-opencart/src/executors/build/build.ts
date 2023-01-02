import { BuildExecutorSchema } from './schema';

export async function buildExecutor(options: BuildExecutorSchema) {
  console.log('Executor ran for Build', options);
  return {
    success: true,
  };
}

export default buildExecutor;
