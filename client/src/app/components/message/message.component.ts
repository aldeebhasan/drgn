import { Component, Input } from "@angular/core";
import { Message } from "../../shared/models/message.model";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { MessagePartComponent } from "../message-part/message-part.component";

@Component({
    selector: "app-message",
    imports: [CommonModule, MessagePartComponent],
    templateUrl: "./message.component.html",
})
export class MessageComponent {
    @Input() message: Message;

    constructor(private authService: AuthService) {}

    symbol(name: string | undefined): string {
        return name?.slice(0, 2).toUpperCase() || "KW";
    }

    isLocal(): boolean {
        return this.message.user?.id === this.authService.user()?.id;
    }
}
