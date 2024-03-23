import { Injectable } from '@angular/core';
import { AuthRestService } from './auth-rest.service';
import { IUserAuth } from 'src/app/models/interfaces/user';
import { Observable } from 'rxjs';
import { IUserReg } from '../../models/interfaces/user';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUserId: string;

  constructor(private rest: AuthRestService,
              private navigationService: NavigationService) { }

  checkRole(id: string): Promise<any> {
    return new Promise((res => {
      res(this.rest.checkRole(id))
    }))
  };

  checkAuthUserInLocalStorage(): string  {
    const authUser = localStorage.getItem('user')
    if(authUser) {
      const id = JSON.parse(authUser)['id']
      this.authUserId = id
      this.navigationService.setRootPath(id)
      return id
    } else {
      this.navigationService.setRootPath('')
      this.authUserId = ''
      return ''
    }
  };
  setAuthUserID(id: string) {
    this.authUserId = id
    this.navigationService.setRootPath(id)
  };
  ID() {
    return this.authUserId
  };


  register(data: IUserReg): Observable<any> {
    return this.rest.register(data)
  };
  login(data: IUserAuth): Observable<any> { 
    return this.rest.login(data)
  };
  logout() {
    localStorage.removeItem('user')
    this.checkAuthUserInLocalStorage()
  };

  setToken(userId: string, access_token: string, role: string): void {
    const user = {id:userId, access_token: access_token, role: role}
    localStorage.setItem(`user`, JSON.stringify(user))
    this.checkAuthUserInLocalStorage()
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
    this.checkAuthUserInLocalStorage()
    return this.rest.deleteUser(id)
  };
}
