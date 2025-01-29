import CreateExamplePrompt from "@/Prompts/CreateExamplePrompt";
import CreateFunctionsPrompt from "@/Prompts/CreateFunctionsPrompt";
import CreatePreludePrompt from "@/Prompts/CreatePreludePrompt";
import CreateStatePrompt from "@/Prompts/CreateStatePrompt";
import Bold from "@/Prompts/Styling/Bold";
import Header from "@/Prompts/Styling/Header";

export default function DeveloperAgent(task: string): string {
  const prompt: string[] = [];

  prompt.push(CreatePreludePrompt());
  prompt.push(CreateFunctionsPrompt([]));
  prompt.push(CreateExamplePrompt([
    Header('Example'),
    Bold('Here is an example'),
    'USER: Create an express server that shows "great success" when you go to "/testy/westy".',
    `ASSISTANT: To create an Express server that shows "great success" when you navigate to "/testy/westy", we'll follow these steps:
1) Initialize a new Node.js project: This will create a package.json file.
2) Install Express: We'll add Express as a dependency.
3) Create the Express server: We'll write the server code in a file (e.g., index.js).
4) Run the server: Finally, we'll start the server.

\`\`\`
{
    "command": "bash",
    "arguments": "pnpm init -y"
}
\`\`\`
    `,

    `USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":{"name":"workspace","version":"1.0.0","description":"","main":"index.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":[],"author":"","license":"ISC"}}
\`\`\`
    `,
    `ASSISTANT: EXECUTION RESULT of [bash]:
Wrote to /workspace/package.json
\`\`\`
{
    "command": "bash",
    "arguments": "pnpm install express"
}
\`\`\`
    `,
    `USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":"Packages: +69\\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\\nProgress: resolved 69, reused 69, downloaded 0, added 69, done\\n\\ndependencies:\\n+ express 4.21.2\\n\\nDone in 1.3s"}
\`\`\`
    `,
    `ASSISTANT: Now that Express is installed, we'll create the Express server. The server will listen on a port and respond with "great success" when you navigate to "/testy/westy".
\`\`\`
{
    "command": "create-file",
    "path": "index.js",
    "contents": "const express = require('express');\nconst app = express();\n\napp.get('/testy/westy', (req, res) => {\n res.send('great success');\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => {\n console.log(\`Server is running on port \${PORT}\`);\n});"
}
\`\`\`
    `,
    `USER: EXECUTION RESULT of [create-file]:
\`\`\`
{"exitCode":0,"output":""}
\`\`\`
    `,
    `ASSISTANT: Now lets create the server.
\`\`\`
{
    "command": "bash",
    "arguments": "node index.js &",
}
\`\`\`
    `,
    `USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":"[1] 52701"}
\`\`\`
    `,

    `ASSISTANT: The server is running, lets test the endpoint.
\`\`\`
{
    "command": "bash",
    "arguments": "curl http://localhost:3000/testy/westy"
}
\`\`\`
    `,

    `USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":"great success"}
\`\`\`
    `,
    Header('End Example'),
    "",
    Bold("Do NOT assume the environment is the same as in the example above."),
    "",
  ].join("\r\n")));
  prompt.push(CreateStatePrompt());

  prompt.push(Header('New Task Description'));

  prompt.push(`PLEASE follow the format strictly! ${Bold('PLEASE EMIT ONE AND ONLY ONE FUNCTION CALL PER MESSAGE.')}

${task}
  `)

  return prompt.join("\r\n");
}