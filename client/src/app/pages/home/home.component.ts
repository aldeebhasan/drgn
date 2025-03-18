import { Component } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';
import { ContactsComponent } from '../../components/contacts/contacts.component';

@Component({
  selector: 'app-home',
  imports: [ChatComponent, ContactsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
