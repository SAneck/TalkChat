import { inject } from '@angular/core';
import { Router, CanActivateFn, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const canActivateAuth: CanActivateFn = () => {
  const isLoggedIn = inject(AuthService).isLoggedIn;
  const router = inject(Router);

  if(isLoggedIn){
    return true
  }
  return router.navigate(['/signIn'])
};