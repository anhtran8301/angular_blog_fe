import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RegisterModel } from '../models/Register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/Login';
import { JwtResponseModel } from '../models/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_REGISTER = environment.API_LOCAL + '/auth/register';
  private API_LOGIN = environment.API_LOCAL + '/auth/login';

  constructor(private httpClient: HttpClient) {

  }

  register(registerForm: RegisterModel): Observable<any> {
    return this.httpClient.post<any>(this.API_REGISTER, registerForm);
  }

  login (loginForm: LoginModel): Observable<JwtResponseModel> {
    return this.httpClient.post<JwtResponseModel>(this.API_LOGIN, loginForm);
  }
}
