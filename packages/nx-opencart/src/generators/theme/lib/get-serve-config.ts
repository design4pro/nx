import {
  joinPathFragments,
  ProjectConfiguration,
  TargetConfiguration,
} from '@nrwl/devkit';
import { NormalizedSchema } from './normalize-options';

export function getServeConfig(
  project: ProjectConfiguration,
  options: NormalizedSchema
): TargetConfiguration {
  return {
    executor: '@nrwl/webpack:dev-server',
    options: {
      outputPath: joinPathFragments('dist', options.projectRoot),
    },
  };
}
