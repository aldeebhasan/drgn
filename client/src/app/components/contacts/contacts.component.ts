import { Component, OnInit } from '@angular/core';
import { Chat } from '../../shared/models/chat.model';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  providers: [CookieService],
})
export class ContactsComponent implements OnInit {
  chats: Chat[] = [new Chat('comunity', 'Comuntiy')];
  user?: User;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.user();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('register');
  }
}
