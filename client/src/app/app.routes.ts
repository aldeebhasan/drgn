import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'chat', component: HomeComponent, canActivate: [authGuard] },
  { path: '**', component: RegisterComponent },
];
