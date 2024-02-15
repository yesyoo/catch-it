import { Injectable } from '@angular/core';
import { ItemRestService } from './item-rest.service';
import { Observable } from 'rxjs';
import { IItemDB } from '../../interfaces/items';
import { StorageService } from '../storage/storage.service';
import { StorageType } from 'src/app/types/types';
import { BookmarkService } from '../bookmark/bookmark.service';
import { faTurkishLira } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private rest: ItemRestService,
              private storage: StorageService,
              private bookmark: BookmarkService) { }

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
        ////////////////////////////////////
        const marked = this.bookmark.mark(response)
        ////////////////////////////////////////
        this.storage.setToStorage(marked, storageType)
        console.log('marked',marked)
        res(true)
      })
    })
  };

  getManyByParams(params: string): Promise<any> {
    return new Promise(res => {
      this.rest.getManyByParams(params).subscribe((response: IItemDB[]) => {
        const marked = this.bookmark.mark(response)
        this.storage.setToStorage(marked, 'main-storage');
        console.log('marked:',marked)
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
        console.log('oneTmpItem', data)
        const markedArray = this.bookmark.mark([data])
        this.storage.setOneTmpItem(markedArray[0])
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
