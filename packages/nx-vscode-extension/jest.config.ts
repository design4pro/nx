/* eslint-disable */
export default {
  displayName: 'nx-vscode-extension',
  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/nx-vscode-extension',
  preset: '../../jest.preset.js',
};
