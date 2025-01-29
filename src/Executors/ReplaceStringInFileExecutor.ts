import fs from 'fs/promises';
import { z } from 'zod';
import Executor from '@/Executors/Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const ReplaceStringInFileExecutorSchema = z.object({
  command: z.literal('replace-string-in-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  find: z.string(),
  replace: z.string()
}).describe("Does a find and replace in a file.");

type ReplaceStringInFileExecutorSchema = z.infer<typeof ReplaceStringInFileExecutorSchema>;

export default class ReplaceStringInFileExecutor implements Executor {
  private readonly params;

  constructor(input: ReplaceStringInFileExecutorSchema) {
    this.params = ReplaceStringInFileExecutor.getSchema().parse(input);
  }

  async execute() {
    try {
      const { path: filePath, find, replace } = this.params;
      
      const content = await fs.readFile(filePath, 'utf8');
      const newContent = content.split(find).join(replace);
      
      await fs.writeFile(filePath, newContent);
      return ExecutorResponse(0, '');
    } catch (error) {
      return ExecutorResponse(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return ReplaceStringInFileExecutorSchema;
  }
}
