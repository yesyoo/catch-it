import { Injectable } from '@angular/core';
import { SubcategoryType } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  item: any;

  constructor() { }

  setItem(data: any): void {
    this.item = data
    console.log('data', this.item)
  }
}
