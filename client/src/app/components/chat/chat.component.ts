import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  messages: { type: string; content: string }[] = []; // Array to store messages
  newMessage: string = ''; // Input field value

  // Send a text message
  sendTextMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ type: 'text', content: this.newMessage });
      this.newMessage = ''; // Clear input field
    }
  }

  // Send an image message
  sendImageMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ type: 'image', content: this.newMessage });
      this.newMessage = ''; // Clear input field
    }
  }

  // Send a link message
  sendLinkMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ type: 'link', content: this.newMessage });
      this.newMessage = ''; // Clear input field
    }
  }
}
