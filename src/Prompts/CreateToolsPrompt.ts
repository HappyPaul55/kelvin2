import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { ToolResultSchema } from "@/Tools/ToolResult";
import Tool from "@/Tools/Tool";
import Header from "@/Prompts/Styling/Header";
import Bold from "@/Prompts/Styling/Bold";

export default function CreateToolsPrompt(tools: { getSchema: typeof Tool.getSchema }[]): string {
  const result: string[] = [];

  // Give Function declaration.
  result.push(Header('Functions'));
  result.push(Bold("You have access to the following functions:"));
  const functionSchema = z.discriminatedUnion('command', tools.map(tool => tool.getSchema()) as any);
  result.push(JSON.stringify(zodToJsonSchema(functionSchema, "FunctionSchema"), null, 2), "");

  // Explain the output.
  result.push("The response format will always be the same and is defined as:")
  result.push(JSON.stringify(zodToJsonSchema(ToolResultSchema, "ResultSchema"), null, 2), "");

  // End block
  result.push(Header('End Functions'), "");

  return result.join("\r\n");
}