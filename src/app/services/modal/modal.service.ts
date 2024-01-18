import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalType } from 'src/app/interfaces/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModal: BehaviorSubject<ModalType> = new BehaviorSubject(false as ModalType)
  readonly showModal$ = this.showModal.asObservable()
  messsageText: string = "messageText from ModalService"
  
  constructor() { }

  show(data: ModalType): void {
    return this.showModal.next(data)
  };

  getMessage(): string {
    return this.messsageText
  };
  setMessage(data: string) {
    this.messsageText = data
  }
}
