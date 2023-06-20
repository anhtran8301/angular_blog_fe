import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Register } from '../models/Register';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/Login';
import { JwtResponse } from '../models/JwtResponse';
import { ChangeAvatar } from '../models/ChangeAvatar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_REGISTER = environment.API_LOCAL + '/auth/register';
  private API_LOGIN = environment.API_LOCAL + '/auth/login';
  private API_UPDATE_AVATAR = environment.API_LOCAL + '/auth/change-avatar'

  constructor(private httpClient: HttpClient) {

  }

  register(registerModel: Register): Observable<any> {
    return this.httpClient.post<any>(this.API_REGISTER, registerModel);
  }

  login (loginModel: Login): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.API_LOGIN, loginModel);
  }

  editAvatar(avatarModel: ChangeAvatar): Observable<any>{
    return this.httpClient.put<any>(this.API_UPDATE_AVATAR, avatarModel)
  }
}
