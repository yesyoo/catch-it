import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRestService } from './auth-rest.service';
import { IUserAuth, IUser } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { IUserReg } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIsAuth: boolean

  constructor(private rest: AuthRestService) { }

  userState(data: boolean): boolean {
    return this.userIsAuth = data
  }

  register(data: IUserReg): Observable<any> {
    return this.rest.register(data)
  };

  login(data: IUserAuth): Observable<any> { 
    return this.rest.login(data)
  };

  logout() {
    localStorage.removeItem('user')
  };

  setToken(userId: string, access_token: string): void {
    const user = {id:userId, access_token: access_token}
    localStorage.setItem(`user`, JSON.stringify(user))
  };


  getToken(): string | null {
    let access_token: string
    const user = localStorage.getItem(`user`)
    if(user) {
      access_token = JSON.parse(user).access_token
      return access_token
    } else return null
  };

  deleteUser(userId: string): Observable<any> {
    return this.rest.deleteUser(userId)
  };
  
  
}
