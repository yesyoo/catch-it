import { Injectable } from '@angular/core';
import { ItemRestService } from './item-rest.service';
import { Observable } from 'rxjs';
import { IItemDB } from '../../interfaces/items';
import { StorageService } from '../storage/storage.service';
import { StorageType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private rest: ItemRestService,
              private storage: StorageService) { }

  postItem(data: FormData): Promise<any> {
    return new Promise(res => {
      this.rest.postItem(data).subscribe((item: IItemDB) => {
        this.storage.saveItem(item)
        res(true)
      })
    })
  };
  
  getManyFromArray(data: {id: string, collection: string}[], storageType: StorageType): Promise<any> {
    return new Promise(res => {
      this.rest.getManyFromArray(data).subscribe((response: IItemDB[]) => {
        this.storage.setToStorage(response, storageType)
        res(true)
      })
    })
  };

  getManyByParams(params: string): Promise<any> {
    return new Promise(res => {
      this.rest.getManyByParams(params).subscribe((response: IItemDB[]) => {
        this.storage.setToStorage(response, 'main-storage');
        res(true)
      })
    })
  };

  getAllByOwnerId(id: string): Promise<any> {
    return new Promise(res => {
      this.rest.getAllByOwnerId(id).subscribe((data: IItemDB[]) => {
        this.storage.setToStorage(data, 'owner-storage')
        res(true)
      })
    })
  };

  getAllByUserId(id: string): Promise<any> {
    return new Promise(res => {
      this.rest.getManyByUserId(id).subscribe((data: IItemDB[]) => {
        this.storage.setToStorage(data, 'any-storage')
        res(true)
      })
    })
  };

  getOneById(id: string): Promise<any> {
    return new Promise(res => {
      this.rest.getOneById(id).subscribe((data: IItemDB) => {
        this.storage.setOne(data)
        res(true)
      })
    })
  };
     
  deleteOne(itemId: string, collection: string): Promise<any> {
    return new Promise(res => {
      this.rest.deleteOne(itemId, collection).subscribe(() => {
        this.storage.deleteOne(itemId, 'owner-storage');
        res(true)
      })
    })
  };

  updateAccessMany(data: {id: string, collection: string, show: boolean}[]): Promise<any> {
    return new Promise(res => {
      this.rest.updateAccessMany(data).subscribe(() => {
        this.storage.updateAccessMany(data)
        res(true)
      })
    })
  };

  deleteMany(array: {id: string, collection: string}[], storageType: StorageType): Promise<any> {
    return new Promise(res => {
      this.rest.deleteMany(array).subscribe(() => {
        this.storage.deleteMany(array, storageType)
        res(true)
      })
    })
  };

  deleteAllByUserId(id: string): Observable<any> {
    return this.rest.deleteAllByUserId(id)
  };

  deleteAllInCollection(collection: string): Observable<any> {
    return this.rest.deleteAllInCollection(collection)
  };
}
