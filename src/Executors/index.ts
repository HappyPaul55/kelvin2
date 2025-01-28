import BashExecutor from "./BashExecutor";
import CreateFileExecutor from "./CreateFileExecutor";
import FinishExecutor from "./FinishExecutor";
import InsertIntoFileExecutor from "./InsertIntoFileExecutor";
import ReadFileExecutor from "./ReadFileExecutor";
import ReplaceStringExecutor from "./ReplaceStringInFileExecutor";
import WebReadExecutor from "./WebReadExecutor";

const executors = [
    BashExecutor,
    CreateFileExecutor,
    FinishExecutor,
    InsertIntoFileExecutor,
    ReadFileExecutor,
    ReplaceStringExecutor,
    WebReadExecutor,
] as const;

export default executors;