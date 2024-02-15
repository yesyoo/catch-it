import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private viewing: Subject<string> = new Subject()
  readonly viewing$ = this.viewing.asObservable()

  constructor() { }

  openAnyPanel(id: string) {
    return this.viewing.next(id)
  };


}
