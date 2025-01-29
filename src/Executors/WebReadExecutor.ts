import { z } from 'zod';
import Executor from '@/Executors/Executor';
import ExecutorResponse from '@/Executors/ExecutorResponse';
import Turndown from 'turndown';

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
    try {
      const response = await fetch(this.params.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      if (!response.ok) {
        return ExecutorResponse(500, `Failed to fetch URL: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('text/html')) {
        return ExecutorResponse(400, `URL content is not HTML (Content-Type: ${contentType})`);
      }

      const html = await response.text();
      const turndownService = new Turndown();
      const markdown = turndownService.turndown(html);

      return ExecutorResponse(0, markdown);
    } catch (error) {
      return ExecutorResponse(500, `Error during web-read execution: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static getSchema() {
    return WebReadExecutorSchema;
  }
}