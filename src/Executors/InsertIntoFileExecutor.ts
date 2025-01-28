import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const InsertIntoFileExecutorSchema = z.object({
  command: z.literal('insert-into-file'),
  path: z.string().min(1),
  new_str: z.string(),
  insert_line: z.number().int().positive(),
});

type InsertIntoFileExecutorSchema = z.infer<typeof InsertIntoFileExecutorSchema>;

export default class InsertIntoFileExecutor implements Executor {
  private readonly params;

  constructor(input: InsertIntoFileExecutorSchema) {
    this.params = InsertIntoFileExecutor.getSchema().parse(input);
  }

  async execute() {
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return InsertIntoFileExecutorSchema;
  }
}