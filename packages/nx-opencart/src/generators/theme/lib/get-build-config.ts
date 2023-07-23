import {
  joinPathFragments,
  ProjectConfiguration,
  TargetConfiguration,
} from '@nx/devkit';
import { NormalizedSchema } from './normalize-options';

export function getBuildConfig(
  project: ProjectConfiguration,
  options: NormalizedSchema
): TargetConfiguration {
  return {
    executor: '@nx/webpack:webpack',
    outputs: ['{options.outputPath}'],
    options: {
      outputPath: joinPathFragments('dist', options.projectRoot),
      main: joinPathFragments(
        project.sourceRoot,
        `catalog/view/stylesheet/stylesheet.css`
      ),
      tsConfig: joinPathFragments(options.projectRoot, `tsconfig.app.json`),
    },
  };
}
