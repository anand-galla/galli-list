export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    identifier: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}