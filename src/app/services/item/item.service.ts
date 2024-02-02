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

  postItem(path: string, data: IPostItemData): Observable<any> {
    return this.itemRestService.postItem(path, data)
  };

  getItemById(itemId: string): Observable<any> {
    return this.itemRestService.getById(itemId)
  };

  getItemsByParams(string: string): Observable<any> {
    let params = string;
    return this.itemRestService.getItemsByParams(params)
  };
  getAllItemsByUserId(userId: string): Observable<any> {
    return  this.itemRestService.getAllItemsByUserId(userId)
  }
  deleteItemById(itemId: string, category: string): Observable<any> {
    return this.itemRestService.deleteItemById(itemId, category)
  }
}
