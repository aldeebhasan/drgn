import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { Room } from "../../shared/models/room.model";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { IconComponent } from "../../components/core/icon/icon.component";
import { SubmitButtonComponent } from "../../components/core/submit-button/submit-button.component";

@Component({
    selector: "app-room",
    imports: [CommonModule, ReactiveFormsModule, IconComponent, SubmitButtonComponent],
    templateUrl: "./room.component.html",
    styleUrl: "./room.component.css",
})
export class RoomComponent {
    createForm: FormGroup;
    joinForm: FormGroup;
    activeTab: "create" | "join" = "join";
    createdRoom?: Room;
    loading = false;
    currentRoom?: Room = undefined;

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

        this.currentRoom = authService.room();
    }

    joinRoom() {
        if (this.joinForm?.invalid) {
            this.joinForm.markAllAsTouched();
            return;
        }
        this.loading = true;

        const room: Room = this.joinForm.value;

        this.chatService
            .joinRoom(room)
            .then((response) => {
                this.afterJoinOrCreate(response.data);
            })
            .catch((err) => {
                this.toastrService.error(Object.values(err.errors).join(", "), err.message);
            })
            .finally(() => (this.loading = false));
    }

    createRoom() {
        if (this.createForm?.invalid) {
            this.createForm.markAllAsTouched();
            return;
        }

        const room: Room = this.createForm.value;

        this.chatService
            .createRoom(room)
            .then((response) => {
                this.createdRoom = response.data;
            })
            .catch((err) => {
                this.toastrService.error(Object.values(err.errors).join(", "), err.message);
            })
            .finally(() => (this.loading = false));
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

    logout() {
        this.authService.logout();
        this.router.navigateByUrl("register");
    }
}
