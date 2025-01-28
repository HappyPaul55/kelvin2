import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const CreateFileExecutorSchema = z.object({
  command: z.literal('create-file'),
  path: z.string().min(1),
  contents: z.string().or(z.record(z.any())),
}).describe("Create a file with the contents provided.");

type CreateFileExecutorSchema = z.infer<typeof CreateFileExecutorSchema>;

export default class CreateFileExecutor implements Executor {
  private readonly params;

  constructor(input: CreateFileExecutorSchema) {
    this.params = CreateFileExecutor.getSchema().parse(input);
  }

  async execute() {
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return CreateFileExecutorSchema;
  }
}