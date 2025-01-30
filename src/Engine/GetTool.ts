import Tools from "@/Tools";
import Tool from "@/Tools/Tool";

export default function GetTool(event: object): Tool|undefined {
    for (const tool of Tools) {
        const result = tool.getSchema().safeParse(event);
        if (result.success === true) {
            return new tool(result.data as any);
        }
    }

    return undefined;
}