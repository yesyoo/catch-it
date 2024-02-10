import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ViewerType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private checkbox: Subject<boolean> = new Subject()
  readonly checkbox$ = this.checkbox.asObservable()

  private viewerType: Subject<ViewerType> = new Subject()
  readonly viewerType$ = this.viewerType.asObservable()

  constructor() { }

  addCheckbox(data: boolean) {
    this.checkbox.next(data)
  };

  updateViewerType(type: ViewerType) {
    this.viewerType.next(type)
  }

}
