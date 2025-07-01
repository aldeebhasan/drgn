import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { Room } from "../../shared/models/room.model";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { IconComponent } from "../../components/icon/icon.component";

@Component({
    selector: "app-room",
    imports: [CommonModule, ReactiveFormsModule, IconComponent],
    templateUrl: "./room.component.html",
    styleUrl: "./room.component.css",
})
export class RoomComponent {
    createForm: FormGroup;
    joinForm: FormGroup;
    activeTab: "create" | "join" = "join";
    createdRoom?: Room;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private chatService: ChatService,
        private toastrService: ToastrService
    ) {
        this.createForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(3)]],
            code: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            password: [""],
            is_public: [true],
        });

        this.joinForm = this.fb.group({
            code: ["", [Validators.required]],
            password: [""],
        });
    }

    joinRoom() {
        if (this.joinForm?.invalid) {
            this.joinForm.markAllAsTouched();
            return;
        }

        const room: Room = this.joinForm.value;

        this.chatService
            .joinRoom(this.authService.user(), room)
            .then((response) => {
                this.afterJoinOrCreate(response.data);
            })
            .catch((err) => {
                this.toastrService.error(Object.values(err.errors).join(", "), err.message);
            });
    }

    createRoom() {
        if (this.createForm?.invalid) {
            this.createForm.markAllAsTouched();
            return;
        }

        const room: Room = this.createForm.value;

        this.chatService
            .createRoom(this.authService.user(), room)
            .then((response) => {
                this.createdRoom = response.data;
            })
            .catch((err) => {
                this.toastrService.error(Object.values(err.errors).join(", "), err.message);
            });
    }

    afterJoinOrCreate(room: Room) {
        this.authService.setRoom(room);
        this.chatService.clear();
        this.router.navigateByUrl("chat");
    }

    copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        this.toastrService.success("Code is coppied");
    }

    generateRoomCode(): void {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
        let result = "";
        for (let i = 0; i < 10; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const codeControl = this.createForm.get("code");
        codeControl?.setValue(result);
    }
}
