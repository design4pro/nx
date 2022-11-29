import { ChildProcess, spawn } from 'child_process';
import { mocked } from 'jest-mock';
import { ReadableStreamBuffer } from 'stream-buffers';
import { getPathCommitHashes } from './git';

jest.mock('child_process');
const mockedSpawn = mocked(spawn);

describe('git-utils', () => {
  beforeEach(() => {
    mockedSpawn.mockReset();
  });

  describe('getPathCommitHashes', () => {
    it('can get commits', async () => {
      const stream = new ReadableStreamBuffer();
      stream.put('test1\ntest2\n');
      stream.stop();

      mockedSpawn.mockReturnValue({
        stdout: stream,
      } as unknown as ChildProcess);
      const commits = await getPathCommitHashes('test', ['test'], '', 'HEAD');

      expect(commits.length).toBe(2);
      expect(commits[0]).toBe('test1');
      expect(commits[1]).toBe('test2');
      expect(mockedSpawn.mock.calls.length).toBe(1);
    });
  });
});