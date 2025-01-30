import { z } from 'zod';
import Tool from '@/Tools/Tool';

const StartAgentToolSchema = z.object({
  command: z.literal('start-agent'),
  agent: z.enum(["developer"]),
  task: z.string(),
}).describe("Assign a task to an agent.");

type StartAgentToolSchema = z.infer<typeof StartAgentToolSchema>;

export default class StartAgentTool implements Tool {
  private readonly params;

  constructor(input: StartAgentToolSchema) {
    this.params = StartAgentTool.getSchema().parse(input);
  }

  async execute() {
    return {
      exitCode: 0,
      output: 'Task assigned',
    };
  }

  static getSchema() {
    return StartAgentToolSchema;
  }
}
