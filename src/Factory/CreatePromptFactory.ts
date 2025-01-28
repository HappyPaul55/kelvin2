import executors from "@/Executors";
import { ExecutorResponseSchema } from "@/Executors/ExecutorResponse";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

function preludePrompt() {
    return `You are AI Code Agent, a very helpful AI assistant that can interact with a computer to create solutions and solve tasks.

<IMPORTANT>
* If user provides a path, you should NOT assume it's relative to the current working directory. Instead, you should explore the file system to find the file before working on it.
* When configuring git credentials, use "Paul Happy Hutchinson" as the user.name and "paul@lexiphanic.co.uk" as the user.email by default, unless explicitly instructed otherwise.
* The assistant MUST NOT include comments in the code unless they are necessary to describe non-obvious behavior.
</IMPORTANT>
`;
}

function header(text: string): string {
    return '============= ' + text + ' =============';
}

function functionsPrompt(): string {
    const result: string[] = [];

    // Give Function declaration.
    result.push(header('Functions'));
    result.push("You have access to the following functions:");
    const functionSchema = z.discriminatedUnion('command', executors.map(executor => executor.getSchema()) as any);
    result.push(JSON.stringify(zodToJsonSchema(functionSchema, "FunctionSchema"), null, 2), "");

    // Explain the output.
    result.push("The response format will always be the same and is defined as:")
    result.push(JSON.stringify(zodToJsonSchema(ExecutorResponseSchema, "ResultSchema"), null, 2), "");

    // End block
    result.push(header('End Functions'), "");

    return result.join("\r\n");
}

function examplesPrompt() {
    const result: string[] = [];

    // Create an example journey.
    result.push(header('Example'));
    result.push('Here is an example');
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

    result.push(header('End Example'));

    result.push("", "Do NOT assume the environment is the same as in the example above.", "");

    result.push(header('New Task Description'));

    result.push(`PLEASE follow the format strictly! **PLEASE EMIT ONE AND ONLY ONE FUNCTION CALL PER MESSAGE.**

Please look at the README and make the following improvements, if they make sense:
* correct any typos that you find
* add missing language annotations on codeblocks
* if there are references to other files or other sections of the README, turn them into links
* make sure the readme has an h1 title towards the top
* make sure any existing sections in the readme are appropriately separated with headings

If there are no obvious ways to improve the README, make at least one small change to make the wording clearer or friendlier
    `)

    return result.join("\r\n");
}

export default function CreatePromptFactory(): string {
    const prompt: string[] = [];

    prompt.push(preludePrompt());
    prompt.push(functionsPrompt());
    prompt.push(examplesPrompt());


    return prompt.join("\r\n");
}

console.log(CreatePromptFactory());