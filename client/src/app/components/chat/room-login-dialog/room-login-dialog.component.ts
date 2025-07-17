import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SubmitButtonComponent } from "@app/components/core/submit-button/submit-button.component";
import { AuthService } from "@app/services/auth.service";
import { ChatService } from "@app/services/chat.service";
import { DialogService } from "@app/services/dialog.service";
import { Room } from "@app/shared/models/room.model";

@Component({
    selector: "app-room-login-dialog",
    imports: [CommonModule, SubmitButtonComponent, ReactiveFormsModule],
    templateUrl: "./room-login-dialog.component.html",
})
export class RoomLoginDialogComponent implements OnInit {
    loading: boolean = false;
    joinForm: FormGroup;
    @Input() room?: Room;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private chatService: ChatService,
        private router: Router,
        private dialogService: DialogService
    ) {
        this.joinForm = this.fb.group({
            code: [{ value: "", readonly: true }, [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.joinForm.get("code")?.setValue(this.room?.code);
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
                this.chatService.leaveChat(this.room);
                this.authService.setRoom(response.data.room, response.data.passcode);
                this.chatService.clear();
                window.location.reload();
            })
            .finally(() => {
                this.loading = false;
            });
    }
}
