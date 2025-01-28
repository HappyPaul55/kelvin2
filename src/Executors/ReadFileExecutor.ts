import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const ReadFileExecutorSchema = z.object({
  command: z.literal('read-file'),
  path: z.string(),
  range: z
    .tuple([
      z.number().int().positive(),
      z.number().int().positive(),
    ])
    .optional()
    .describe("Reads a file, if range is defined, only certain lines will be read."),
});

type ReadFileExecutorSchema = z.infer<typeof ReadFileExecutorSchema>;

export default class ReadFileExecutor implements Executor {
  private readonly params;

  constructor(input: ReadFileExecutorSchema) {
    this.params = ReadFileExecutor.getSchema().parse(input);
  }

  async execute() {
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return ReadFileExecutorSchema;
  }
}