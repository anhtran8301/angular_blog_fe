import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    // console.log('token->>', token);
    let authRequest = request;

    if (token != null) {
      authRequest = request.clone({ headers: request.headers.set(TOKEN_HEADER, 'Bearer ' + token) })
    }

    return next.handle(authRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.status);
          console.log(error.statusText);
          if (error.status === 401) {
              this.authService.logOut();
              this.router.navigate(['login']);
          }
      }
      return throwError(() => error);
      }) as any
    )

  }
}
