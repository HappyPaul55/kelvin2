import { z } from "zod";

export const ExecutorResponseSchema = z.object({
    exitCode: z.number().nonnegative(),
    output: z.string().optional(),
}).describe("The result of the command, exit code is an unix exit code where 0 is success. You will also get the output of the command, or if it fails you will get the error output.");
export type ExecutorResponseSchema = z.infer<typeof ExecutorResponseSchema>;

export default function ExecutorResponse(exitCode: number, output?: string): ExecutorResponseSchema {
    return {
        exitCode,
        output,
    };
}