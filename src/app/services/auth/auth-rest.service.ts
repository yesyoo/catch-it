import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserAuth, IUser } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { IUserReg } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(private http: HttpClient) { }

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

  logout() {

  };

  updateUser() {

  };

  updateUserPassword() {

  }
}
