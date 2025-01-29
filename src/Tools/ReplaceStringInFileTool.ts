import fs from 'fs/promises';
import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult from '@/Tools/ToolResult';

const ReplaceStringInFileToolSchema = z.object({
  command: z.literal('replace-string-in-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  find: z.string(),
  replace: z.string()
}).describe("Does a find and replace in a file.");

type ReplaceStringInFileToolSchema = z.infer<typeof ReplaceStringInFileToolSchema>;

export default class ReplaceStringInFileTool implements Tool {
  private readonly params;

  constructor(input: ReplaceStringInFileToolSchema) {
    this.params = ReplaceStringInFileTool.getSchema().parse(input);
  }

  async execute() {
    try {
      const { path: filePath, find, replace } = this.params;
      
      const content = await fs.readFile(filePath, 'utf8');
      const newContent = content.split(find).join(replace);
      
      await fs.writeFile(filePath, newContent);
      return ToolResult(0, '');
    } catch (error) {
      return ToolResult(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return ReplaceStringInFileToolSchema;
  }
}
