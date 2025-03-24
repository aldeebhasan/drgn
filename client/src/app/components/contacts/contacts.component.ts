import { Component, OnInit } from '@angular/core';
import { Chat } from '../../shared/models/chat.model';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/models/user.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  providers: [CookieService],
})
export class ContactsComponent implements OnInit {
  chats: Chat[] = [new Chat('comunity', 'Comuntiy')];
  user?: User;

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.user();
  }

  logout() {
    this.authService.logout();
    this.chatService.leaveChat(this.user);
    this.router.navigateByUrl('register');
  }
}
