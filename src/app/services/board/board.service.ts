import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  authorizedUser: boolean
  targetCard: any
  targetUserId: string

  private cards: Subject<any> = new Subject()
  readonly cards$ = this.cards.asObservable()

  constructor(private router: Router) { }

  setCards(data: any) {
    this.cards.next(data)
  };

  getTargetCard(): any {
    console.log('board,',this.targetCard)
    return this.targetCard
  };

  setTargetCard(data: any) {
    this.targetCard = data
  };

  setTargetUserId(id: string) {
    this.targetUserId = id
  };

  getTargetUserId(): string {
    return this.targetUserId
  };

  navigate(path: string) {
    this.router.navigateByUrl(path)
  };

}

