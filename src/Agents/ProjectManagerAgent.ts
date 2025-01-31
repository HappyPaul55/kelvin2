import CreateToolsPrompt from "@/Prompts/CreateToolsPrompt";
import Bold from "@/Prompts/Styling/Bold";
import Header from "@/Prompts/Styling/Header";
import FinishTool from "@/Tools/FinishTool";
import WebReadTool from "@/Tools/WebReadTool";
import Agent from "@/Agents/Agent";
import AskQuestionTool from "@/Tools/AskQuestionTool";
import StartAgentTool from "@/Tools/StartAgentTool";

export default class ProjectManagerAgent extends Agent {
  prompt(task: string): string {
    const prompt: string[] = [];

    prompt.push(Bold("You are a Manager at a company and have been given a task to oversee."));
    prompt.push(`
    You have access to a team of skilled professionals. Look at the task, confirm if it's actionable,
    ask questions or search the web using the functions defined below. Do not do the task yourself,
    you just assign it to someone else using the start agent command.
  `);

    prompt.push(CreateToolsPrompt([
      AskQuestionTool,
      WebReadTool,
      StartAgentTool,
      FinishTool,
    ]));

    prompt.push(Header('Example'));
    prompt.push(
      'USER: Create an express server that shows "great success" when you go to "/testy/westy".',
      `ASSISTANT: **Step 1:** Assign the task to a developer agent since this requires coding expertise.
{
  "command": "start-agent",
  "agent": "developer",
  "task": "Create an Express server with a GET endpoint at path '/testy/westy' that returns the text 'great success'. Ensure the server listens on port 3000 and includes proper error handling. Use Express version 4.x+."
}
    `,
      `USER: 
{
  exitCode: 0,
  output: 'Server created with unit tests',
}
    `,
      `ASSISTANT: **Step 2:** Verify the implementation works as specified by testing the endpoint.
{
  "command": "start-agent",
  "agent": "developer",
  "task": "1. Start the Express server\n2. Test endpoint using \`curl http://localhost:3000/car\`\n3. Verify response contains 'goes fast'\n4. Ensure proper server shutdown after testing"
}
    `,
      `USER: 
{
  exitCode: 0,
  output: 'Success',
}
    `,

      `ASSISTANT:
{
  "command": "finish"
}
    `,
    );
    prompt.push(Header('End Example'));

    prompt.push(Header('New Task Description'));
    prompt.push(`PLEASE follow the format strictly! ${Bold('PLEASE EMIT ONE AND ONLY ONE FUNCTION CALL PER MESSAGE.')}

${task}
  `)

    return prompt.join("\r\n");
  }
}