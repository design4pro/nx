import * as merge from 'deepmerge';
import { createCommitTransformerWithScopeFilter } from './utils/commit-transformer';
import { createReleaseRulesWithScopeFilter } from './utils/release-rules';

const formatFile = (file) => `nx format:write --files ${file}`;
const copyFile = (file, dest) => `cp ${file} ${dest}`;
const toolsScript = (script: string, ...args) =>
  ['node', `./node_modules/@design4pro/nx-release/src/${script}`, ...args].join(
    ' '
  );

const insertVersions = (buildOutput) =>
  toolsScript('lib/utils/insert-versions.js', buildOutput);

export function createReleaseConfigWithScopeFilter({
  projectScope,
  projectRoot,
  buildOutput,
  options = {},
  changelogFile = 'CHANGELOG.md',
}) {
  projectRoot = projectRoot || `packages/${projectScope}`;
  buildOutput = buildOutput || `dist/packages/${projectScope}`;

  const releaseCommit = `chore(${projectScope}): release \${nextRelease.version}\n\n\${nextRelease.notes}\n\n***\n[skip ci]`;
  
  return merge(
    {
      plugins: [
        [
          '@semantic-release/commit-analyzer',
          {
            preset: 'angular',
            releaseRules: createReleaseRulesWithScopeFilter(projectScope),
            parserOpts: {
              noteKeywords: ['BREAKING', 'BREAKING CHANGE', 'BREAKING CHANGES'],
            },
          },
        ],
        ['@semantic-release/release-notes-generator', { preset: 'angular' }],
        [
          '@semantic-release/changelog',
          { changelogFile: `${projectRoot}/${changelogFile}` },
        ],
        [
          '@semantic-release/github',
          {
            releasedLabels: ['released'],
          },
        ],
        ['@semantic-release/npm', { pkgRoot: buildOutput }],
        [
          '@semantic-release/exec',
          {
            prepareCmd: [
              formatFile(`${projectRoot}/${changelogFile}`),
              copyFile(`${projectRoot}/${changelogFile}`, buildOutput),
              insertVersions(buildOutput),
            ].join(' && '),
          },
        ],
        [
          '@semantic-release/git',
          {
            assets: [`${projectRoot}/${changelogFile}`],
            message: releaseCommit,
          },
        ],
      ],
      writerOpts: {
        transform: createCommitTransformerWithScopeFilter(projectScope),
      },
      tagFormat: `${projectScope}/v\${version}`,
      branches: [
        'main',
        { name: 'beta', prerelease: true },
        { name: 'alpha', prerelease: true },
      ],
    },
    options
  );
}
