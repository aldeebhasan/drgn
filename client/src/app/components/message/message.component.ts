import { Component, Input } from "@angular/core";
import { Message } from "../../shared/models/message.model";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { MessagePartComponent } from "../message-part/message-part.component";
import { ToSymbolPipe } from "../../pipes/to-symbol.pipe";

@Component({
    selector: "app-message",
    imports: [CommonModule, MessagePartComponent, ToSymbolPipe],
    templateUrl: "./message.component.html",
})
export class MessageComponent {
    @Input() message: Message;

    constructor(private authService: AuthService) {}

    isLocal(): boolean {
        return this.message.user?.id === this.authService.user()?.id;
    }
}
