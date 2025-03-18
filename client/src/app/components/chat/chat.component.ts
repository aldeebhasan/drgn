import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../../shared/models/message.model';
import { User } from '../../shared/models/user.model';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  audio?: HTMLAudioElement;
  sender: User = new User('1', 'Hasan Deeb');
  message: Message = {
    id: '1',
    parts: [{
      type: 'text', content: 'That book sounds interesting! What\'s it about?',
    }, {
      type: 'image', content: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    }, {
      type: 'link', content: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato',
    }],
    sender: new User('1', 'Ali Deeb'),
    isLocal: false,
    createdAt: new Date().toLocaleString(),
  };
  messages: Array<Message> = [this.message, this.message]; // Array to store messages
  newMessage: string = ''; // Input field value

  constructor() {
    this.audio = new Audio();
    this.audio.src = '/assets/beep.mp3';
    this.audio.load();
  }


  // Send a text message
  sendTextMessage() {
    if (this.newMessage.trim()) {
      let type: 'link' | 'text' = this.newMessage.startsWith('http') ? 'link' : 'text';
      let msg: Message = {
        sender: this.sender,
        parts: [{ type: type, content: this.newMessage }],
        createdAt: new Date().toLocaleString(),
        isLocal: true,
      };
      this.messages.push(msg);
      this.newMessage = ''; // Clear input field
      this.audio?.play();
    }
  }

  // Send an image message
  sendImageMessage(event: any) {
    let msg: Message = {
      sender: this.sender,
      parts: [{ type: 'image', content: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' }],
      createdAt: new Date().toLocaleString(),
      isLocal: true,
    };
    this.messages.push(msg);
    this.audio?.play();
  }

}
