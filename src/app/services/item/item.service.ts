import { Injectable } from '@angular/core';
import { ItemRestService } from './item-rest.service';
import { Observable } from 'rxjs';
import { IItemDB } from '../../models/interfaces/items';
import { StorageService } from '../storage/storage.service';
import { StorageType } from 'src/app/models/types/types';
import { BookmarkService } from '../bookmark/bookmark.service';
import { IUserListItem } from 'src/app/models/interfaces/bookmarks';
import { IBookmarkDB } from '../../models/interfaces/bookmarks';

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
  
  getMany(data: IUserListItem[], storageType: StorageType): Promise<any> {
    return new Promise(res => {
      this.rest.getMany(data).subscribe((response: IItemDB[]) => {
        const marked = this.bookmark.mark(response)
        this.storage.setToStorage(marked, storageType)
        res(true)
      })
    })
  };

  getBookmarks(data: IBookmarkDB[]): Promise<any> {
    return new Promise(res => {
      let array: any[] = [];
      data.forEach(item => array.push({id: item.item, collection: item.collection}))
      this.rest.getMany(array).subscribe((response: IItemDB[]) => {
        const marked = this.bookmark.mark(response)
        this.storage.setToStorage(marked, 'bookmark-storage')
        res(true)
      })
    })
  };

  getManyByParams(params: string): Promise<any> {
    return new Promise(res => {
      this.rest.getManyByParams(params).subscribe((response: IItemDB[]) => {
        const marked = this.bookmark.mark(response)
        this.storage.setToStorage(marked, 'main-storage');
        res(true)
      })
    })
  };

  getByOwner(id: string): Promise<any> {
    return new Promise(res => {
      this.rest.getByOwner(id).subscribe((data: IItemDB[]) => {
        this.storage.setToStorage(data, 'owner-storage')
        res(true)
      })
    })
  };

  getByUser(id: string): Promise<any> {
    return new Promise(res => {
      this.rest.getByUser(id).subscribe((data: IItemDB[]) => {
        const marked = this.bookmark.mark(data)
        this.storage.setToStorage(marked, 'any-storage')
        res(true)
      })
    })
  };

  getOne(id: string): Promise<any> {
    return new Promise(res => {
      this.rest.getOne(id).subscribe((data: IItemDB) => {
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

  deleteByUser(id: string): Observable<any> {
    return this.rest.deleteByUser(id)
  };
}
