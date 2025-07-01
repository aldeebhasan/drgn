import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";
import { Message } from "../../shared/models/message.model";
import { User } from "../../shared/models/user.model";
import { MessageComponent } from "../message/message.component";
import { AuthService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { Router } from "@angular/router";
import { Room } from "../../shared/models/room.model";
import { ApiService } from "../../services/api.service";
import { Part } from "../../shared/models/part.model";
import { IconComponent } from "../icon/icon.component";
import { Media } from "../../shared/models/media.model";
import { ResponseDto } from "../../shared/dtos/response.dto";
import { EmojiPickerComponent } from "../emoji-picker/emoji-picker.component";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-chat",
    standalone: true,
    imports: [CommonModule, FormsModule, MessageComponent, IconComponent, EmojiPickerComponent],
    templateUrl: "./chat.component.html",
})
export class ChatComponent implements OnInit {
    @ViewChild("chatWindow") chatWindow?: ElementRef;
    @ViewChild("inputMessage") inputMessage?: ElementRef;
    sender?: User;
    room?: Room;
    media: Array<Media> = [];
    mediaLoading: boolean = false;
    @Input() messages: Array<Message> = [];
    newMessage: string = ""; // Input field value
    replyToMessage?: Message = undefined;
    datepipe: DatePipe = new DatePipe("en-US");

    isMobile = false;
    isOpen = false;

    constructor(
        private authService: AuthService,
        private chatService: ChatService,
        private apiService: ApiService,
        private toastrService: ToastrService,
        private router: Router
    ) {}

    async ngOnInit() {
        this.sender = this.authService.user();
        this.room = this.authService.room();
        await this.chatService.subscribeRoom(this.sender, this.room);
    }

    // Send a text message
    sendMessage() {
        if (this.newMessage.trim() || this.media.length > 0) {
            let type: "link" | "text" = this.newMessage.startsWith("http") ? "link" : "text";

            const parts: Part[] = [];
            //reply part
            if (this.replyToMessage) {
                parts.push({ type: "message", content: this.replyToMessage.id });
            }
            //text part
            if (this.newMessage.trim()) {
                parts.push({ type: type, content: this.newMessage });
            }
            //media part
            this.media.forEach((item: Media) => {
                parts.push({ type: "media", content: item.id });
            });

            let msg: Message = {
                user: this.sender,
                room: this.room,
                parts: parts,
            };
            this.chatService.sendMessage(msg);
            this.afterMessageAdd();
        }
    }

    // Send an image message
    async addMedia(event: any) {
        let file = event.target.files[0];

        this.mediaLoading = true;
        this.apiService
            .uploadImage(file, this.sender, this.room)
            .then((res: ResponseDto<Media>) => {
                this.media.push(res.data as Media);
            })
            .finally(() => {
                this.mediaLoading = false;
            });
    }

    removeMedia(index: number) {
        this.media.splice(index, 1);
    }

    afterMessageAdd() {
        this.newMessage = "";
        this.replyToMessage = undefined;
        this.media = [];
        setTimeout(() => {
            this.chatWindow?.nativeElement.scroll({
                top: this.chatWindow.nativeElement.scrollHeight,
                behavior: "smooth",
            });
        }, 100);
    }

    replyTo(message: Message) {
        this.inputMessage?.nativeElement.focus();
        this.replyToMessage = message;
    }

    addEmoji(emoji: string) {
        this.newMessage += emoji;
    }

    isLocal(message: Message): boolean {
        return message.user?.id === this.authService.user()?.id;
    }

    logout() {
        this.authService.logout();
        this.chatService.leaveChat(this.sender, this.room);
        this.router.navigateByUrl("register");
    }

    copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
        this.toastrService.success("Code is coppied");
    }
}
