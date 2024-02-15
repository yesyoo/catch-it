import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageType } from 'src/app/types/types';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private selectedCard: any
  private selectedUserId: string;
 
  private ownerBoardPanel: Subject<boolean> = new Subject()
  readonly ownerBoardPanel$ = this.ownerBoardPanel.asObservable()

  private storageType: Subject<StorageType> = new Subject()
  readonly storageType$ = this.storageType.asObservable()

  private authModal: Subject<boolean> = new Subject()
  readonly authModal$ = this.authModal.asObservable()

  readonly error: Subject<string> = new Subject()
  readonly error$ = this.error.asObservable()

  constructor(private storage: StorageService) { }
  
  checkStorage(storageType: StorageType): boolean {
    return this.storage.checkStorage(storageType)
  };

  render(type: StorageType) {
    return this.storageType.next(type)
  };
    
  showAuthModal(data: boolean) {
    this.authModal.next(data)
  };

  showBoardUserPanel(data: boolean) {
    this.ownerBoardPanel.next(data)
  };

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

