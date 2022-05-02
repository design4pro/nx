import {
  detectPackageManager,
  readWorkspaceConfiguration,
  Tree,
} from '@nrwl/devkit';
import { stringUtils } from '@nrwl/workspace';

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
