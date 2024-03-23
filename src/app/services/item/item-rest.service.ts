import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemRestService {

  constructor(private http: HttpClient) { }

  postItem(data: FormData): Observable<any> {
    return this.http.post(`http://localhost:3003/items/create`, data)
  };

  getOne(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/get-one?id=${id}`)
  };
  getManyByParams(params: any): Observable<any> {
    return this.http.get(`http://localhost:3003/items/get-many-by-params?${params}`)
  };
  getMany(array: any[]): Observable<any> {
    return this.http.post(`http://localhost:3003/items/get-many`, array)
  };
  getByOwner(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/owner?id=${id}`)
  };
  getByUser(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/user?id=${id}`)
  };
  updateAccessMany(data: {id: string, collection: string, show: boolean}[]): Observable<any> {
    return this.http.patch(`http://localhost:3003/items/access`, data)
  };
  deleteOne(id: string, collection: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/delete-one?id=${id}&collection=${collection}`)
  };
  deleteMany(array: {id: string, collection: string}[]): Observable<any> {
    return this.http.post(`http://localhost:3003/items/delete-many`, array)
  };
  deleteByUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/by-user/${id}`)
  };

}
