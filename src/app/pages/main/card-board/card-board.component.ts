import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModalType } from '../../../interfaces/modal';

@Component({
  selector: 'app-card-board',
  templateUrl: './card-board.component.html',
  styleUrls: ['./card-board.component.scss']
})
export class CardBoardComponent implements OnInit {
  cards: any[]
  showModal: ModalType
  targetCard: any;

  constructor(private modalService: ModalService,
              private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItemsByParams('collection=personal-clothes').subscribe(data => {
      this.cards = data
      console.log('cards', this.cards)
    })
    this.modalService.showModal$.subscribe(data => this.showModal = data)
  }
  open(id: string){
    console.log('card id:' , id)
  }

}
