import { analyzeCommits as baseAnalyzeCommits } from '@semantic-release/commit-analyzer';
import { prepare as basePrepare } from '@semantic-release/exec';
import { generateNotes as baseGenerateNotes } from '@semantic-release/release-notes-generator';
import { Context } from 'semantic-release';
import { insertVersions } from './utils/insert-versions';
import { WrappedPluginConfig, wrapPlugin } from './wrap-plugin';

const analyzeCommits = wrapPlugin(baseAnalyzeCommits);
const generateNotes = wrapPlugin(baseGenerateNotes);

const prepare = async (
  { projectRoot, pkgRoot, changelogFile, ...pluginConfig }: WrappedPluginConfig,
  context: Context
) => {
  const formatFile = (file) => `nx format:write --files ${file}`;
  const copyFile = (file, dest) => `cp ${file} ${dest}`;

  const config = {
    ...pluginConfig,
    prepareCmd: [
      formatFile(`${projectRoot}/${changelogFile}`),
      copyFile(`${projectRoot}/${changelogFile}`, pkgRoot),
      insertVersions(pkgRoot as string),
    ].join(' && '),
    execCwd: pkgRoot,
  };

  return await basePrepare(config, context);
};

export { analyzeCommits, generateNotes, prepare };
