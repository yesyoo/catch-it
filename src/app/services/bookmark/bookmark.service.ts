import { Injectable } from '@angular/core';
import { BookmarkRestService } from './bookmark-rest.service';
import { AuthService } from '../auth/auth.service';
import { IItemDB } from 'src/app/models/interfaces/items';
import { StorageService } from '../storage/storage.service';
import { IBookmarkDB } from 'src/app/models/interfaces/bookmarks';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarks: IBookmarkDB[];
 
  constructor(private rest: BookmarkRestService, 
              private auth: AuthService,
              private storage: StorageService) { }

  getBokkmarks(): IBookmarkDB[] {
    return this.bookmarks
  };
  setBookmarks(data: IBookmarkDB[]): void {
    this.bookmarks = data
  };

  sendBookmark(item: IItemDB): Promise<any> { //*
    return new Promise(res => {
      let match: boolean = false;
      this.bookmarks.forEach(el => {
        if(el.item === item._id) { 
          match = true 
        }
      });
      if(!match) {
        this.rest.sendBookmark({user: this.auth.ID(), item: item._id, collection: item.collection, title: item.item.title}).subscribe((bookmark: IBookmarkDB) => {
          this.bookmarks.push(bookmark);
          let array: IItemDB[] = this.storage.getStorage('bookmark-storage');
          array.push(item)
          this.storage.setToStorage(array, 'bookmark-storage');
          res(true)
        })
      } else {
        this.deleteOne(item._id).then(() => {
          
          res(false)
        })
      }
    })
  };

  deleteOne(itemId: string): Promise<any> { //*
    return new Promise(res => {
      this.rest.deleteOne(this.auth.ID(), itemId).subscribe(() => {
        const array = this.storage.getStorage('bookmark-storage').filter(item => item._id != itemId)
        this.storage.setToStorage(array, 'bookmark-storage')
        this.bookmarks = this.bookmarks.filter(el => el.item != itemId)
        res(true)
      })
    })
  };

  loadBookmarks(): Promise<any> { //*
    return new Promise(res => {
      console.log('userID', this.auth.ID())
      this.rest.getAllBookmarks(this.auth.ID()).subscribe((bookmarks: IBookmarkDB[]) => {
        console.log(bookmarks)
        this.bookmarks = bookmarks;
        res(true)
      })
    })
  };

  deleteAll(): Promise<any> { //*
    return new Promise(res => {
      this.rest.deleteAllBookmarks(this.auth.ID()).subscribe(() => {
        this.storage.setToStorage([], 'bookmark-storage')
        res(true)
      })
    })
  };
 
  mark(data: IItemDB[]): IItemDB[] { //*
    if(this.bookmarks) {
      this.bookmarks.forEach(obj => {
        data.forEach(item => {
          if(obj.item === item._id) {
            item.bookmark = true
          }
        })
      })
    }
    return data
  };
  
}
