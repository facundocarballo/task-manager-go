import { ICategory } from "../components/Category";
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

export const copyTasks = (tasks: ITask[]): ITask[] => {
    let nTasks: ITask[] = [];
    for (const task of tasks) {
        nTasks.push(task)
    }
    return nTasks;
}

export const getAllTaskCompleted = (categories: ICategory[]): ITask[] => {
    let taskCompleted = [];

    for (const cat of categories) {
        for (const task of cat.tasksCompleted) {
            taskCompleted.push(task);
        }
    }

    return taskCompleted;
}

export const sortTaskByDate = (tasks: ITask[]): ITask[] => {
    return tasks.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
}