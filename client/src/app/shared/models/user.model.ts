export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    mobile: string = "";
    image: string = "";
    created_at: string = "";
    color: string = "";
    is_guest: boolean = true;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
        let colors = ["#F05252", "#3F83F8", "#0E9F6E", "#6875F5", "#6B7280", "#E74694", "#C27803", "#9061F9"];
        this.color = colors[Math.ceil(this.id) % colors.length] || colors[0];
    }
}
