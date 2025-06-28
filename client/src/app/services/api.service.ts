import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { Room } from "../shared/models/room.model";
import { User } from "../shared/models/user.model";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private baseUrl: string = environment.baseUrl + "/api";

    constructor(private http: HttpClient) {}

    async uploadImage(file: any, user?: User, room?: Room): Promise<any> {
        const formData = new FormData();
        formData.append("file", file, "filename.png");
        formData.append("user_id", `${user?.id}`);
        formData.append("room_id", `${room?.id}`);

        const request = this.http.post<any>(`${this.baseUrl}/uploader/image`, formData);
        return await lastValueFrom(request);
    }

    async register(data: any): Promise<any> {
        const formData = {
            name: data.name,
            email: data.email || "",
            mobile: data.mobile || "",
            password: data.password || "",
        };

        const request = this.http.post<any>(`${this.baseUrl}/auth/register`, formData);
        return await lastValueFrom(request);
    }

    async registerAsGuest(data: any): Promise<any> {
        const formData = {
            name: data.name,
        };

        const request = this.http.post<any>(`${this.baseUrl}/auth/register-as-guest`, formData);
        return await lastValueFrom(request);
    }

    async login(data: any): Promise<any> {
        const formData = {
            username: data.username,
            password: data.password,
        };

        const request = this.http.post<any>(`${this.baseUrl}/auth/login`, formData);
        return await lastValueFrom(request);
    }
}
