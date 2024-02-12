import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkRestService {

  constructor(private http: HttpClient) { }

  sendBookmark(obj: {userId: string, itemId: string, collection: string, title: string}): Observable<any> {
    return this.http.post(`http://localhost:3003/bookmarks`, obj)
  };
  getAllBookmarks(user: string): Observable<any> {
    return this.http.get(`http://localhost:3003/bookmarks/get-all/${user}`)
  };
  deleteOneById(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/bookmarks/delete-one/${id}`)
  };
  deleteManyFromArray(id: string[]): Observable<any> {
    return this.http.post(`http://localhost:3003/bookmarks/delete-many`, id)
  };
  deleteAllBookmarks(user: string): Observable<any> {
    return this.http.delete(`http://localhost:3003/bookmarks/delete-all/${user}`)
  };

}
