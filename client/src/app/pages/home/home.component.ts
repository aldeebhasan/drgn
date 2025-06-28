import { Component } from "@angular/core";
import { ChatComponent } from "../../components/chat/chat.component";
import { ContactsComponent } from "../../components/contacts/contacts.component";
import { ChatService } from "../../services/chat.service";
import { Message } from "../../shared/models/message.model";
import { User } from "../../shared/models/user.model";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-home",
    imports: [ChatComponent, ContactsComponent],
    templateUrl: "./home.component.html",
})
export class HomeComponent {
    messages: Array<Message> = [];
    audio?: HTMLAudioElement;

    constructor(private chatService: ChatService, private toastrService: ToastrService) {
        this.audio = new Audio();
        this.audio.src = "/assets/beep.mp3";
        this.audio.load();
    }

    ngOnInit(): void {
        // Listen for new messages
        this.chatService.onMessage().subscribe((data) => {
            this.messages.push(new Message(data));
            this.audio?.play();
        });

        // Listen for join notifications
        this.chatService.onJoin().subscribe((message) => {
            this.messages.push(this.generateSystemMsg(message));
        });
        this.chatService.onLeave().subscribe((message) => {
            this.messages.push(this.generateSystemMsg(message));
        });
        this.chatService.onError().subscribe((error) => {
            this.toastrService.error(error.message);
        });
    }

    ngOnDestroy(): void {
        this.chatService.clear();
    }

    generateSystemMsg(message: string): Message {
        return {
            user: { id: 0, name: "System" } as User,
            createdAt: new Date().toLocaleString(),
            type: "system",
            parts: [
                {
                    content: message,
                    type: "text",
                },
            ],
        };
    }
}
