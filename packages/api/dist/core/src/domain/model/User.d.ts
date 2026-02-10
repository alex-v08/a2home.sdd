export declare class User {
    readonly id: string;
    readonly email: string;
    readonly name: string;
    constructor(id: string, email: string, name: string);
    protected validate(): void;
}
