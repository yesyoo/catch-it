import { Injectable } from '@angular/core';
import { BookmarkRestService } from './bookmark-rest.service';
import { AuthService } from '../auth/auth.service';
import { IItemDB } from 'src/app/interfaces/items';
import { StorageService } from '../storage/storage.service';
import { ItemService } from '../item/item.service';
import { IBookmarksDB } from 'src/app/interfaces/bookmarks';
import { StorageType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private ID: string = this.auth.getAuthUserID()
  private bookmarks: IBookmarksDB[] = [];
  public itemIdAndCollection: {id: string, collection: string}[] = [];
 
  constructor(private rest: BookmarkRestService, 
              private auth: AuthService,
              private storage: StorageService) { }


  sendBookmark(itemId: string, collection: string, title: string,): Promise<any> {
    return new Promise(res => {
      this.rest.sendBookmark({userId: this.ID, itemId: itemId, collection: collection, title: title}).subscribe(() => {
        this.itemIdAndCollection.push({id: itemId, collection: collection})
        this.storage.setBookmarkList(this.itemIdAndCollection)
        // мне нужно добавить итем в сторедж
        // нужно скачать итем на клиенте
        // нужно дать пометку бакмаркедэтому итему
      })
    })
  };

  loadBookmarks(): Promise<any> {
    return new Promise(res => {
      this.rest.getAllBookmarks(this.ID).subscribe((bookmarks: IBookmarksDB[]) => {
        this.bookmarks = bookmarks;
        this.bookmarks.forEach((bookmark: IBookmarksDB) => {
          this.itemIdAndCollection.push({id: bookmark.itemId, collection: bookmark.collection});
          this.storage.setBookmarkList(this.itemIdAndCollection)
        });
        res(true)
      })
    })
  };
  getBookmarks(): Promise<any> {
    return new Promise(res => {
      // this.itemService.getManyFromArray(this.itemIdAndCollection, 'bookmark-storage').then(() => {
      //   res(true)
      // })

    })
  }

  deleteAllBookmarks(): Promise<any> {
    return new Promise(res => {
      this.rest.deleteAllBookmarks(this.ID).subscribe(() => {
        this.itemIdAndCollection = [];
        this.storage.setBookmarkList(this.itemIdAndCollection)
        this.storage.setToStorage([], 'bookmark-storage')
        res(true)
      })
    })
  };

  deleteOne(itemId: string): Promise<any> {
    return new Promise(res => {
      this.rest.deleteOne(this.ID, itemId).subscribe((bookmarkId: string) => {
        this.itemIdAndCollection.filter(id => id.id !== bookmarkId)
        this.storage.setBookmarkList(this.itemIdAndCollection)
        this.bookmarks.filter(bookmark => bookmark._id !== bookmarkId)
        this.storage.deleteOne(bookmarkId, 'bookmark-storage')
        res(true)
      })
    })
  }

  deleteManyFromArray(array: {id: string, collection: string}[]): Promise<any> {
    return new Promise(res => {
      this.rest.deleteManyFromArray(array).subscribe((bookmarkId: string[]) => {
        let list = this.itemIdAndCollection
        bookmarkId.forEach(id => {
          list.filter(listId => listId.id !== id )
        })
        this.itemIdAndCollection = list
        this.storage.setBookmarkList(this.itemIdAndCollection)
        this.storage.deleteMany(array, 'bookmark-storage')
        res(true)
      })
    })
  };

  mark(data: IItemDB[]): IItemDB[] {
    let array = this.itemIdAndCollection
    console.log('mark => ')
    array.forEach(obj => {
      data.forEach(item => {
        if(obj.id === item._id) {
          item.bookmark = true
        }
      })
    })
    return data
  };
  
}
