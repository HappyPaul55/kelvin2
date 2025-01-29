import Header from "@/Prompts/Styling/Header";
import Bold from "@/Prompts/Styling/Bold";

export default function CreateExamplePrompt(example: string): string {
  const result: string[] = [];

  // Create an example journey.
  result.push(Header('Example'));
  result.push(Bold('Here is an example'));
  result.push('USER: Create an express server that shows "great success" when you go to "/testy/westy".');
  result.push(`ASSISTANT: To create an Express server that shows "great success" when you navigate to "/testy/westy", we'll follow these steps:
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
  `);

  result.push(`USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":{"name":"workspace","version":"1.0.0","description":"","main":"index.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":[],"author":"","license":"ISC"}}
\`\`\`
  `);

  result.push(`ASSISTANT: EXECUTION RESULT of [bash]:
Wrote to /workspace/package.json
\`\`\`
{
  "command": "bash",
  "arguments": "pnpm install express"
}
\`\`\`
  `);

  result.push(`USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":"Packages: +69\\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\\nProgress: resolved 69, reused 69, downloaded 0, added 69, done\\n\\ndependencies:\\n+ express 4.21.2\\n\\nDone in 1.3s"}
\`\`\`
  `);

  result.push(`ASSISTANT: Now that Express is installed, we'll create the Express server. The server will listen on a port and respond with "great success" when you navigate to "/testy/westy".
\`\`\`
{
  "command": "create-file",
  "path": "index.js",
  "contents": "const express = require('express');\nconst app = express();\n\napp.get('/testy/westy', (req, res) => {\n res.send('great success');\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => {\n console.log(\`Server is running on port \${PORT}\`);\n});"
}
\`\`\`
  `);

  result.push(`USER: EXECUTION RESULT of [create-file]:
\`\`\`
{"exitCode":0,"output":""}
\`\`\`
  `);

  result.push(`ASSISTANT: Now lets create the server.
\`\`\`
{
  "command": "bash",
  "arguments": "node index.js &",
}
\`\`\`
  `);

  result.push(`USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":"[1] 52701"}
\`\`\`
  `);

  result.push(`ASSISTANT: The server is running, lets test the endpoint.
\`\`\`
{
  "command": "bash",
  "arguments": "curl http://localhost:3000/testy/westy"
}
\`\`\`
  `);

  result.push(`USER: EXECUTION RESULT of [bash]:
\`\`\`
{"exitCode":0,"output":"great success"}
\`\`\`
  `);

  result.push(Header('End Example'));

  result.push(
    "",
    Bold("Do NOT assume the environment is the same as in the example above."),
    "",
  );

  return result.join("\r\n");
}