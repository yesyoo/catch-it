import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CardsService } from 'src/app/services/cards/cards.service';
import { BoardService } from 'src/app/services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { IItemDB } from 'src/app/models/interfaces/items';
import { StorageType } from 'src/app/models/types/types';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-board-userpanel-owner',
  templateUrl: './board-userpanel-owner.component.html',
  styleUrls: ['./board-userpanel-owner.component.scss']
})
export class BoardUserpanelOwnerComponent implements OnInit {

  @Input() user: any
  @Input() storageType: StorageType;
  @ViewChild('items') itemsPage: ElementRef;
  @ViewChild('bookmarks') bookmarksPage: ElementRef;
  checkbox: boolean = false;
  checked: boolean = false;
  checkboxList: {id: string, collection: string, show: boolean}[];
  items: any[];

  constructor(private cardsService: CardsService,
              private board: BoardService,
              private navigationService: NavigationService,
              private itemService: ItemService,
              private bookmarkService: BookmarkService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.cardsService.checkbox$.subscribe(res => this.checkbox = res);
    this.storageType = 'owner-storage'
  };

  switchStorage(storageType: StorageType) {
    if(this.storageType !== storageType) {
      this.checkbox = false;
      this.checked = false;
      this.storageType = storageType;
      if(storageType === 'owner-storage') {

        this.bookmarksPage?.nativeElement.classList.remove('title-active')
        this.itemsPage?.nativeElement.classList.add('title-active')
        this.board.render('owner-storage')
      } else {
        this.bookmarksPage?.nativeElement.classList.add('title-active')
        this.itemsPage?.nativeElement.classList.remove('title-active')
        this.getBookmarks()

      }
    }
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

  updateAccess(data: boolean) {
    let checkedItems: {id: String, collection: string, show?: boolean | null }[] = this.getSelected()
    const ownerStorageItems: IItemDB[] = this.storage.getStorage('owner-storage')
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
      this.itemService.updateAccessMany(postArray).then(() => {
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
    let checked: {id: String, collection: string, show?: boolean | null }[] = this.getSelected();
    const storage: IItemDB[] = this.storage.getStorage('owner-storage');
    let postData: any[] = [];
    if(checked.length > 0) {
      checked.forEach((item) => {
        postData.push({id: item.id, collection: item.collection});
      })
      console.log('delete start')
      this.itemService.deleteMany(postData, this.storageType).then(() => {
      })
    }
  };

  getBookmarks() {
      const bookmarks = this.bookmarkService.getBokkmarks()
      this.itemService.getBookmarks(bookmarks).then(() => {
        this.board.render('bookmark-storage')
      })
  };
  deleteBookmarks() {
    this.bookmarkService.deleteAll().then(()=> this.board.render('bookmark-storage'))
  };

  exit() {
    this.navigationService.home()
    this.board.render('main-storage')
  }
}
