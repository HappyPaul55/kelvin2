import BashExecutor from '../BashExecutor';

describe('BashExecutor', () => {
  it('should execute successful commands', async () => {
    const executor = new BashExecutor({ command: 'bash', arguments: 'echo \"test output\"' });
    const result = await executor.execute();
    expect(result.exitCode).toBe(0);
    expect(result.output).toBe('test output');
  });

  it('should handle command errors', async () => {
    const executor = new BashExecutor({ command: 'bash', arguments: 'exit 1' });
    const result = await executor.execute();
    expect(result.exitCode).toBe(1);
  });

  it('should capture stderr output', async () => {
    const executor = new BashExecutor({ command: 'bash', arguments: 'ls non_existent_file' });
    const result = await executor.execute();
    expect(result.exitCode).not.toBe(0);
    expect(result.output).toContain('No such file or directory');
  });
});