import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'src/app/services/cards/cards.service';
import { BoardService } from 'src/app/services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { IItemDB } from 'src/app/interfaces/items';
import { ItemRestService } from '../../../../../../services/item/item-rest.service';
import { StorageType } from 'src/app/types/types';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-board-userpanel-owner',
  templateUrl: './board-userpanel-owner.component.html',
  styleUrls: ['./board-userpanel-owner.component.scss']
})
export class BoardUserpanelOwnerComponent implements OnInit {

  @Input() user: any
  @Input() storageType: StorageType;
  checkbox: boolean = false;
  checked: boolean = false;
  checkboxList: {id: string, collection: string, show: boolean}[];
  items: any[];
  

  constructor(private cardsService: CardsService,
              private board: BoardService,
              private navigationService: NavigationService,
              private itemService: ItemRestService,
              private bookmark: BookmarkService,
              private panel: PanelService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.cardsService.checkbox$.subscribe(res => this.checkbox = res);
    this.storageType = 'owner-storage'
  };

  switchStorageType(storageType: StorageType) {
    this.checkbox = false;
    this.checked = false;

    if(this.storageType !== storageType) {
      if(this.storage.checkStorage(storageType)) {
        this.storageType = storageType              
        this.board.render(storageType)
      } else {
        if(storageType === 'bookmark-storage') {
          this.getBookmarks().then(() => {
            this.storageType = storageType   
            this.board.render(storageType)
          })
        }
      }
    }
  };

  async getBookmarks(): Promise<any> {
    return new Promise(res => {
      if(this.storage.checkStorage('bookmark-storage')) {
        res(true)
      } else {
        this.bookmark.getBookmarks().then(() => res(true))
      }
    })
  };

  select() {
    this.checkbox ? this.cardsService.addCheckbox(false) : this.cardsService.addCheckbox(true)   
  };

  selectAll() {
    const checked = document.querySelectorAll('input[type="checkbox"]');
    checked.forEach(el => {
      const elem: any = el;
      this.checked ? elem.checked = false : elem.checked = 'checked'
    })
    this.checked ? this.checked = false : this.checked = true
  };

  getSelected(): {id: string, collection: string, show: boolean | null}[] {
    const array: {id: string, collection: string, show: boolean | null}[] = []
    const checkedArray = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedArray.forEach(el => {
      const itemId: string = el.getAttribute('id') + '';
      const itemCollection: string = el.getAttribute('data-collection') + '';
        array.push({id: itemId, collection: itemCollection, show: null})
    })
    return array
  };

  switchShowHide(data: boolean) {
    let checkedItems: {id: String, collection: string, show?: boolean | null }[] = this.getSelected()
    const ownerStorageItems: IItemDB[] = this.storage.getStorage('owner-storage')
    console.log('test', checkedItems)
    let postArray: any[] = [];
    if(checkedItems.length > 0) {
      checkedItems.forEach((checkedItem) => {
        ownerStorageItems.forEach((ownerItem: IItemDB) => {
          if(checkedItem.id == ownerItem._id && ownerItem.show !== data) {
            checkedItem.show = data
            postArray.push(checkedItem)
          }
        })
      })
      this.itemService.updateShowHideFromArray(postArray).subscribe(() => {
        postArray.forEach(item => {
          ownerStorageItems.forEach((ownerItem: IItemDB) => {
            if(item.id == ownerItem._id) ownerItem.show = data
          })
        })
        this.storage.setToStorage(ownerStorageItems, 'owner-storage')
      })
    }
  };
  deleteItem() {
   
    let checkedItems: {id: String, collection: string, show?: boolean | null }[] = this.getSelected()
    const ownerStorageItems: IItemDB[] = this.storage.getStorage('owner-storage')
    // console.log('test', checkedItems);
    let postArray: any[] = [];

    if(checkedItems.length > 0) {
      checkedItems.forEach((checkedItem) => {
        postArray.push({id: checkedItem.id, collection: checkedItem.collection})
        //удали эти id из
        // ownerStorageItems.forEach((ownerItem: IItemDB) => {
        //   if(checkedItem.id == ownerItem._id && ownerItem.show !== data) {
        //     checkedItem.show = data
        //     postArray.push(checkedItem)
        //   }
        // })
      })
      this.itemService.deleteMany(postArray).subscribe(res => {
        console.log(res);
        this.storage.deleteIdFromStorage(postArray, 'owner-storage')
      })
      
    }
    //работаем с массивом
    // this.itemService.deleteManyFromArray().subscribe()
  }

  exit() {
    this.navigationService.home()
    this.board.render('main-storage')
  }
}
