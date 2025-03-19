import { User } from '../models/user.model';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  cookieService = inject(CookieService);

  login(user: User) {
    this.cookieService.set('User', JSON.stringify(user));
  }

  logout() {
    this.cookieService.delete('User');
  }

  user(): User | undefined {
    let userData = this.cookieService.get('User');
    let user = userData ? JSON.parse(userData) : undefined;

    return user ? user as User : undefined;
  }

  isLogin(): boolean {
    return !!this.user();
  }

}
