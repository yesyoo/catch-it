import { Injectable } from '@angular/core';
import { Observable, Subject, AsyncSubject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { IUser, IUserResponse } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';

import { UserRestService } from './user-rest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser 
  ID: string = this.auth.getAuthUserID()
  userIsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  userIsLoaded$ = this.userIsLoaded.asObservable()

  constructor(private rest: UserRestService,
              private auth: AuthService) { }


  loadUser():Promise<any> {
    return new Promise(res => {
      this.getById(this.ID).subscribe(user => {
        this.setUser(user);
        res(user)
      })
    })
  };
 

  setUser(data: IUserResponse) {
    this.user = {
      id: data.user,
      username: data.username,
      city: data.city,
      district: data.district,
      description: data.description,
      img: data.img
    }
    console.log('set:', this.user)
  };

  getUser(): IUser  {
    return this.user 
  };

  getById(id: string): Observable<IUserResponse> {
    return this.rest.getUserById(id)
  };

  _getUserById(id: string): Observable<any> {
    return this.rest._getUserById(id)
  };




}
