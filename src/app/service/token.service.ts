import { Injectable } from '@angular/core';

const NAME_KEY = 'Name_Key';
const AVATAR_KEY = 'Avatar_Key';
const TOKEN_KEY = 'Token_Key';
const ROLE_KEY = 'Role_Key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: string[] = [];

  constructor() { }

  public isAdmin(roles: string[]): boolean {
    if (roles.some(role => JSON.stringify(role) === JSON.stringify('ROLE_ADMIN'))) {
      return true;
    } else { return false; }
  }

  public isLogin(): boolean {
    if(this.getToken()) {
      return true;
    } else {
      return false
    }
  }

  public setName(name: string) {
    sessionStorage.removeItem(NAME_KEY);
    sessionStorage.setItem(NAME_KEY, name);
  }

  public getName(): string {
    //@ts-ignore
    return sessionStorage.getItem(NAME_KEY);
  }

  public setAvatar(avatar: string) {
    sessionStorage.removeItem(AVATAR_KEY);
    sessionStorage.setItem(AVATAR_KEY, avatar);
  }

  public getAvatar(): string {
    //@ts-ignore
    return sessionStorage.getItem(AVATAR_KEY);
  }

  public setToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    //@ts-ignore
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setRole(role: string[]) {
    sessionStorage.removeItem(ROLE_KEY);
    sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public getRole(): string[] {
    this.roles = [];
    if (this.getToken()) {
      //@ts-ignore
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role => {
        this.roles.push(role.authority)
      });
    }
    return this.roles;
  }

  public parseToken(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  public tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
