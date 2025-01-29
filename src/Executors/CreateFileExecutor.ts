import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import Executor from '@/Executors/Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const CreateFileExecutorSchema = z.object({
  command: z.literal('create-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  contents: z.union([z.string(), z.record(z.any())]),
}).describe("Create a file with the contents provided.");

type CreateFileExecutorSchema = z.infer<typeof CreateFileExecutorSchema>;

export default class CreateFileExecutor implements Executor {
  private readonly params;

  constructor(input: CreateFileExecutorSchema) {
    this.params = CreateFileExecutor.getSchema().parse(input);
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
      return ExecutorResponse(0, '');
    } catch (error) {
      return ExecutorResponse(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return CreateFileExecutorSchema;
  }
}