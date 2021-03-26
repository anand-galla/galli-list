import { TaskStatus } from './enum.model';

export class Task {
    id: number;
    title: string;
    date: Date;
    description: string;
    status: TaskStatus;
    userId: string;
    identifier: string;

    constructor(args?: Partial<Task>) {
        Object.assign(this, args);

        this.status = this.status ? this.status : TaskStatus.Todo;
    }
}