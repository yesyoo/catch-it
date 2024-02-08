import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Collection } from 'src/app/interfaces/category';
import { Deal } from 'src/app/interfaces/deal-type';
import { IPostItemData } from 'src/app/interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class ItemRestService {

  constructor(private http: HttpClient) { }

  postItem(data: FormData): Observable<any> {
    return this.http.post(`http://localhost:3003/items`, data)
  };

  getById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/id?id=${id}`)
  };

  getByParams(params: any): Observable<any> {
    return this.http.get(`http://localhost:3003/items/params?${params}`)
  };

  getByUserIdOwner(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/user?id=${id}`)
  };
  getByUserIdUsers(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/users?id=${id}`)
  };

  deleteById(id: string, collection: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/delete?id=${id}&collection=${collection}`)
  };

  deleteAllInCollection(collection: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/all?collection=${collection}`)
  };

  updateItemByParams(data: {id: string, collection: string, params: string}): Observable<any> {
    return this.http.patch(`http://localhost:3003/items/update`, data)
  }

}
