import { getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { Schema } from '../schema';

export interface NormalizedSchema extends Schema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

export function normalizeOptions(
  tree: Tree,
  options: Schema
): NormalizedSchema {
  const { fileName } = names(options.name);
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${fileName}`
    : fileName;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const { appsDir } = getWorkspaceLayout(tree);
  const projectRoot = `${appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}
