import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalType } from '../../../interfaces/modal';
import { Observable } from 'rxjs';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.scss']
})
export class CardBoardComponent implements OnInit, OnDestroy {

  cards: any[]
  showItemCard: boolean
  card: any;
  category: any;
  requestParams: string = 'dealType=donate&collection=personal-shoes&subcategoryType=adult-male-shoes'
  notFound: boolean = false

  constructor(private modalService: ModalService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.modalService.showModal$.subscribe(data => this.showItemCard = data );

    this.itemService.getItemsByParams(this.requestParams).subscribe(data => {
      this.cards = data
    })
  };

  ngOnDestroy(): void {
    this.showItemCard = false
  };

  open(cardId: string){
    this.card = this.cards.filter(el => el._id === cardId)[0]
    this.showItemCard = true
  };

  updateCategory(params: string): void {
    this.requestParams = params
    this.getCards().subscribe(data => this.cards = data)
  };

  updateDeal(params: string): void {
    this.requestParams = params
    this.getCards().subscribe(data => this.cards = data)
  };

  updateFilter(params: string): void {
    this.requestParams = params
    this.getCards().subscribe(data => {
      if(data.length === 0) {
        this.notFound = true
      } else if(data.length > 0) {
        this.notFound = false
        this.cards = data
      }
    })
  };
  
  getCards(): Observable<any> {
    return this.itemService.getItemsByParams(this.requestParams)
  };

  openFilter(boolean: boolean) {
    console.log('filter off')
  };

}
