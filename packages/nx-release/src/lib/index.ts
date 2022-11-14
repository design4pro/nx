import { analyzeCommits as baseAnalyzeCommits } from '@semantic-release/commit-analyzer';
import { prepare as basePrepare } from '@semantic-release/exec';
import { generateNotes as baseGenerateNotes } from '@semantic-release/release-notes-generator';
import { Context } from 'semantic-release';
import { getProjectChangePaths } from './utils/nx';
import { WrappedPluginConfig, wrapPlugin } from './wrap-plugin';

const analyzeCommits = wrapPlugin(baseAnalyzeCommits);
const generateNotes = wrapPlugin(baseGenerateNotes);

const prepare = async (
  { project, projectRoot, buildOutput, ...pluginConfig }: WrappedPluginConfig,
  context: Context
) => {
  const { logger } = context;
  const formatFile = (file) => `nx format:write --files ${file}`;
  const copyFile = (file, dest) => `cp ${file} ${dest}`;


    const config = {
      ...pluginConfig,
      prepareCmd: [
        formatFile(`${projectRoot}/${changelogFile}`),
        copyFile(`${projectRoot}/${changelogFile}`, buildOutput),
        insertVersions(buildOutput),
      ].join(' && '),
      execCwd: pkgRoot,
    };

  return await basePrepare(pluginConfig, context);
};

export { analyzeCommits, generateNotes, prepare };
