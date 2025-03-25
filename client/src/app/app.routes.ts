import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RoomComponent } from './pages/room/room.component';

export const routes: Routes = [
  { path: 'chat', component: HomeComponent, canActivate: [authGuard] },
  { path: 'room', component: RoomComponent },
  { path: '**', component: RegisterComponent },
];
