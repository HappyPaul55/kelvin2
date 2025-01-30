import AskQuestionTool from "./AskQuestionTool";
import BashTool from "./BashTool";
import CreateFileTool from "./CreateFileTool";
import FinishTool from "./FinishTool";
import InsertIntoFileTool from "./InsertIntoFileTool";
import ReadFileTool from "./ReadFileTool";
import ReplaceStringInFileTool from "./ReplaceStringInFileTool";
import StartAgentTool from "./StartAgentTool";
import WebReadTool from "./WebReadTool";

const Tools = [
    AskQuestionTool,
    BashTool,
    CreateFileTool,
    FinishTool,
    InsertIntoFileTool,
    ReadFileTool,
    ReplaceStringInFileTool,
    StartAgentTool,
    WebReadTool,
] as const;

export default Tools;