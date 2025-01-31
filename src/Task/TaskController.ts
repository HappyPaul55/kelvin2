import Agent from "@/Agents/Agent";
import Task from "@/Task/Task";

export default class TaskController {
    constructor(
        private readonly projectManger: Agent,
        private readonly devOps: Agent,
        private readonly developer: Agent,
        private readonly designer: Agent,
    ) {

    }

    private async processTask(task: Task): Promise<void> {
        const agent = this.getAgentForTask(task);
        const response = await agent.handle(task);

        if (response.status === 'needs-clarification' && response.questions) {
            const clarificationTask: Task = {
                id: `clarification-${Date.now()}`,
                description: response.questions[0],
                type: 'clarification',
                status: 'pending'
            };
            this.projectManager.addClarification(task.id, '');
            this.projectManager.handleTask(clarificationTask);
        }

        if (response.newTasks) {
            response.newTasks.forEach(newTask => 
                this.projectManager.handleTask(newTask));
        }
    }

    private getAgentForTask(task: Task): Agent {
        if (!this.agents[task.agent]) {
            throw new Error('Agent doesn\'t exist.');
        }

        return this.agents[task.agent];
    }

    public async startWorkflow(initialTask: Task): Promise<void> {
        await this.projectManager.handleTask(initialTask);
        
        // Main processing loop
        let nextTask: Task | undefined;
        while ((nextTask = this.projectManager.getNextTask())) {
            nextTask.status = 'in-progress';
            await this.processTask(nextTask);
            nextTask.status = 'completed';
        }
    }
}