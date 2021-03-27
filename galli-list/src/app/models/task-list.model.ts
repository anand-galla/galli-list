import { Task } from './task.model';

export class TaskList {
    id: number;
    identifier: string;
    title: string;
    isDeleted: boolean;
    uid: string;
    tasks: Task[];

    constructor(init?: Partial<TaskList>) {
        Object.assign(this, init);
    }
}