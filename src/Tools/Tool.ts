import { z } from 'zod';
import type { ToolResultSchema } from '@/Tools/ToolResult';

export default abstract class Tool {
  abstract execute(): Promise<ToolResultSchema>;
  static getSchema(): z.ZodObject<any> {
    return z.object({});
  }

  abstract getParams(): z.infer<any>;
}