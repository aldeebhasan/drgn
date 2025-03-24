import { Component } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';
import { ContactsComponent } from '../../components/contacts/contacts.component';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../shared/models/message.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-home',
  imports: [ChatComponent, ContactsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  messages: Array<Message> = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    // Listen for new messages
    this.chatService.onMessage().subscribe((data) => {
      console.log(data);
      this.messages.push(data);
    });

    // Listen for join notifications
    this.chatService.onJoin().subscribe((message) => {
      this.messages.push(this.generateSystemMsg(message));
    });
    this.chatService.onLeave().subscribe((message) => {
      this.messages.push(this.generateSystemMsg(message));
    });
    this.chatService.onError().subscribe((message) => {
      console.log(message);
    });
  }

  generateSystemMsg(message: string): Message {
    return {
      sender: new User('0', 'System'),
      createdAt: new Date().toLocaleString(),
      type: 'system',
      parts: [{
        content: message,
        type: 'text',
      }],
    };
  }

}
