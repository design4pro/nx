import { mocked } from 'jest-mock';
import { Commit } from 'semantic-release';
import { getPathCommitHashes } from './utils/git';
import { getProjectChangePaths } from './utils/nx';
import { wrapPlugin } from './wrap-plugin';

jest.mock('./utils/nx');
const mockedGetProjectChangePaths = mocked(getProjectChangePaths);
jest.mock('./utils/git');
const mockedGetPathCommitHashes = mocked(getPathCommitHashes);

describe('wrapPlugin', () => {
  beforeEach(() => {
    mockedGetProjectChangePaths.mockReset();
    mockedGetPathCommitHashes.mockReset();
  });

  it('Can wrap plugin function', () => {
    const wrapped = wrapPlugin(jest.fn());
    expect(wrapped).toBeTruthy();
    expect(typeof wrapped).toBe('function');
  });

  it('Can filter commits', async () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('result');
    jest.mock('./utils/git');
    const wrapped = wrapPlugin(plugin);

    mockedGetProjectChangePaths.mockReturnValue(Promise.resolve(['test1']));

    mockedGetPathCommitHashes.mockReturnValue(Promise.resolve(['test1']));

    const logger = {
      log: jest.fn(),
      error: jest.fn(),
    };

    const result = await wrapped({ project: 'test', config: 'config' }, {
      commits: [
        { commit: { long: 'test1', short: 'test1' } } as Commit,
        { commit: { long: 'test2', short: 'test2' } } as Commit,
      ],
      logger,
      env: {},
      cwd: '',
    } as any);

    expect(result).toBe('result');
    expect(plugin.mock.calls.length).toBe(1);
    expect(plugin.mock.calls[0][0].config).toBe('config');
    expect(plugin.mock.calls[0][1].commits.length).toBe(1);
    expect(plugin.mock.calls[0][1].commits[0].commit.long).toBe('test1');
  });

  it('can skip filtering if no project configured', async () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('result');
    const wrapped = wrapPlugin(plugin);

    const logger = {
      log: jest.fn(),
      error: jest.fn(),
    };

    const result = await wrapped({ project: null, config: 'config' }, {
      commits: [
        { commit: { long: 'test1', short: 'test1' } } as Commit,
        { commit: { long: 'test2', short: 'test2' } } as Commit,
      ],
      logger,
      env: {},
      cwd: '',
    } as any);

    expect(result).toBe('result');
    expect(plugin.mock.calls.length).toBe(1);
    expect(plugin.mock.calls[0][1].commits.length).toBe(2);
  });
});
