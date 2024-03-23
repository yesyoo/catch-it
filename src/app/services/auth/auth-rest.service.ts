import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserAuth } from 'src/app/models/interfaces/user';
import { Observable } from 'rxjs';
import { IUserReg } from '../../models/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(private http: HttpClient) { }

  checkRole(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/users/admin/${id}`)
  }

  register(data: IUserReg): Observable<any> {
    console.log('reg =>')
    return this.http.post('http://localhost:3003/users/register', data)
  };

  login(data: IUserAuth): Observable<any> {
    return this.http.post('http://localhost:3003/users/login', data)
  };

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/users/delete/${userId}`)
  };

}
