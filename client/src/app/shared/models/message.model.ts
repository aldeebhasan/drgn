import { User } from "./user.model";
import { Part } from "./part.model";
import { Room } from "./room.model";

export class Message {
    id?: string;
    user?: User;
    room?: Room;
    created_at?: string;
    parts: Array<Part> = [];
    type?: string = "user";

    constructor(data: Partial<Message>) {
        if (data.user) {
            data.user = new User(data.user);
        }
        if (data.room) {
            data.room = new Room(data.room);
        }
        Object.assign(this, data);
    }
}
