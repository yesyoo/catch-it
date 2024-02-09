import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private selectedCard: any
  private selectedUserId: string;

  private visitorStorage: any[] = [];
  private ownerStorage: any[] = [];
  private anyUserStorage: any = [];

  private visitorCards: Subject<any> = new Subject()
  readonly visitorCards$ = this.visitorCards.asObservable()
  private ownerCards: Subject<any> = new Subject()
  readonly ownerCards$ = this.ownerCards.asObservable()
  private targetUserCards: Subject<any> = new Subject()
  readonly targetUserCards$ = this.targetUserCards.asObservable()

  private user: Subject<boolean> = new Subject()
  readonly user$ = this.user.asObservable()

  private storageType: Subject<'visitor' | 'owner' | 'anyUser'> = new Subject()
  readonly storageType$ = this.storageType.asObservable()

  private authModal: Subject<boolean> = new Subject()
  readonly authModal$ = this.authModal.asObservable()


  constructor() { }

  checkOwnerStorage(): Promise<boolean> {
    return new Promise((res) => {
      if(Array.isArray(this.visitorStorage)) { this.visitorStorage.length <= 0 ? res(false) : res(true) }
    })
  };

  checkVisitorStorage(): Promise<boolean> {
    return new Promise((res) => {
      if(Array.isArray(this.ownerStorage)) { this.ownerStorage.length <= 0 ? res(false) : res(true) }
    })
  };

  updateCardListFor(type: 'visitor' | 'owner' | 'anyUser') {
    return this.storageType.next(type)
  }

  setVisitorCards(data: any) {
    this.visitorStorage = data;
    this.storageType.next('visitor')
    this.visitorCards.next(data)
  };

  setOwnerCards(data: any) {
    this.ownerStorage = data;
    this.ownerCards.next(data)
  }
  setAnyUserCards(data: any) {
    this.anyUserStorage = data;
    this.storageType.next(data)
  }

  getVisitorStorage() {
    return this.visitorStorage
  };

  getOwnerStorage() {
    return this.ownerStorage
  };
  getAnyUserStorage() {
    return this.anyUserStorage
  }

  showAuthModal(data: boolean) {
    this.authModal.next(data)
  }

  showUser(data: boolean) {
    this.user.next(data)
  }

  getSelectedCard(): any {
    return this.selectedCard
  };

  setSelectedCard(data: any) {
    this.selectedCard = data
  };

  setSelectedUserId(id: string) {
    this.selectedUserId = id
  };

  getSelectedUserId(): string | null {
    return this.selectedUserId
  };

}

