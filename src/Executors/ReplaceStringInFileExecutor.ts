import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const ReplaceStringInFileExecutorSchema = z.object({
  command: z.literal('replace-string-in-file'),
  path: z.string().min(1),
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
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return ReplaceStringInFileExecutorSchema;
  }
}