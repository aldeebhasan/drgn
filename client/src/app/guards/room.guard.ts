import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roomGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  if (authService.isLogin()) {
    if(authService.hasRoom()){
      return true;
    }else{
      return inject(Router).createUrlTree(['/room']);
    }
  }
  return inject(Router).createUrlTree(['/register']);
};
