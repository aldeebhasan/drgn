import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/models/user.model";
import { ChatService } from "../../services/chat.service";
import { Room } from "../../shared/models/room.model";
import { IconComponent } from "../core/icon/icon.component";
import { ToSymbolPipe } from "../../pipes/to-symbol.pipe";
import { RoomItemComponent } from "./room-item/room-item.component";
import { ToastrService } from "ngx-toastr";
import { DialogService } from "@app/services/dialog.service";
import { RoomLoginDialogComponent } from "../chat/room-login-dialog/room-login-dialog.component";

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
    room: Room;
    loading: boolean = false;

    constructor(
        private authService: AuthService,
        private chatService: ChatService,
        private toastrService: ToastrService,
        private router: Router,
        private dialogService: DialogService
    ) {
        this.user = this.authService.user();
        this.room = this.authService.room() as Room;
    }

    async ngOnInit() {
        const rooms = (await this.chatService.listRooms(this.room)) || {};
        rooms.data?.forEach((room) => {});
        this.userRooms = (rooms.data ?? []).filter((item) => item.user.id === this.user?.id);
        this.publicRooms = (rooms.data ?? []).filter((item) => item.user.id !== this.user?.id && item.is_public);
    }

    selectRoom(room: Room) {
        if (room.has_password) {
            this.dialogService.open(RoomLoginDialogComponent, { room: room });
        } else {
            room.password = "";
            this.loading = true;
            this.chatService
                .joinRoom(room)
                .then((response) => {
                    this.chatService.leaveChat(this.room);
                    this.authService.setRoom(response.data.room, response.data.passcode);
                    this.chatService.clear();
                    window.location.reload();
                })
                .catch((err) => {
                    this.toastrService.error(Object.values(err.errors).join(", "), err.message);
                })
                .finally(() => (this.loading = false));
        }
    }

    logout() {
        this.authService.logout();
        this.chatService.leaveChat(this.room);
        this.router.navigateByUrl("register");
    }
}
