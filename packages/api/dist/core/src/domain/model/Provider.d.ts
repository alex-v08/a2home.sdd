import { User } from "./User";
export declare class Provider extends User {
    readonly rating: number;
    readonly enrollment: string;
    constructor(id: string, email: string, name: string, rating: number, enrollment: string);
    private validateProvider;
}
