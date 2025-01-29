import { exec } from 'child_process';
import { z } from 'zod';
import Executor from '@/Executors/Executor';
import ExecutorResponse, { ExecutorResponseSchema } from '@/Executors/ExecutorResponse';

const BashExecutorSchema = z.object({
  command: z.literal('bash'),
  arguments: z.string().describe('The full command to execute, for example: `grep foo -r -- ./src/ | head -n 10`'),
}).describe("The bash command to execute.");

type BashExecutorSchema = z.infer<typeof BashExecutorSchema>;

export default class BashExecutor implements Executor {
  private readonly params;

  constructor(input: BashExecutorSchema) {
    this.params = BashExecutor.getSchema().parse(input);
  }

  async execute() {
    return await new Promise((resolve: (result: ExecutorResponseSchema) => void) => {
      exec(this.params.arguments, (error, stdout, stderr) => {
        if (error) {
          return resolve(ExecutorResponse(
            error.code || 1,
            stderr.trim()
          ));
        }
        return resolve(ExecutorResponse(
          0,
          stdout.trim()
        ));
      });
    });
  }

  static getSchema() {
    return BashExecutorSchema;
  }
}
