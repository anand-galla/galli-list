import { TaskStatus } from './enum.model';

export class Task {
    id: number;
    identifier: string;
    title: string;
    date: Date;
    description: string;
    status: TaskStatus;

    constructor(args?: Partial<Task>) {
        Object.assign(this, args);
    }
}