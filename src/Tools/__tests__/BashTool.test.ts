import BashTool from '@/Tools/BashTool';

describe('BashTool', () => {
  it('should execute successful commands', async () => {
    const tool = new BashTool({ command: 'bash', arguments: 'echo \"test output\"' });
    const result = await tool.execute();
    expect(result.exitCode).toBe(0);
    expect(result.output).toBe('test output');
  });

  it('should handle command errors', async () => {
    const tool = new BashTool({ command: 'bash', arguments: 'exit 1' });
    const result = await tool.execute();
    expect(result.exitCode).toBe(1);
  });

  it('should capture stderr output', async () => {
    const tool = new BashTool({ command: 'bash', arguments: 'ls non_existent_file' });
    const result = await tool.execute();
    expect(result.exitCode).not.toBe(0);
    expect(result.output).toContain('No such file or directory');
  });
});