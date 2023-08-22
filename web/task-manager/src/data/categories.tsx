import { ICategory } from "../components/Category";
import { ITask } from "../components/Task";

export const DATA_TASKS: ITask[] = [
    {
        title: 'Task 1',
        level: 0,
        subtasks: null
    },
    {
        title: 'Task 2',
        level: 0,
        subtasks: [
            {
                title: 'Task 2.1',
                level: 1,
                subtasks: null
            }
        ]
    },

    {
        title: 'Task 3',
        level: 0,
        subtasks: [
            {
                title: 'Task 3.1',
                level: 1,
                subtasks: null
            },
            {
                title: 'Task 3.2',
                level: 1,
                subtasks: [
                    {
                        title: 'Task 3.2.1',
                        level: 2,
                        subtasks: null
                    },
                ]
            },
            {
                title: 'Task 3.3',
                level: 1,
                subtasks: null
            },
            {
                title: 'Task 3.4',
                level: 1,
                subtasks: null
            },
        ]
    },

    {
        title: 'Task 4',
        level: 0,
        subtasks: null
    }

];

export const DATA_CATEGORIES: ICategory[] = [
    {
        color: 'FC8181',
        title: 'Home',
        description: 'Task of home',
        tasks: DATA_TASKS
    },
    {
        color: 'F6AD55',
        title: 'Work',
        description: 'Task of Work',
        tasks: DATA_TASKS
    },
    {
        color: 'F6E05E',
        title: 'YouTube',
        description: 'Task of YouTube',
        tasks: DATA_TASKS
    },
    {
        color: '68D391',
        title: 'Personal Projects',
        description: 'Task of Personal Projects',
        tasks: DATA_TASKS
    },
    {
        color: '4FD1C5',
        title: 'University',
        description: 'Task of University',
        tasks: DATA_TASKS
    },
    {
        color: '63B3ED',
        title: 'Gym',
        description: 'Task of Gym',
        tasks: DATA_TASKS
    }
]