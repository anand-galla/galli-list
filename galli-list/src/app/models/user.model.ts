export class User {
    uid: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}