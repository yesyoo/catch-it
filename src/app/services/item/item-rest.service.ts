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

  postItem(path: string, data: IPostItemData): Observable<any> {
    return this.http.post(`http://localhost:3003/items/${path}`, data)
  };

  getById(itemId: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items?_id=${itemId}`)
  };

  getItemsByParams(params: any): Observable<any> {
    return this.http.get(`http://localhost:3003/items?${params}`)
  };

  getAllItemsByUserId(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/user?userId=${userId}`)
  }
  deleteItemById(itemId: string, subcategoryType: string) : Observable<any> {
    return this.http.delete(`http://localhost:3003/items/delete?id=${itemId}&subcategoryType=${subcategoryType}`)
  }

}
