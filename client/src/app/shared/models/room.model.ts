import { User } from "./user.model";

export class Room {
    id: number;
    name: string;
    code: string;
    user: User;
    password: string = "";
    is_public: boolean = false;
    has_password: boolean = false;

    constructor(data: Partial<Room> = {}) {
        Object.assign(this, data);
    }
}
