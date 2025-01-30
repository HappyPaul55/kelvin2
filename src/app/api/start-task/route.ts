import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import ManagerAgent from '@/Agents/ManagerAgent';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import GetTool from '@/Engine/GetTool';
import DeveloperAgent from '@/Agents/DeveloperAgent';

const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: 'http://172.27.128.1:1234/v1',
});

async function executeTask(task: string) {
  // Generate text based on the current task
  let { text } = await generateText({
    model: lmstudio('deepseek-coder-v2-lite-instruct'),
    prompt: DeveloperAgent(task),
  });

  console.log(text);
  console.log("");
  console.log("");
  console.log("");

  // Extract the JSON part from the generated text
  const textParts = text.trim().split('```json');
  if (textParts.length > 1) {
    text = textParts[1].replace(/```$/, '');
  }

  // Parse the JSON and get the corresponding tool
  const tool = GetTool(JSON.parse(text));
  if (tool === undefined) {
    return new NextResponse('No tool found', { status: 200 });
  }

  // Execute the tool and get the response
  const toolResponse = await tool.execute();

  console.log(JSON.stringify(toolResponse, null, 2));
  console.log("");
  console.log("");
  console.log("");

  // Use the tool's response as the next prompt
  return await executeTask(JSON.stringify(toolResponse));
}

export async function GET(req: Request) {
  const task = 'Create an express server. When you go to `/car` it return "goes fast".';

  let { text } = await generateText({
    model: lmstudio('deepseek-coder-v2-lite-instruct'),
    prompt: DeveloperAgent(task),
  });

  const food = await executeTask(text);

  return new NextResponse(
    "{}",
    {
      status: 200,
    },
  );
}
