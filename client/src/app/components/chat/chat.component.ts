import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Message } from '../../shared/models/message.model';
import { User } from '../../shared/models/user.model';
import { MessageComponent } from '../message/message.component';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { Room } from '../../shared/models/room.model';
import { ApiService } from '../../services/api.service';
import { Part } from '../../shared/models/part.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  @ViewChild('chatWindow') chatWindow?: ElementRef;
  sender?: User;
  room?: Room;
  @Input() messages: Array<Message> = [];
  newMessage: string = ''; // Input field value
  replyToMessage?: Message = undefined;
  datepipe: DatePipe = new DatePipe('en-US')

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.sender = this.authService.user();
    this.room = this.authService.room();
    await this.chatService.joinChat(this.sender, this.room);
  }

  // Send a text message
  sendMessage() {
    if (this.newMessage.trim()) {
      let type: 'link' | 'text' = this.newMessage.startsWith('http') ? 'link' : 'text';

      const parts: Part[] = [];
      if (this.replyToMessage) {
        let content = `Reply to ${this.replyToMessage.sender?.name}: `;
        let part = this.replyToMessage.parts[this.replyToMessage.parts.length-1];
        if (part.type === 'text' || part.type === 'link') {
          content += part.content;
        } else if (part.type === 'image') {
          content += "Image";
        }
        parts.push({ type: 'message', content: content })
      }

      parts.push({ type: type, content: this.newMessage });
      let msg: Message = {
        sender: this.sender,
        parts: parts,
        createdAt: this.datepipe.transform(new Date(), 'dd,MMM HH:mm a') as string,
      };
      this.chatService.sendMessage(msg, this.room);
      this.afterMessageAdd();
    }

  }

  // Send an image message
  async sendImageMessage(event: any) {
    let file = event.target.files[0];

    const response = await this.apiService.uploadImage(file);

    let msg: Message = {
      sender: this.sender,
      parts: [{ type: 'image', content: response.data.url || '' }],
      createdAt: new Date().toLocaleString(),
    };
    this.chatService.sendMessage(msg, this.room);
    this.afterMessageAdd();
  }



  afterMessageAdd() {
    this.newMessage = '';
    this.replyToMessage = undefined;
    setTimeout(() => {
      this.chatWindow?.nativeElement.scroll({
        top: this.chatWindow.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);

  }

  isLocal(message: Message): boolean {
    return message.sender?.id === this.authService.user()?.id;
  }

  logout() {
    this.authService.logout();
    this.chatService.leaveChat(this.sender, this.room);
    this.router.navigateByUrl('register');
  }
}
