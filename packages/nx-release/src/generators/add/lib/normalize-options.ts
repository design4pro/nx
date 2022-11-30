import {
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { AddSchema } from '../schema';

export interface NormalizedSchema extends AddSchema {
  projectRoot: string;
  projectDist: string;
  releaseTargetExists: boolean;
}

export function normalizeOptions(
  tree: Tree,
  options: AddSchema
): NormalizedSchema {
  // TODO: [] move this check to generator
  const projectConfig = readProjectConfiguration(tree, options.project);
  const { build } = projectConfig.targets;

  if (!build) {
    throw new Error(
      'This generator can only be run against buildable libraries.'
    );
  } else {
    const { libsDir } = getWorkspaceLayout(tree);

    return {
      ...options,
      projectRoot: projectConfig.root,
      projectDist:
        build.options.outputPath || `dist/${libsDir}/${options.project}`,
      changelog: options.changelog ?? true,
      changelogFile: options.changelogFile || `CHANGELOG.md`,
      releaseTargetExists: projectConfig.targets.release != null,
    };
  }
}
