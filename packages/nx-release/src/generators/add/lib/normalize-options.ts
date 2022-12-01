import {
  getWorkspaceLayout,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { AddSchema } from '../schema';

export interface NormalizedSchema extends AddSchema {
  projectRoot: string;
  projectDist: string;
  relativeWorkspaceRoot: string;
  releaseTargetExists: boolean;
}

const buildReversePath = (path) =>
  path
    .split('/')
    .map(() => '..')
    .join('/');

export function normalizeOptions(
  tree: Tree,
  options: AddSchema
): NormalizedSchema {
  const projectConfig = readProjectConfiguration(tree, options.project);
  const { build } = projectConfig.targets;

  if (!build) {
    throw new Error(
      'This generator can only be run against buildable libraries.'
    );
  } else {
    const { libsDir } = getWorkspaceLayout(tree);
    const relativeWorkspaceRoot = buildReversePath(projectConfig.root);

    return {
      ...options,
      projectRoot: projectConfig.root,
      relativeWorkspaceRoot: `${relativeWorkspaceRoot}/`,
      projectDist:
        build.options.outputPath || `dist/${libsDir}/${options.project}`,
      changelog: options.changelog ?? true,
      changelogFile: options.changelogFile || `CHANGELOG.md`,
      releaseTargetExists: projectConfig.targets.release != null,
    };
  }
}
