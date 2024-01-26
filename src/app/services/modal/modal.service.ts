import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalType } from 'src/app/interfaces/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModal: Subject<boolean> = new Subject()
  readonly showModal$ = this.showModal.asObservable()
  messsageText: string = "messageText from ModalService"
  
  constructor() { }

  show(data: boolean): void {
    return this.showModal.next(data)
  };

  getMessage(): string {
    return this.messsageText
  };
  setMessage(data: string) {
    this.messsageText = data
  }
}
