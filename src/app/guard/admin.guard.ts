import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);
  const roles = inject(TokenService).getRole();

  const isAdmin = roles.some(role => JSON.stringify(role) === JSON.stringify('ROLE_ADMIN'));

  if (token && isAdmin) {
    // console.log("Access");
    return true;
  } else {
    // console.log("Denied");
    router.navigate(['']);
    return false;
  }
};
