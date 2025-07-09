import { inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "../shared/models/user.model";
import { Room } from "../shared/models/room.model";
import { ApiService } from "./api.service";
import { ToastrService } from "ngx-toastr";
import { ResponseDto } from "../shared/dtos/response.dto";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    cookieService = inject(CookieService);
    ROOM_KEY = "ROOM";
    TOKEN_KEY = "TOKEN";
    USER_KEY = "USER";

    constructor(private apiServie: ApiService, private toastrService: ToastrService) {}

    generateUniqueId(): string {
        const irand = Math.ceil(Math.random() * 1000000);
        return "G-" + irand;
    }

    async register(user: User) {
        return this.apiServie.register(user);
    }
    async registerAsGuest(user: User) {
        return this.apiServie.registerAsGuest(user).catch((error) => {
            const responseDto = error.error as ResponseDto<void>;
            this.toastrService.error(Object.values(responseDto.errors).join(", "), responseDto.message);
        });
    }

    async login(email: string, password: string) {
        return this.apiServie
            .login({
                username: email,
                password: password,
            })
            .catch((error) => {
                const responseDto = error.error as ResponseDto<void>;
                this.toastrService.error(Object.values(responseDto.errors).join(", "), responseDto.message);
            });
    }

    setAuth(user: User, token: string) {
        this.cookieService.set(this.USER_KEY, JSON.stringify(user));
        this.cookieService.set(this.TOKEN_KEY, token);
    }

    logout() {
        this.cookieService.delete(this.ROOM_KEY);
        this.cookieService.delete(this.USER_KEY);
    }

    user(): User | undefined {
        let userData = this.cookieService.get(this.USER_KEY);
        let user = userData ? new User(JSON.parse(userData)) : undefined;

        return user ? user : undefined;
    }

    token(): string {
        let token = this.cookieService.get(this.TOKEN_KEY);
        return token ?? "";
    }

    isLogin(): boolean {
        return !!this.user();
    }

    setRoom(room: Room) {
        this.cookieService.set(this.ROOM_KEY, JSON.stringify(room), undefined, "/");
    }

    room(): Room | undefined {
        let roomData = this.cookieService.get(this.ROOM_KEY);
        let room = roomData ? new Room(JSON.parse(roomData)) : undefined;

        return room ? room : undefined;
    }

    hasRoom(): boolean {
        return !!this.room();
    }
}
