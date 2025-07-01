import { Component, OnInit } from "@angular/core";
import { Chat } from "../../shared/models/chat.model";
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/models/user.model";
import { ChatService } from "../../services/chat.service";
import { Room } from "../../shared/models/room.model";
import { IconComponent } from "../icon/icon.component";
import { ToSymbolPipe } from "../../pipes/to-symbol.pipe";
import { RoomItemComponent } from "../room-item/room-item.component";

@Component({
    selector: "app-contacts",
    imports: [CommonModule, IconComponent, ToSymbolPipe, RoomItemComponent],
    templateUrl: "./contacts.component.html",
    providers: [CookieService],
})
export class ContactsComponent implements OnInit {
    publicRooms: Room[] = [];
    userRooms: Room[] = [];
    user?: User;
    room?: Room;

    constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {
        this.user = this.authService.user();
        this.room = this.authService.room();
    }

    async ngOnInit() {
        const rooms = (await this.chatService.listRooms(this.user, this.room)) || {};
        rooms.data?.forEach((room) => {});
        this.userRooms = (rooms.data ?? []).filter((item) => item.user.id === this.user?.id);
        this.publicRooms = (rooms.data ?? []).filter((item) => item.user.id !== this.user?.id && item.is_public);
        console.log(this.userRooms);
    }

    selectRoom(room: Room) {
        this.chatService.leaveChat(this.user, this.room);
        this.authService.setRoom(room);
        window.location.reload();
    }

    logout() {
        this.authService.logout();
        this.chatService.leaveChat(this.user, this.room);
        this.router.navigateByUrl("register");
    }
}
