import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RegisterModel } from '../models/register.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_REGISTER = environment.API_LOCAL + '/auth/register';

  constructor(private httpClient: HttpClient) {
    
  }

  register(registerForm: RegisterModel): Observable<any>{
    return this.httpClient.post<any>(this.API_REGISTER, registerForm);
  }
  
}
