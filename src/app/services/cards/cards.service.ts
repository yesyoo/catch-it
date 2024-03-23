import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewerType } from 'src/app/models/types/types';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private checkbox: Subject<boolean> = new Subject()
  readonly checkbox$ = this.checkbox.asObservable()

  private viewerType: Subject<ViewerType> = new Subject()
  readonly viewerType$ = this.viewerType.asObservable()

  bookmarksId: string[] = [];

  constructor() { }

  addCheckbox(data: boolean) {
    this.checkbox.next(data)
  };

  updateViewerType(type: ViewerType) {
    this.viewerType.next(type)
  };

}
