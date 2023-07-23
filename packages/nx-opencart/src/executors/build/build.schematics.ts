import { convertNxExecutor } from '@nx/devkit';
import { buildExecutor } from './build';

export default convertNxExecutor(buildExecutor);
