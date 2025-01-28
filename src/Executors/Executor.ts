import { z } from 'zod';
import type { ExecutorResponseSchema } from '@/Executors/ExecutorResponse';

export default abstract class Executor {
  abstract execute(): Promise<ExecutorResponseSchema>;
  static getSchema(): z.ZodObject<any> {
    return z.object({});
  }
}