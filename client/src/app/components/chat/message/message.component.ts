import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessagePartComponent } from "../message-part/message-part.component";
import { MessageDatePipe } from "@app/pipes/message-date.pipe";
import { Message } from "@app/shared/models/message.model";
import { ToSymbolPipe } from "@app/pipes/to-symbol.pipe";
import { AuthService } from "@app/services/auth.service";

@Component({
    selector: "app-message",
    imports: [CommonModule, MessagePartComponent, ToSymbolPipe, MessageDatePipe],
    templateUrl: "./message.component.html",
})
export class MessageComponent {
    @Input() message: Message;

    constructor(private authService: AuthService) {}

    isLocal(): boolean {
        return this.message.user?.id === this.authService.user()?.id;
    }
}
