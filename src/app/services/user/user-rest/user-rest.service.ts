import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) { }

  _getUserById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/users/id?id=${id}`)
  };

  getUserById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/users/user-data?user=${id}`)
  }
  deleteUserAndItems(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/users/delete-user-and-items?id=${id}`)
  }
 
}
