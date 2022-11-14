import {
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { Schema } from '../schema';

export interface NormalizedSchema extends Schema {
  projectRoot: string;
  projectDist: string;
  changelogFile: string;
  releaseTargetExists: boolean;
}

export function normalizeOptions(
  tree: Tree,
  options: Schema
): NormalizedSchema {
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
      projectDist: build.options.outputPath || `dist/${libsDir}/${options.project}`,
      changelogFile: options.changelogFile || `CHANGELOG.md`,
      releaseTargetExists: projectConfig.targets.release != null
    };
  }
}
