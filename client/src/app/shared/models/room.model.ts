export class Room {
    id: number;
    name: string;
    code: string;
    password: string = "";

    constructor(data: Partial<Room>) {
        Object.assign(this, data);
    }
}
