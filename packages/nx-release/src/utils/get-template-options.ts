import { readWorkspaceConfiguration, Tree } from '@nx/devkit';

export function getTemplateOptions(tree: Tree) {
  const { npmScope } = readWorkspaceConfiguration(tree);

  return {
    template: '',
    dot: '.',
    npmScope: npmScope,
  };
}
