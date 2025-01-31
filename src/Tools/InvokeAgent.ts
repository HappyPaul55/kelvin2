import { z } from 'zod';
import Tool from '@/Tools/Tool';
import ToolResult from '@/Tools/ToolResult';

const InvokeAgentSchema = z.object({
  command: z.literal('invoke-agent'),
  agent: z.enum(['developer']),
  task: z.string().min(10),
}).describe('This is used to send a task to a different agent.');

type InvokeAgentSchema = z.infer<typeof InvokeAgentSchema>;

export default class InvokeAgent implements Tool {
  private readonly params: InvokeAgentSchema;
  constructor(input: InvokeAgentSchema) {
    this.params = InvokeAgent.getSchema().parse(input);
  }

  async execute() {
    return ToolResult(
      255,
      'not implemented',
    );
  }

  public getParams() {
    return this.params;
  }

  static getSchema() {
    return InvokeAgentSchema;
  }
}