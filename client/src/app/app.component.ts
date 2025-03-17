import { Component } from '@angular/core';
import { ChatComponent } from './components/chat/chat.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@Component({
  selector: 'app-root',
  imports: [ChatComponent, ContactsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Drgn-Drgn';
}
