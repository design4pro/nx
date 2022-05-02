import {
  getWorkspaceLayout,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { Schema } from '../schema';

export interface NormalizedSchema extends Schema {
  projectRoot: string;
  parsedTags: string[];
  importPath?: string;
}

export function normalizeOptions(
  tree: Tree,
  options: Schema
): NormalizedSchema {
  const { fileName } = names(options.displayName);

  const projectName = fileName.replace(new RegExp('/', 'g'), '-');

  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${fileName}`
    : fileName;

  const { libsDir, npmScope } = getWorkspaceLayout(tree);

  const projectRoot = joinPathFragments(libsDir, projectDirectory);

  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const defaultImportPath = `@${npmScope}/${projectDirectory}`;
  const importPath = options.importPath || defaultImportPath;

  if (!options.linter) {
    options.linter = Linter.EsLint;
  }

  if (options.strict === undefined) {
    options.strict = true;
  }

  let description: string;
  if (options.description) {
    description = options.description;
  } else {
    description = `${options.displayName} extension`;
  }

  return {
    ...options,
    name: options.name || projectName,
    description,
    projectRoot,
    parsedTags,
    importPath,
  };
}
