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

  private rootPath: string = "" || "home";
  ID: string;

  constructor(private rest: AuthRestService) { }

  checkRole(id: string): Observable<any> {
    return this.rest.checkRole(id)
  }

  getUserIdFromLocalStorage(): string  {
    const authUser = localStorage.getItem('user')
    if(authUser) {
      this.rootPath = 'home'
      console.log('user:', JSON.parse(authUser)['id'])
      return this.ID = JSON.parse(authUser)['id']
    } else {
      this.rootPath = ''
      console.log('user not found')
      return this.ID = ''
    }
  };

  setRootPath(data: "" | "home") {
      this.rootPath = data
  };

  getRootPath(): string {
    return this.rootPath
  };

  register(data: IUserReg): Observable<any> {
    return this.rest.register(data)
  };

  login(data: IUserAuth): Observable<any> { 
    return this.rest.login(data)
  };

  logout() {
    localStorage.removeItem('user')
    this.getUserIdFromLocalStorage()
  };

  setToken(userId: string, access_token: string, role: string): void {
    const user = {id:userId, access_token: access_token, role: role}
    localStorage.setItem(`user`, JSON.stringify(user))
    this.getUserIdFromLocalStorage()
  };

  getToken(): string  {
    let access_token: string
    const user = localStorage.getItem(`user`)
    if(user) {
      access_token = JSON.parse(user).access_token
      return access_token
    } else return ''
  };

  deleteUser(id: string): Observable<any> {
    this.logout()
    this.getUserIdFromLocalStorage()
    return this.rest.deleteUser(id)
  };
  
  
}