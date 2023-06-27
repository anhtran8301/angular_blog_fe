import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

export const notAuthGuard: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);
  
  if (!token) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);
  const tokenExpired = inject(TokenService).tokenExpired(token);

  if (!token || tokenExpired) {
    sessionStorage.clear();
    router.navigate(['login']);
    return false;
  } else {
    return true;
  }
};
