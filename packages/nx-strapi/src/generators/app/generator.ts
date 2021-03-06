import { normalize } from '@angular-devkit/core';
import {
  addProjectConfiguration,
  formatFiles,
  getWorkspaceLayout,
  names,
  Tree,
} from '@nrwl/devkit';
import * as generateStrapi from 'strapi-generate-new';
import { NxStrapiGeneratorSchema } from './schema';

interface NormalizedSchema extends NxStrapiGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: NxStrapiGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = normalize(
    `${getWorkspaceLayout(host).appsDir}/${projectDirectory}`
  );
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

export default async function (
  host: Tree,
  options: NxStrapiGeneratorSchema
): Promise<void> {
  const normalizedOptions = normalizeOptions(host, options);

  addProjectConfiguration(host, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@design4pro/nx-strapi:build',
      },
      serve: {
        executor: '@design4pro/nx-strapi:develop',
      },
    },
    tags: normalizedOptions.parsedTags,
  });

  await generateStrapi(normalizedOptions.projectRoot, {
    quickstart: true,
    run: false,
  });

  await formatFiles(host);
}
