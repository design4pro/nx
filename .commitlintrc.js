const { value } = require('@commitlint/config-angular-type-enum');
const {
  utils: { getProjects },
} = require('@commitlint/config-nx-scopes');

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'body-leading-blank': [0, 'never'],
    'type-enum': [2, 'always', ['chore', ...value()]],
    'scope-empty': [0],
    'scope-enum': (ctx) =>
      getProjects(ctx).then((packages) => [
        2,
        'always',
        [...packages, ...value(), 'package'],
      ]),
  },
  ignores: [(message) => message.toLowerCase().startsWith('wip')],
};
