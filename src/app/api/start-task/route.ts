import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import GetTool from '@/Engine/GetTool';
import DeveloperAgent from '@/Agents/DeveloperAgent';
import InvokeAgent from '@/Tools/InvokeAgent';

const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: 'http://172.27.128.1:1234/v1',
});

export async function GET(): Promise<NextResponse> {
  const userSaidWhat = 'Create an express server. When you go to `/car` it return "goes fast".'
  let task = new InvokeAgent({
    command: 'invoke-agent',
    agent: 'developer',
    task: userSaidWhat,
  });

  let agent = new DeveloperAgent()
  do {
    let { text } = await generateText({
      model: lmstudio('deepseek-coder-v2-lite-instruct'),
      prompt: agent.prompt(task),
    });
  
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
  } while(task);

  return new NextResponse(
    "{}",
    {
      status: 200,
    },
  );
}