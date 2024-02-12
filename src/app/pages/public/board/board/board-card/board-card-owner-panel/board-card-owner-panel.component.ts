import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IItemDB as IItemDB } from 'src/app/interfaces/items';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-board-card-owner-panel',
  templateUrl: './board-card-owner-panel.component.html',
  styleUrls: ['./board-card-owner-panel.component.scss']
})
export class BoardCardOwnerPanelComponent implements OnInit {

  @Input() item: any
  @Output() toast: EventEmitter<string> =  new EventEmitter()

  constructor(private itemService: ItemService,
              private board: BoardService) { }

  ngOnInit(): void {
  };

  deleteItem() {
    this.itemService.deleteOneByIdAndCollection(this.item._id, this.item.collection).subscribe(res => {
      const cards: IItemDB[] = this.board.getStorage('owner-storage').filter((item: IItemDB) => item._id !== this.item._id);
      this.board.setToStorage(cards, 'owner-storage')

      if(this.board.getCurrentStorageType() === 'owner-storage') {
        this.board.render('owner-storage')
      }
      this.toast.emit('deleted')
    })
  };

  hideItem(show: boolean) {
    const param = {show: show};
    this.itemService.updateShowHideFromArray([{id: this.item._id, collection: this.item.collection, show: show}]).subscribe(res => {
      const cards: IItemDB[] = this.board.getStorage('owner-storage')
      cards.forEach(item => {
        if(item._id === this.item._id) {
          item.show = show
        }
      })
      this.board.setToStorage(cards, 'owner-storage')
      if(this.board.getCurrentStorageType() === 'owner-storage') {
        this.board.render('owner-storage')
      }
    
      this.toast.emit('hidded')
    })
  };

};
