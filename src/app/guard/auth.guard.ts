import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);

  // console.log("Token:", token);
  if (!token) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
  //return false;
  // const str = sessionStorage.getItem("expires_at") || "";
  // if (str == "") return false; //chưa dn    
  // const expiresAt = JSON.parse(str);
  // const logged = moment().isBefore(moment(expiresAt));
  // return logged;
};

export const notAuthGuard: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);

  // console.log("Token:", token);
  if (!token) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
