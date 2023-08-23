import { ITask } from "../components/Task";

export const getNumberOfTasks = (tasks: ITask[]): number => {
    let amount = 0;

    for (const task of tasks) {
        amount++;
        if (task.subtasks != null) {
            amount += getNumberOfTasks(task.subtasks);
        }
    }

    return amount;
}