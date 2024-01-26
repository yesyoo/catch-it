import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemRestService {

  constructor(private http: HttpClient) { }

  postItem(path: string, data: {userId: string, dealType: string, subcategoryType: string, form: { itemProp: any, categoryProp: any }}): Observable<any> {
    return this.http.post(`http://localhost:3003/items/${path}`, data)
  };

  getById(itemId: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items?_id=${itemId}`)
  };

  getItemsByParams(params: any): Observable<any> {
    return this.http.get(`http://localhost:3003/items?${params}`)
  };

}
