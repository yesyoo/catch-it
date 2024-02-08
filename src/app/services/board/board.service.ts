import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  selectedCard: any
  selectedUserId: string;

  storage: any[] = [];
  userStorage: any[] = [];

  private cards: Subject<any> = new Subject()
  readonly cards$ = this.cards.asObservable()

  private userCards: Subject<any> = new Subject()
  readonly userCards$ = this.userCards.asObservable()

  private user: Subject<boolean> = new Subject()
  readonly user$ = this.user.asObservable()

  private boardType: Subject<'users' | 'owner'> = new Subject()
  readonly boardType$ = this.boardType.asObservable()

  private authModal: Subject<boolean> = new Subject()
  readonly authModal$ = this.authModal.asObservable()


  constructor(private router: Router) { }

  checkStorage(): Promise<boolean> {
    return new Promise((res) => {
      if(Array.isArray(this.storage)) { this.storage.length <= 0 ? res(false) : res(true) }
    })
  };

  checkUserStorage(): Promise<boolean> {
    return new Promise((res) => {
      if(Array.isArray(this.userStorage)) { this.userStorage.length <= 0 ? res(false) : res(true) }
    })
  };

  changeBoardType(type: 'users' | 'owner') {
    return this.boardType.next(type)
  }

  setCards(data: any) {
    this.storage = data;
    this.boardType.next('users')
    this.cards.next(data)
  };

  setUserCards(data: any) {
    this.userStorage = data;
    // this.boardType.next('owner')
    this.userCards.next(data)
  }

  getStorage() {
    return this.storage
  };

  getUserStorage() {
    return this.userStorage
  };


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

  navigate(path: string) {
    this.router.navigateByUrl(path)
  };

}

