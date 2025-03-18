import { Component } from '@angular/core';
import { Chat } from '../../shared/models/chat.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {
  chats: Chat[] = [new Chat('comunity', 'Comuntiy')];
}
