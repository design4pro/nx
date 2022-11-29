import { convertNxExecutor } from '@nrwl/devkit';
import { buildExecutor } from './build';

export default convertNxExecutor(buildExecutor);
