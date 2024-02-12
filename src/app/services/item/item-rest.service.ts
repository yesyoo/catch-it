import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Collection } from 'src/app/interfaces/category';
import { Deal } from 'src/app/interfaces/deal-type';
import { IPostItem } from 'src/app/interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class ItemRestService {

  constructor(private http: HttpClient) { }

  postItem(data: FormData): Observable<any> {
    return this.http.post(`http://localhost:3003/items/create`, data)
  };

  getOneById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/get-one-by-id?id=${id}`)
  };
  getManyByParams(params: any): Observable<any> {
    return this.http.get(`http://localhost:3003/items/get-many-by-params?${params}`)
  };
  getAllByOwnerId(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/get-all-by-owner-id?id=${id}`)
  };
  getManyByUserId(id: string): Observable<any> {
    return this.http.get(`http://localhost:3003/items/get-many-by-user-id?id=${id}`)
  };
  getManyFromArray(array: any[]): Observable<any> {
    return this.http.post(`http://localhost:3003/items/get-many-from-array`, array)
  }


  deleteOneByIdAndCollection(id: string, collection: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/delete-one-by-id-and-collection?id=${id}&collection=${collection}`)
  };
  deleteManyFromArray(array: {id: string, collection: string}[]): Observable<any> {
    return this.http.post(`http://localhost:3003/items/delete-by-id-and-collection-from-array`, array)
  };
  deleteAllInCollection(collection: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/delete-all-in-collection?collection=${collection}`)
  };
  deleteAllByUserId(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/items/delete-all-by-user-id/${id}`)
  };

  updateShowHideFromArray(array: {id: string, collection: string, show: boolean}[]): Observable<any> {
    return this.http.patch(`http://localhost:3003/items/update-show-hide-from-array`, array)
  };

}
