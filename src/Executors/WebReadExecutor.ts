import { z } from 'zod';
import Executor from './Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';

const WebReadExecutorSchema = z.object({
  command: z.literal('web-read'),
  url: z.string().url(),
}).describe(`Read (convert to markdown) content from a webpage. You should prefer using the \`web_read\` tool over the \`browser\` tool, but do use the \`browser\` tool if you need to interact with a webpage (e.g., click a button, fill out a form, etc.).

You may use the \`web_read\` tool to read content from a webpage, and even search the webpage content using a Google search query (e.g., url=\`https://www.google.com/search?q=YOUR_QUERY\`).`);

type WebReadExecutorSchema = z.infer<typeof WebReadExecutorSchema>;

export default class WebReadExecutor implements Executor {
  private readonly params;

  constructor(input: WebReadExecutorSchema) {
    this.params = WebReadExecutor.getSchema().parse(input);
  }

  async execute() {
    return ExecutorResponse(
      255,
      'not implemented',
    );
  }

  static getSchema() {
    return WebReadExecutorSchema;
  }
}