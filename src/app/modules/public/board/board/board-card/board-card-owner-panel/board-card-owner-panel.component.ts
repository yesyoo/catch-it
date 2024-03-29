import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IItemDB } from 'src/app/models/interfaces/items';
import { ItemService } from 'src/app/services/item/item.service';


@Component({
  selector: 'app-board-card-owner-panel',
  templateUrl: './board-card-owner-panel.component.html',
  styleUrls: ['./board-card-owner-panel.component.scss']
})
export class BoardCardOwnerPanelComponent implements OnInit {

  @Input() item: IItemDB;
  @Output() close: EventEmitter<string> =  new EventEmitter()

  constructor(private itemService: ItemService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  };

  deleteItem() {
    this.itemService.deleteOne(this.item._id, this.item.collection).then(() => {
      this.messageService.add({severity:'success', life: 1000, summary: 'Deleted'});
      setTimeout(()=> { this.close.emit() }, 1100)
    })
  };

  hideItem(show: boolean) {
    let message: string 
    this.itemService.updateAccessMany([{id: this.item._id, collection: this.item.collection, show: show}]).then(() => {
      show === false ? message = 'Hidden' : message = 'Unhidden';
      this.item.show = show;
      this.messageService.add({severity:'success', life: 1000, summary: message});
      setTimeout(()=> { this.close.emit() }, 1100)
    })
  };

};
