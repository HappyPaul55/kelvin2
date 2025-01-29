import { z } from "zod";

export const ToolResultSchema = z.object({
  exitCode: z.number().nonnegative(),
  output: z.string().optional(),
}).describe("The result of the command, exit code is an unix exit code where 0 is success. You will also get the output of the command, or if it fails you will get the error output.");
export type ToolResultSchema = z.infer<typeof ToolResultSchema>;

export default function ToolResult(exitCode: number, output?: string): ToolResultSchema {
  return {
    exitCode,
    output,
  };
}