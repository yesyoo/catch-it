import { Injectable } from '@angular/core';
import { ItemRestService } from './item-rest.service';
import { Observable } from 'rxjs';
import { Category, Collection } from 'src/app/interfaces/category';
import { Deal } from 'src/app/interfaces/deal-type';
import { IPostItemData } from 'src/app/interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: any[] = [];
  item: any[];
  itemId: string;

  constructor(private itemRestService: ItemRestService) { }


  postItem(data: FormData): Observable<any> {
    return this.itemRestService.postItem(data)
  };

  getById(id: string): Observable<any> {
    return this.itemRestService.getById(id)
  };

  getItemsByParams(string: string): Observable<any> {
    let params = string;
    return this.itemRestService.getByParams(params)
  };

  getByUserId(id: string): Observable<any> {
    return this.itemRestService.getByUserIdUsers(id)
  };

  getByOwnerId(id: string): Observable<any> {
    return this.itemRestService.getByUserIdOwner(id)
  };

  deleteItemById(id: string, collection: string): Observable<any> {
    return this.itemRestService.deleteById(id, collection)
  };

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

  updateItem(data: {id: string, collection: string,  params: string}): Observable<any> {
    return this.itemRestService.updateItemByParams(data)
  }
}
