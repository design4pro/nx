import {
  addProjectConfiguration,
  readWorkspaceConfiguration,
  Tree,
  updateWorkspaceConfiguration,
} from '@nx/devkit';
import { ProjectConfiguration } from 'nx/src/config/workspace-json-project-json';
import { joinPathFragments } from 'nx/src/utils/path';
import { NormalizedSchema } from './normalize-options';
import { getBuildConfig } from './get-build-config';
import { getServeConfig } from './get-serve-config';

export function addProject(tree: Tree, options: NormalizedSchema) {
  const project: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'application',
    targets: {},
    tags: options.parsedTags,
  };

  project.targets.build = getBuildConfig(project, options);
  project.targets.serve = getServeConfig(project, options);

  addProjectConfiguration(
    tree,
    options.name,
    project,
    options.standaloneConfig
  );

  const workspace = readWorkspaceConfiguration(tree);

  if (!workspace.defaultProject) {
    workspace.defaultProject = options.name;
    updateWorkspaceConfiguration(tree, workspace);
  }
}
