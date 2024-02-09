import { Component, OnInit, Input } from '@angular/core';
import { CardsService } from 'src/app/services/cards/cards.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-user-owner-panel',
  templateUrl: './board-user-owner-panel.component.html',
  styleUrls: ['./board-user-owner-panel.component.scss']
})
export class BoardUserOwnerPanelComponent implements OnInit {

  @Input() user: any
  checkbox: boolean = false;
  checked: boolean = false;
  checkboxList: {id: string, collection: string, params: string}[];
  items: any[];


  constructor(private cardsService: CardsService,
              private board: BoardService,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.cardsService.checkbox$.subscribe(res => this.checkbox = res)
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

  getSelected(): {id: string, collection: string, params: string}[] {
    const arr: {id: string, collection: string, params: string}[] = []
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    checked.forEach(el => {
        arr.push({id: JSON.stringify(el.getAttribute('id')), collection: JSON.stringify(el.getAttribute('data-collection')), params: ''})
    })
    return arr
  };

  setAccessValue(type: boolean) {
    let postData: {id: string, collection: string, params: string}[] = []
    let selectedItems = this.getSelected();
    const storage = this.board.getOwnerStorage()

    selectedItems.forEach(selected => {
      storage.forEach(item => {
        if(selected.id === item._id && item.show !== type) {
          selected.params = `{show: ${type}}`
          postData.push(selected)
        }
      })
    })
    console.log('postData', postData)
  };

  back() {
    this.navigationService.home()
    this.board.updateCardListFor('visitor')
  }
}
