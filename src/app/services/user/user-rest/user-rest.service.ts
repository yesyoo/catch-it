import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/users/user-data?id=${id}`)
  }
  deleteUserAndItems(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/users/${id}`)
  }
}
