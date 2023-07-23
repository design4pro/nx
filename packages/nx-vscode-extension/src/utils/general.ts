import {
  detectPackageManager,
  readWorkspaceConfiguration,
  Tree,
} from '@nx/devkit';
import { stringUtils } from '@nx/workspace';

export function getDefaultTemplateOptions(tree: Tree) {
  const { npmScope, cli } = readWorkspaceConfiguration(tree);

  return {
    tmpl: '',
    dot: '.',
    stringUtils: stringUtils,
    npmScope: npmScope || 'workspace',
    packageManager: cli?.packageManager || detectPackageManager(),
  };
}
