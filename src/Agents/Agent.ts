import Task from "@/Task/Task";

export default abstract class Agent {
    abstract prompt(task: string): string;

    public handle(task: Task) {

    }
}