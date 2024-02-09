import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    this.itemService.deleteItemById(this.item._id, this.item.collection).subscribe(res => {
      this.board.setOwnerCards(this.board.getOwnerStorage().filter(item => item._id !== this.item._id))
      this.board.updateCardListFor('owner')
      this.toast.emit('deleted')
    })
  };

  hideItem(data: boolean) {
    const update: string = JSON.stringify({show: data})
    this.itemService.updateItem({id: JSON.stringify(this.item._id), collection: this.item.collection, params: update}).subscribe(res => {
      this.toast.emit('hidded')
    })
  };

  updateItem() {};
};
