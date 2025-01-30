import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult from '@/Tools/ToolResult';

const CreateFileToolSchema = z.object({
  command: z.literal('create-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  contents: z.union([z.string(), z.record(z.any())]),
}).describe("Create a file with the contents provided.");

type CreateFileToolSchema = z.infer<typeof CreateFileToolSchema>;

export default class CreateFileTool implements Tool {
  private readonly params;

  constructor(input: CreateFileToolSchema) {
    this.params = CreateFileTool.getSchema().parse(input);
  }

  async execute() {
    try {
      const { path: filePath, contents } = this.params;
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });

      const data = typeof contents === 'string'
        ? contents
        : JSON.stringify(contents, null, 2);

      await fs.writeFile(filePath, data);
      return ToolResult(0, 'File Created');
    } catch (error) {
      return ToolResult(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return CreateFileToolSchema;
  }
}