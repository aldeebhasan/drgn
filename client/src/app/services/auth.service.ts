import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../shared/models/user.model';
import { Room } from '../shared/models/room.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  cookieService = inject(CookieService);
  ROOM_KEY = 'ROOM';
  USER_KEY = 'USER';

  login(user: User) {
    this.cookieService.set(this.USER_KEY, JSON.stringify(user));
  }

  logout() {
    this.cookieService.delete(this.ROOM_KEY);
    this.cookieService.delete(this.USER_KEY);
  }

  user(): User | undefined {
    let userData = this.cookieService.get(this.USER_KEY);
    let user = userData ? JSON.parse(userData) : undefined;

    return user ? user as User : undefined;
  }
  isLogin(): boolean {
    return !!this.user();
  }

  setRoom(room: Room) {
    this.cookieService.set(this.ROOM_KEY, JSON.stringify(room));
  }

  room(): Room | undefined {
    let roomData = this.cookieService.get(this.ROOM_KEY);
    let room = roomData ? JSON.parse(roomData) : undefined;

    return room ? room as Room : undefined;
  }
  
  hasRoom(): boolean {
    return !!this.room();
  }

}
