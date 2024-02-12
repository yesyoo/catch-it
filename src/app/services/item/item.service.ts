import { Injectable } from '@angular/core';
import { ItemRestService } from './item-rest.service';
import { Observable } from 'rxjs';
import { Category, Collection } from 'src/app/interfaces/category';
import { Deal } from 'src/app/interfaces/deal-type';
import { IPostItem } from 'src/app/interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: any[] = [];
  item: any[];
  itemId: string;

  constructor(private itemRestService: ItemRestService) { }
  ////////////////////////////////////////////////////
  postItem(data: FormData): Observable<any> {
    return this.itemRestService.postItem(data)
  };
  /////////////////////////////////////////////////
  getOneById(id: string): Observable<any> {
    return this.itemRestService.getOneById(id)
  };
  getManyByParams(params: string): Observable<any> {
    return this.itemRestService.getManyByParams(params)
  };
  getAllByOwnerId(id: string): Observable<any> {
    return this.itemRestService.getAllByOwnerId(id)
  };
  getManyByUserId(id: string): Observable<any> {
    return this.itemRestService.getManyByUserId(id)
  };
  getManyFromArray(array: any[]): Observable<any> {
    return this.itemRestService.getManyFromArray(array)
  }
  /////////////////////////////////////////////////
  deleteOneByIdAndCollection(id: string, collection: string): Observable<any> {
    return this.itemRestService.deleteOneByIdAndCollection(id, collection)
  };
  deleteManyFromArray(array: {id: string, collection: string}[]): Observable<any> {
    return this.itemRestService.deleteManyFromArray(array)
  };
  deleteAllInCollection(collection: string): Observable<any> {
    return this.itemRestService.deleteAllInCollection(collection)
  };
  deleteAllByUserId(id: string): Observable<any> {
    return this.itemRestService.deleteAllByUserId(id)
  };
  ////////////////////////////////////////////////////////////
  updateShowHideFromArray(array: {id: string, collection: string, show: boolean}[]): Observable<any> {
    return this.itemRestService.updateShowHideFromArray(array)
  };
  /////////////////////////////////////////////////////////////////
  updateLocalStorageItemsList(data: any): void {
    const string = localStorage.getItem('items') 
    if(string) {
      let items: any[] = JSON.parse(string) 
      if(items.length >= 5) {
        items.shift()
      }
      items.push(data)
      localStorage.setItem('items', JSON.stringify(items))
    } else {
      localStorage.setItem('items', JSON.stringify([data]))
    };
  };
  deleteItemFromLocalStorage(id: string) {
    const string = localStorage.getItem('items') 
    if(string) {
      let items: any[] = JSON.parse(string) 
      for(let i = 0; i <= items.length; i++) {
        if(items[i]._id === id) {
          items.slice(i, 1)
        }
      }
    }
  };

}
