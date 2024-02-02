import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) { }

  _getUserById(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3003/users/id?id=${userId}`)
  };

  getUserById(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3003/users/user-data?userId=${userId}`)
  }
 
}
