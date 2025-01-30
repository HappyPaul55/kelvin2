import { exec } from 'child_process';
import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult, { ToolResultSchema } from '@/Tools/ToolResult';

const AskQuestionToolSchema = z.object({
  command: z.literal('ask-question'),
  arguments: z.string().describe('The full command to execute, for example: `grep foo -r -- ./src/ | head -n 10`'),
}).describe("The bash command to execute.");

type AskQuestionToolSchema = z.infer<typeof AskQuestionToolSchema>;

export default class AskQuestionTool implements Tool {
  private readonly params;

  constructor(input: AskQuestionToolSchema) {
    this.params = AskQuestionTool.getSchema().parse(input);
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
    return AskQuestionToolSchema;
  }
}
