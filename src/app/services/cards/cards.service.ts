import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private checkbox: Subject<boolean> = new Subject()
  readonly checkbox$ = this.checkbox.asObservable()

  constructor() { }

  addCheckbox(data: boolean) {
    this.checkbox.next(data)
  };

}
