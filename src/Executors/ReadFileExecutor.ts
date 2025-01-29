import fs from 'fs/promises';
import { z } from 'zod';
import Executor from '@/Executors/Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const ReadFileExecutorSchema = z.object({
  command: z.literal('read-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  range: z
    .tuple([
      z.number().int().positive(),
      z.number().int().positive(),
    ])
    .optional(),
}).describe("Reads a file, if range is defined, only the requested lines will be read.");

type ReadFileExecutorSchema = z.infer<typeof ReadFileExecutorSchema>;

export default class ReadFileExecutor implements Executor {
  private readonly params;

  constructor(input: ReadFileExecutorSchema) {
    this.params = ReadFileExecutor.getSchema().parse(input);
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

      return ExecutorResponse(0, lines.join('\n'));
    } catch (error) {
      return ExecutorResponse(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return ReadFileExecutorSchema;
  }
}
