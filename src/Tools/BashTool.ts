import { exec } from 'child_process';
import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult, { ToolResultSchema } from '@/Tools/ToolResult';

const BashToolSchema = z.object({
  command: z.literal('bash'),
  arguments: z.string().describe('The full command to execute, for example: `grep foo -r -- ./src/ | head -n 10`'),
}).describe("The bash command to execute.");

type BashToolSchema = z.infer<typeof BashToolSchema>;

export default class BashTool implements Tool {
  private readonly params;

  constructor(input: BashToolSchema) {
    this.params = BashTool.getSchema().parse(input);
  }

  async execute() {
    return await new Promise((resolve: (result: ToolResultSchema) => void) => {
      exec(this.params.arguments, (error, stdout, stderr) => {
        if (error) {
          return resolve(ToolResult(
            error.code || 1,
            stderr.trim()
          ));
        }
        return resolve(ToolResult(
          0,
          stdout.trim()
        ));
      });
    });
  }

  static getSchema() {
    return BashToolSchema;
  }
}
