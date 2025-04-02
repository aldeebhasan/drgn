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
import { IconComponent } from '../icon/icon.component';
import { Media } from '../../shared/models/media.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent, IconComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  @ViewChild('chatWindow') chatWindow?: ElementRef;
  @ViewChild('inputMessage') inputMessage?: ElementRef;
  sender?: User;
  room?: Room;
  media: Array<Media> = [];
  mediaLoading: boolean = false;
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
    if (this.newMessage.trim() || this.media.length > 1) {
      let type: 'link' | 'text' = this.newMessage.startsWith('http') ? 'link' : 'text';

      const parts: Part[] = [];
      //reply part
      if (this.replyToMessage) {
        parts.push({ type: 'message', content: this.replyToMessage })
      }
      //text part
      parts.push({ type: type, content: this.newMessage });
      //media part
      this.media.forEach((item: Media) => {
        parts.push({ type: 'media', content: item })
      })

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
  async addMedia(event: any) {
    let file = event.target.files[0];

    this.mediaLoading = true;
    const response = await this.apiService.uploadImage(file);
    this.mediaLoading = false;
    this.media.push({ type: 'image', path: response.data.url || '' });
  }

  removeMedia(index: number) {
    this.media.splice(index, 1);
  }



  afterMessageAdd() {
    this.newMessage = '';
    this.replyToMessage = undefined;
    this.media = [];
    setTimeout(() => {
      this.chatWindow?.nativeElement.scroll({
        top: this.chatWindow.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);

  }

  replyTo(message: Message) {
    this.inputMessage?.nativeElement.focus()
    this.replyToMessage = message;
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
