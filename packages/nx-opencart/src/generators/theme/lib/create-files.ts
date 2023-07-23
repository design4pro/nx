import type { Tree } from '@nx/devkit';
import { generateFiles, names, offsetFromRoot } from '@nx/devkit';
import { NormalizedSchema } from './normalize-options';
import { joinPathFragments } from 'nx/src/utils/path';

export function createFiles(tree: Tree, options: NormalizedSchema): void {
  const fileName = names(options.name).fileName.replace(/[/-]/g, '_');

  const templateOptions = {
    ...options,
    ...names(options.name),
    fileName,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(
    tree,
    joinPathFragments(__dirname, '..', 'files'),
    options.projectRoot,
    templateOptions
  );
}
