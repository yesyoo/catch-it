import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'src/app/services/cards/cards.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { IItemDB } from 'src/app/interfaces/items';
import { ItemRestService } from '../../../../../../services/item/item-rest.service';
import { StorageType } from 'src/app/types/types';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { PanelService } from 'src/app/services/panel/panel.service';

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
              private panel: PanelService) { }

  ngOnInit(): void {
    this.cardsService.checkbox$.subscribe(res => this.checkbox = res);
    // this.board.storageType$.subscribe((type: StorageType) => {
    //   this.switchStorageType(type)
    // })
    let type = this.panel.getOwnerStorageType()
    console.log('type start', type)
    if(type) {
      this.storageType = type
      this.board.render(type)
    }
  };
  switchStorageType(type: StorageType) {
    if(this.storageType !== type) {
      switch(type) {
        case 'owner-storage': 
        this.storageType = type
          this.board.render('owner-storage');
          break;
        case 'bookmark-storage':
          this.board.checkStorage('bookmark-storage').then(res => {
            if(!res) {
              this.getBookmarks().then(res => {
                this.storageType = type
                this.panel.switchOwnerStorageType('bookmark-storage')
               
                this.board.render('bookmark-storage')
              })
            } else {
              this.storageType = type
              this.panel.switchOwnerStorageType('bookmark-storage')
              
              this.board.render('bookmark-storage')
            }
          })
 
      }
    }
  }
  async getBookmarks(): Promise<any> {
    return new Promise(res => {
      const array: any[] = this.bookmark.getBookmarksListId()
    if(array.length > 0) {
      this.itemService.getManyFromArray(array).subscribe(data => {
        this.board.setToStorage(data, 'bookmark-storage')
        res(data)
        // console.log('bookmark-storage', this.board.getStorage('bookmark-storage'))
        // this.board.renderList('bookmark-storage')
      })
    }

    })
    
  }

 
  exit() {
    this.navigationService.home()

  }



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

  getChecked(): {id: string, collection: string, show: boolean | null}[] {
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
    let checkedItems: {id: String, collection: string, show?: boolean | null }[] = this.getChecked()
    const ownerStorageItems: IItemDB[] = this.board.getStorage('owner-storage')
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
      console.log('postData', postArray)
      this.itemService.updateShowHideFromArray(postArray).subscribe(res => {
        if(res) {
          postArray.forEach(item => {
            ownerStorageItems.forEach((ownerItem: IItemDB) => {
              if(item.id == ownerItem._id) ownerItem.show = data
            })
          })
          this.board.setToStorage(ownerStorageItems, 'owner-storage')
        }
      })
    }
  };

  back() {
    this.navigationService.home()
    this.board.render('main-storage')
  }
}
