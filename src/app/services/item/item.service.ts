import { Injectable } from '@angular/core';
import { ItemRestService } from './item-rest.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: any[] = [];
  item: any[];
  itemId: string;

  constructor(private itemRestService: ItemRestService) { }

  setItem(path: string, data: {userId: string, deal: string, form: { item: any, category: any }}): Observable<any> {
    return this.itemRestService.postItem(path, data)
  };

  getItemById(itemId: string): Observable<any> {
    return this.itemRestService.getById(itemId)
  };

  getItemsByParams(string: string): Observable<any> {
    let params = string;
    return this.itemRestService.getItemsByParams(params)
  };
}
