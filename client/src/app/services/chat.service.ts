import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";
import { Message } from "../shared/models/message.model";
import { Room } from "../shared/models/room.model";
import { ResponseDto } from "../shared/dtos/response.dto";
import { AuthService } from "./auth.service";
import { environment } from "@environments/environment";

@Injectable({
    providedIn: "root",
})
export class ChatService {
    private socket: Socket;
    private readonly url: string = environment.baseUrl + "/chat";

    constructor(private authService: AuthService) {
        this.initSocket();
    }

    private initSocket() {
        const token = this.authService.token();
        this.socket = io(this.url, { auth: { token: token } });
    }

    listRooms(room?: Room, extra: object = {}): Promise<ResponseDto<Room[]>> {
        return new Promise((resolve, reject) => {
            this.socket.emit("rooms", { room_id: room?.id, ...extra });

            this.socket.once("success", (response) => {
                resolve(response);
            });
            this.socket.once("error", (response) => {
                reject(response);
            });
        });
    }

    createRoom(room?: Room): Promise<any> {
        return new Promise((resolve, reject) => {
            this.socket.emit("create", room);

            this.socket.once("success", (response) => {
                resolve(response);
            });
            this.socket.once("error", (response) => {
                reject(response);
            });
        });
    }

    joinRoom(room?: Room): Promise<any> {
        return new Promise((resolve, reject) => {
            this.socket.emit("join", room);

            this.socket.once("success", (response) => {
                resolve(response);
            });
            this.socket.once("error", (response) => {
                reject(response);
            });
        });
    }

    subscribeRoom(room: Room, passcode: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.socket.emit("subscribe", { room_id: room?.id, passcode: passcode });

            this.socket.once("success", (response) => {
                resolve(response);
            });
            this.socket.once("error", (response) => {
                reject(response);
            });
        });
    }

    leaveChat(room?: Room): void {
        this.socket.emit("leave", { room_id: room?.id });
        this.clear();
    }

    // Emit "message" event
    sendMessage(message: Message): void {
        this.socket.emit("message", { room_id: message.room?.id, parts: message.parts });
    }

    // Listen for "message" events
    onMessage(): Observable<Message> {
        return new Observable((observer) => {
            this.socket.on("message", (data: Message) => observer.next(data));
        });
    }

    // Listen for "join" events
    onJoin(): Observable<string> {
        return new Observable((observer) => {
            this.socket.on("join", (message: string) => observer.next(message));
        });
    }

    onLeave(): Observable<string> {
        return new Observable((observer) => {
            this.socket.on("leave", (message: string) => observer.next(message));
        });
    }

    onSuccess(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on("success", (data) => observer.next(data));
        });
    }

    // Listen for "error" events
    onError(): Observable<{ message: string; errors: {} }> {
        return new Observable((observer) => {
            this.socket.on("error", (error) => observer.next(error));
        });
    }

    clear(): void {
        this.socket.removeAllListeners();
        this.socket?.disconnect();

        this.initSocket();
    }
}
