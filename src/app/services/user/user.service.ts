import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserResponse } from 'src/app/interfaces/user';
import { UserRestService } from './user-rest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser | null

  constructor(private rest: UserRestService) { }

  getUserId(): string | null {
    const user = localStorage.getItem('user')
    if(user) {
      const id = JSON.parse(user).id
      return id? id : null
    } return null    
  }

  setUser(data: IUserResponse) {
    this.user = {
      id: data.userId,
      username: data.username,
      city: data.city,
      district: data.district,
      description: data.description,
      img: data.img
    }
    console.log('set:', this.user)
  };

  getUser(): IUser | null {
    return this.user ? this.user : null
  };

  getUserById(userId: string): Observable<IUserResponse> {
    return this.rest.getUserById(userId)
  };

  _getUserById(userId: string): Observable<any> {
    return this.rest._getUserById(userId)
  };


}
