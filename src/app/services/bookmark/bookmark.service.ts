import { Injectable } from '@angular/core';
import { BookmarkRestService } from './bookmark-rest.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private ID: string = this.auth.getAuthUserID()
  private bookmarksListId: string[];
  
  constructor(private rest: BookmarkRestService, 
              private auth: AuthService) { }

  sendBookmark(itemId: string, itemCollection: string, itemTitle: string,): Observable<any> {
    return this.rest.sendBookmark({userId: this.ID, itemId: itemId, collection: itemCollection, title: itemTitle})
  };
  getAllBookmarks(): Observable<any> {
    return this.rest.getAllBookmarks(this.ID)
  };
  deleteOneById(id: string): Observable<any> {
    return this.rest.deleteOneById(id)
  };
  deleteManyFromArray(id: string[]): Observable<any> {
    return this.rest.deleteManyFromArray(id)
  };
  deleteAllBookmarks(): Observable<any> {
    return this.rest.deleteAllBookmarks(this.ID)
  };

  getBookmarksListId(): any[] {
    return this.bookmarksListId
  }
  setBookmarksListId(data: any[]) {
    this.bookmarksListId = data
  }

  
  
}
