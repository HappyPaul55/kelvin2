import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const FinishExecutorSchema = z.object({
  command: z.literal('finish'),
  success: z.boolean(),
}).describe('This should be called when there is more work that can be done. `success` is true if the problem was solved, otherwise it is false.');

type FinishExecutorSchema = z.infer<typeof FinishExecutorSchema>;

export default class FinishExecutor implements Executor {
  private readonly params;

  constructor(input: FinishExecutorSchema) {
    this.params = FinishExecutor.getSchema().parse(input);
  }

  async execute() {
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return FinishExecutorSchema;
  }
}