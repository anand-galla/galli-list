import { Task } from './task.model';

export class TaskList {
    id: number;
    identifier: string;
    title: string;

    uid: string;
    tasks: Task[];

    constructor(init?: Partial<TaskList>) {
        Object.assign(this, init);
    }
}