import fs from 'fs/promises';
import { z } from 'zod';
import Executor from '@/Executors/Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const InsertIntoFileExecutorSchema = z.object({
  command: z.literal('insert-into-file'),
  path: z.string().min(1).describe('For example: `/workspace/src/index.ts`'),
  new_str: z.string(),
  insert_line: z.number().int().positive(),
}).describe('Insert a line into a file at a specific line number.');

type InsertIntoFileExecutorSchema = z.infer<typeof InsertIntoFileExecutorSchema>;

export default class InsertIntoFileExecutor implements Executor {
  private readonly params;

  constructor(input: InsertIntoFileExecutorSchema) {
    this.params = InsertIntoFileExecutor.getSchema().parse(input);
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
      return ExecutorResponse(0, '');
    } catch (error) {
      return ExecutorResponse(
        1,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }

  static getSchema() {
    return InsertIntoFileExecutorSchema;
  }
}
