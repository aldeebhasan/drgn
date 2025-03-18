import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'chat', component: HomeComponent },
  { path: '**', component: RegisterComponent },
];
