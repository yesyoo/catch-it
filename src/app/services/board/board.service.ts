import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { StorageType } from 'src/app/types/types';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  // отвечает за хранения стореджей

  // селектед юзерс и кардс - это кардс сервис

  private selectedCard: any
  private selectedUserId: string;

  private mainStorage: any[] = [];
  private ownerStorage: any[] = [];
  private anyStorage: any = [];

  private mainCards: Subject<any> = new Subject()
  readonly mainCards$ = this.mainCards.asObservable()
  private ownerCards: Subject<any> = new Subject()
  readonly ownerCards$ = this.ownerCards.asObservable()
  private anyCards: Subject<any> = new Subject()
  readonly anyCards$ = this.anyCards.asObservable()

  private user: Subject<boolean> = new Subject()
  readonly user$ = this.user.asObservable()

  private storageType: Subject<StorageType> = new Subject()
  readonly storageType$ = this.storageType.asObservable()

  private authModal: Subject<boolean> = new Subject()
  readonly authModal$ = this.authModal.asObservable()

  readonly error: Subject<string> = new Subject()
  readonly error$ = this.error.asObservable()


  constructor() { }

  checkStorage(storageType: StorageType): Promise<boolean> {
    switch(storageType) {
      case 'owner-storage':
        return new Promise((res) => {
          if(Array.isArray(this.ownerStorage)) { this.ownerStorage.length <= 0 ? res(false) : res(true) }
          else res(false)
        });
      case 'main-storage':
        return new Promise((res) => {
          if(Array.isArray(this.mainStorage)) { this.mainStorage.length <= 0 ? res(false) : res(true) }
          else res(false)
        });
      case 'any-storage': 
        return new Promise((res) => {
          if(Array.isArray(this.mainStorage)) { this.mainStorage.length <= 0 ? res(false) : res(true) }
          else res(false)
        });
    };
  };

  show(type: StorageType) {
    return this.storageType.next(type)
  }

  setToStorage(data: any, storageType: StorageType) {
    switch(storageType) {
      case 'main-storage':
        this.mainStorage = data;
        this.mainCards.next(data);
        break;
      case 'owner-storage':
        this.ownerStorage = data;
        this.ownerCards.next(data);
        break;
      case 'any-storage':
        this.anyStorage = data;
        this.anyCards.next(data);
        break;
    };
  }

  getStorage(storageType: StorageType) {
    switch(storageType) {
      case 'main-storage':
        return this.mainStorage;
      case 'owner-storage':
        return this.ownerStorage;
      case 'any-storage':
        return this.anyStorage
    };
  };

  showAuthModal(data: boolean) {
    this.authModal.next(data)
  }

  showUserPanel(data: boolean) {
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

  sendErrorMessage(data: string) {
    this.error.next(data)
  };

}

