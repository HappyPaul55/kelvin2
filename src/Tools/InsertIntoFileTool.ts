import fs from 'fs/promises';
import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult from '@/Tools/ToolResult';

const InsertIntoFileToolSchema = z.object({
  command: z.literal('insert-into-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  new_str: z.string(),
  insert_line: z.number().int().positive(),
}).describe('Insert a line into a file at a specific line number.');

type InsertIntoFileToolSchema = z.infer<typeof InsertIntoFileToolSchema>;

export default class InsertIntoFileTool implements Tool {
  private readonly params;

  constructor(input: InsertIntoFileToolSchema) {
    this.params = InsertIntoFileTool.getSchema().parse(input);
  }

  async execute() {
    try {
      const { path: filePath, new_str, insert_line } = this.params;
      
      const content = await fs.readFile(filePath, 'utf8');
      let lines = content.split('\n');
      
      const desiredIndex = insert_line - 1;
      
      if (desiredIndex >= lines.length) {
        const linesToAdd = desiredIndex - lines.length;
        for (let i = 0; i < linesToAdd; i++) {
          lines.push('');
        }
        lines.push(new_str);
      } else {
        lines.splice(desiredIndex, 0, new_str);
      }
      
      await fs.writeFile(filePath, lines.join('\n'));
      return ToolResult(0, '');
    } catch (error) {
      return ToolResult(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return InsertIntoFileToolSchema;
  }
}
