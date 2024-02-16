import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Collection, Category } from 'src/app/interfaces/category';
import { DealType } from 'src/app/interfaces/items';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { IItemDB } from '../../../../../interfaces/items';
import { AuthService } from '../../../../../services/auth/auth.service';


@Component({
  selector: 'app-board-search-panel',
  templateUrl: './board-search-panel.component.html',
  styleUrls: ['./board-search-panel.component.scss']
})
export class BoardSearchPanelComponent implements OnInit {

  showFilter: boolean;
  cards: IItemDB[];
  @Output() openFilterOutput: EventEmitter<boolean> = new EventEmitter()
  @Output() updateCards: EventEmitter<any[]> = new EventEmitter()
  // path & params
  dealParams: string = `deal=donate`
  collectionParams: string = `collection=personal-shoes`
  categoryParams: string = `category=adult-male-shoes`
  collection: Collection = 'personal-shoes'
  category: Category = 'adult-male-shoes'
  deal: DealType = 'donate'
  defaultRequestParams: string = 'deal=donate&collection=personal-shoes&category=adult-male-shoes'

  constructor(private itemService: ItemService,
              private board: BoardService,
              private storage: StorageService) { }

  ngOnInit(): void {
    if(!this.storage.checkStorage('main-storage')) {
      this.itemService.getManyByParams(this.defaultRequestParams).then(() => this.board.render('main-storage'))
    } else {
      this.board.render('main-storage')
    }
  }; 

  path(): string {
    return `${this.dealParams}&${this.collectionParams}&${this.categoryParams}`
  };

  refresh() {
    this.itemService.getManyByParams(this.defaultRequestParams).then(() => this.board.render('main-storage'))
  }
  
  updateCategoryParams(ev: {ev: Event, value: {label: string, collection: Collection, category: Category}}): void {
    this.collection = ev.value.collection
    this.category = ev.value.category
    this.collectionParams = `collection=${ev.value.collection}`;
    this.categoryParams = `category=${ev.value.category}`;
    this.itemService.getManyByParams(this.path()).then(() => this.board.render('main-storage'));
  };

  updateDealParams(type: DealType): void {
    this.deal = type
    this.dealParams = `deal=${type}`;
    this.itemService.getManyByParams(this.path()).then(() => this.board.render('main-storage'))
  };

  updateFilterParams(params: string): void {
    this.itemService.getManyByParams(`${this.dealParams}&${this.collectionParams}&${params}`).then(() => {
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
