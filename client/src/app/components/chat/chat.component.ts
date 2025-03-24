import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../../shared/models/message.model';
import { User } from '../../shared/models/user.model';
import { MessageComponent } from '../message/message.component';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  @ViewChild('chatWindow') chatWindow?: ElementRef;
  audio?: HTMLAudioElement;
  sender?: User;
  @Input() messages: Array<Message> = [];
  newMessage: string = ''; // Input field value

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {

    this.audio = new Audio();
    this.audio.src = '/assets/beep.mp3';
    this.audio.load();
  }

  ngOnInit() {
    this.sender = this.authService.user();
    this.chatService.joinChat(this.sender);
  }

  // Send a text message
  sendTextMessage() {
    if (this.newMessage.trim()) {
      let type: 'link' | 'text' = this.newMessage.startsWith('http') ? 'link' : 'text';
      let msg: Message = {
        sender: this.sender,
        parts: [{ type: type, content: this.newMessage }],
        createdAt: new Date().toLocaleString(),
      };
      this.chatService.sendMessage(msg);
      // this.messages.push(msg);
      this.afterMessageAdd();
    }
  }

  // Send an image message
  sendImageMessage(event: any) {
    let msg: Message = {
      sender: this.sender,
      parts: [{ type: 'image', content: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' }],
      createdAt: new Date().toLocaleString(),
    };
    this.messages.push(msg);
    this.afterMessageAdd();
  }


  afterMessageAdd() {
    this.newMessage = '';
    this.audio?.play();
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
    this.chatService.leaveChat(this.sender);
    this.router.navigateByUrl('register');
  }
}
