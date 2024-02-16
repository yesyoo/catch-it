import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser, IUserResponse } from 'src/app/interfaces/user';
import { AuthService } from '../auth/auth.service';
import { UserRestService } from './user-rest/user-rest.service';
import { BookmarkService } from '../bookmark/bookmark.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUser 
  private userIsLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  readonly userIsLoaded$ = this.userIsLoaded.asObservable()

  constructor(private rest: UserRestService,
              private auth: AuthService,
              private bookmark: BookmarkService) { }

  loadUser():Promise<any> {
    return new Promise(res => {
      this.getById(this.auth.ID()).subscribe(user => {
        this.setUser(user);
        this.bookmark.loadBookmarks().then(() => {
          this.userIsLoaded.next(true)
          res(user)
        })
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
  };

  getUser(): IUser  {
    return this.user 
  };

  getById(id: string): Observable<IUserResponse> {
    return this.rest.getUserById(id)
  };

}
