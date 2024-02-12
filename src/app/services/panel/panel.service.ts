import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private homecoming: Subject<boolean> = new Subject()
  readonly homecoming$ = this.homecoming.asObservable()

  private viewing: Subject<string> = new Subject()
  readonly viewing$ = this.viewing.asObservable()

  ownerStorageType: StorageType

  constructor() { }

  openOwnerPanel(data: boolean) {
    return this.homecoming.next(data)
  };
  openAnyPanel(id: string) {
    return this.viewing.next(id)
  };
  switchOwnerStorageType(type: StorageType) {
    this.ownerStorageType = type
  }
  getOwnerStorageType(): StorageType {
    return this.ownerStorageType
  }

}
