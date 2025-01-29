import fs from 'fs/promises';
import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult from '@/Tools/ToolResult';

const ReadFileToolSchema = z.object({
  command: z.literal('read-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  range: z
    .tuple([
      z.number().int().positive(),
      z.number().int().positive(),
    ])
    .optional(),
}).describe("Reads a file, if range is defined, only the requested lines will be read.");

type ReadFileToolSchema = z.infer<typeof ReadFileToolSchema>;

export default class ReadFileTool implements Tool {
  private readonly params;

  constructor(input: ReadFileToolSchema) {
    this.params = ReadFileTool.getSchema().parse(input);
  }

  async execute() {
    try {
      const { path: filePath, range } = this.params;
      
      const content = await fs.readFile(filePath, 'utf8');
      let lines = content.split('\n');

      if (range) {
        const [startLine, endLine] = range;
        const startIndex = Math.max(0, startLine - 1);
        const endIndex = endLine;
        lines = lines.slice(startIndex, endIndex);
      }

      return ToolResult(0, lines.join('\n'));
    } catch (error) {
      return ToolResult(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return ReadFileToolSchema;
  }
}
