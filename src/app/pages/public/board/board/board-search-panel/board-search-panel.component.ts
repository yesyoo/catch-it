import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Collection, Category } from 'src/app/interfaces/category';
import { DealType } from 'src/app/interfaces/items';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';


@Component({
  selector: 'app-board-search-panel',
  templateUrl: './board-search-panel.component.html',
  styleUrls: ['./board-search-panel.component.scss']
})
export class BoardSearchPanelComponent implements OnInit {

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

  overlap: boolean = true;

  @Output() openFilterOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() updateCards: EventEmitter<any[]> = new EventEmitter()



  constructor(private itemService: ItemService,
              private board: BoardService) { }

  ngOnInit(): void {
    this.board.checkStorage('main-storage').then(res => {
      if(!res) {
        this.itemService.getManyByParams(this.defaultRequestParams).subscribe(data => {
          this.board.setToStorage(data, 'main-storage')
          this.board.render('main-storage')
        })
      } else {
        this.board.render('main-storage')
      }
    })
  };

  path(): string {
    return `${this.dealParams}&${this.collectionParams}&${this.categoryParams}`
  };

  refresh() {
    this.itemService.getManyByParams(this.defaultRequestParams).subscribe(data => { 
      this.board.setToStorage(data, 'main-storage');
      this.board.render('main-storage');
    })
  }
  
  updateCategoryParams(ev: {ev: Event, value: {label: string, collection: Collection, category: Category}}): void {
    this.collection = ev.value.collection
    this.category = ev.value.category
    this.collectionParams = `collection=${ev.value.collection}`;
    this.categoryParams = `category=${ev.value.category}`;
    this.itemService.getManyByParams(this.path()).subscribe(data => {
      this.board.setToStorage(data, 'main-storage')
      this.board.render('main-storage')
    })
  };

  // updateDealParams(ev: {ev: Event, value: {label: string, type: DealType}}): void {
  //   this.deal = ev.value.type
  //   this.dealParams = `deal=${ev.value.type}`;
  //   this.itemService.getManyByParams(this.path()).subscribe(data => {
  //     this.board.setToStorage(data, 'main-storage')
  //     this.board.renderList('main-storage')
  //   })
  // };
  updateDealParams(type: DealType): void {
    this.deal = type
    this.dealParams = `deal=${type}`;
    this.itemService.getManyByParams(this.path()).subscribe(data => {
      this.board.setToStorage(data, 'main-storage')
      this.board.render('main-storage')
    })
  };

  updateFilterParams(params: string): void {
    this.itemService.getManyByParams(`${this.dealParams}&${this.collectionParams}&${params}`).subscribe(data => {
      this.board.setToStorage(data, 'main-storage')
      this.board.render('main-storage')
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
