import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const BashExecutorSchema = z.object({
  command: z.literal('bash'),
  arguments: z.string(),
  is_input: z.boolean()
    .optional()
    .default(false)
    .describe("If True, the command is an input to the running process. If False, the command is a bash command to be executed in the terminal. Default is False.")
}).describe("The bash command to execute. Can be empty string to view additional logs when previous exit code is `-1`. Can be `C-c` (Ctrl+C) to interrupt the currently running process.");

type BashExecutorSchema = z.infer<typeof BashExecutorSchema>;

export default class BashExecutor implements Executor {
  private readonly params;

  constructor(input: BashExecutorSchema) {
    this.params = BashExecutor.getSchema().parse(input);
  }

  async execute() {
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return BashExecutorSchema;
  }
}