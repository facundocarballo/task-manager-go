import { ICategory } from "../components/Category";
import { ITask } from "../components/Task";

export const DATA_TASKS: ITask[] = [
    {
        title: 'Task 1',
        level: 0,
        subtasks: null,
        id: 0,
        category_id: 0,
        dateCreated: new Date(),
        dateMustEnd: new Date("2023-10-30"),
        description: "Description of the task...."
        
    },
    {
        title: 'Task 2',
        level: 0,
        subtasks: [
            {
                title: 'Task 2.1',
                level: 1,
                subtasks: null,
                id: 2,
                category_id: 0,
                dateCreated: new Date(),
                dateMustEnd: new Date("2023-10-30"),
                description: "Description of the task...."
            }
        ],
        id: 1,
        category_id: 0,
        dateCreated: new Date(),
        dateMustEnd: new Date("2023-10-30"),
        description: "Description of the task...."
    },

    {
        title: 'Task 3',
        level: 0,
        subtasks: [
            {
                title: 'Task 3.1',
                level: 1,
                subtasks: null,
                id: 4,
                category_id: 0,
                dateCreated: new Date(),
                dateMustEnd: new Date("2023-10-30"),
                description: "Description of the task...."
            },
            {
                title: 'Task 3.2',
                level: 1,
                subtasks: [
                    {
                        title: 'Task 3.2.1',
                        level: 2,
                        subtasks: null,
                        id: 6,
                        category_id: 0,
                        dateCreated: new Date(),
                        dateMustEnd: new Date("2023-10-30"),
                        description: "Description of the task...."
                    },
                ],
                id: 5,
                category_id: 0,
                dateCreated: new Date(),
                dateMustEnd: new Date("2023-10-30"),
                description: "Description of the task...."
            },
            {
                title: 'Task 3.3',
                level: 1,
                subtasks: null,
                id: 7,
                category_id: 0,
                dateCreated: new Date(),
                dateMustEnd: new Date("2023-10-30"),
                description: "Description of the task...."
            },
            {
                title: 'Task 3.4',
                level: 1,
                subtasks: null,
                id: 8,
                category_id: 0,
                dateCreated: new Date(),
                dateMustEnd: new Date("2023-10-30"),
                description: "Description of the task...."
            },
        ],
        id: 3,
        category_id: 0,
        dateCreated: new Date(),
        dateMustEnd: new Date("2023-10-30"),
        description: "Description of the task...."
    },

    {
        title: 'Task 4',
        level: 0,
        subtasks: null,
        id: 9,
        category_id: 0,
        dateCreated: new Date(),
        dateMustEnd: new Date("2023-10-30"),
        description: "Description of the task...."
    }

];

export const DATA_CATEGORIES: ICategory[] = [
    {
        color: 'FC8181',
        title: 'Home',
        description: 'Task of home',
        tasks: DATA_TASKS,
        tasksCompleted: DATA_TASKS,
        id: 0,
    },
    {
        color: 'F6AD55',
        title: 'Work',
        description: 'Task of Work',
        tasks: DATA_TASKS,
        tasksCompleted: [],
        id: 1,
    },
    {
        color: 'F6E05E',
        title: 'YouTube',
        description: 'Task of YouTube',
        tasks: DATA_TASKS,
        tasksCompleted: DATA_TASKS,
        id: 2,
    },
    {
        color: '68D391',
        title: 'Personal Projects',
        description: 'Task of Personal Projects',
        tasksCompleted: DATA_TASKS,
        tasks: DATA_TASKS,
        id: 3,
    },
    {
        color: '4FD1C5',
        title: 'University',
        description: 'Task of University',
        tasksCompleted: [],
        tasks: DATA_TASKS,
        id: 4,
    },
    {
        color: '63B3ED',
        title: 'Gym',
        description: 'Task of Gym',
        tasksCompleted: DATA_TASKS,
        tasks: DATA_TASKS,
        id: 5,
    }
]