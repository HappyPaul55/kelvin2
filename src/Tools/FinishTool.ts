import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult from '@/Tools/ToolResult';

const FinishToolSchema = z.object({
  command: z.literal('finish'),
  success: z.boolean(),
}).describe('This should be called when there is more work that can be done. `success` is true if the problem was solved, otherwise it is false.');

type FinishToolSchema = z.infer<typeof FinishToolSchema>;

export default class FinishTool implements Tool {
  private readonly params;

  constructor(input: FinishToolSchema) {
    this.params = FinishTool.getSchema().parse(input);
  }

  async execute() {
    return ToolResult(
      0,
      'Task Completed',
    );
  }

  static getSchema() {
    return FinishToolSchema;
  }
}