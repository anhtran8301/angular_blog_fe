import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    // console.log('token->>', token);
    let authRequest = request;

    if (token != null) {
      authRequest = request.clone({ headers: request.headers.set(TOKEN_HEADER, 'Bearer ' + token) })
    }

    return next.handle(authRequest);
  }
}
