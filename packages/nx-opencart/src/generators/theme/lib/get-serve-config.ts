import {
  joinPathFragments,
  ProjectConfiguration,
  TargetConfiguration,
} from '@nx/devkit';
import { NormalizedSchema } from './normalize-options';

export function getServeConfig(
  project: ProjectConfiguration,
  options: NormalizedSchema
): TargetConfiguration {
  return {
    executor: '@nx/webpack:dev-server',
    options: {
      outputPath: joinPathFragments('dist', options.projectRoot),
    },
  };
}
