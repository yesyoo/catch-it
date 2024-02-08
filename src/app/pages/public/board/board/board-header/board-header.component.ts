import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Collection, Category } from 'src/app/interfaces/category';
import { DealType } from 'src/app/interfaces/items';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {

  showFilter: boolean;
  cards: any[]
  
  // params
  dealParams: string = `deal=donate`
  collectionParams: string = `collection=personal-shoes`
  categoryParams: string = `category=adult-male-shoes`


  collection: Collection = 'personal-shoes'
  category: Category = 'adult-male-shoes'
  deal: DealType = 'donate'

  defaultRequestParams: string = 'deal=donate&collection=personal-shoes&category=adult-male-shoes'

  @Output() openFilterOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() updateCards: EventEmitter<any[]> = new EventEmitter()

  constructor(private itemService: ItemService,
              private board: BoardService) { }


  ngOnInit(): void {
    this.board.checkStorage().then(res => {
      if(res === false) {
        this.itemService.getItemsByParams(this.defaultRequestParams).subscribe(data => this.board.setCards(data))
      }
    })
  };

  path(): string {
    return `${this.dealParams}&${this.collectionParams}&${this.categoryParams}`
  };

  refresh() {
    this.itemService.getItemsByParams(this.defaultRequestParams).subscribe(data => this.board.setCards(data))
  }
  
  updateCategoryParams(ev: {ev: Event, value: {label: string, collection: Collection, category: Category}}): void {
    this.collection = ev.value.collection
    this.category = ev.value.category
    this.collectionParams = `collection=${ev.value.collection}`;
    this.categoryParams = `category=${ev.value.category}`;
    this.itemService.getItemsByParams(this.path()).subscribe(data => {
      this.board.setCards(data)
  
    })
  };

  updateDealParams(ev: {ev: Event, value: {label: string, type: DealType}}): void {
    this.deal = ev.value.type
    this.dealParams = `deal=${ev.value.type}`;
    this.itemService.getItemsByParams(this.path()).subscribe(data => {
      this.board.setCards(data)
      console.log('deal update')

    })
  };

  updateFilterParams(params: string): void {
    this.itemService.getItemsByParams(`${this.dealParams}&${this.collectionParams}&${params}`).subscribe(data => {
      this.board.setCards(data)
    })
 };

  openFilter(): void {
    if(!this.showFilter) {
      this.showFilter = true
    } else {
      this.showFilter = false;
      this.openFilterOutput.emit(false)
    }
  };
}
