import { Component, OnInit } from '@angular/core';
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

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.cards = [
      {name: "user 1"},
      {name: "user 2"},
      {name: "user 3"},
      {name: "user 4"},
      {name: "user 5"},
      {name: "user 6"},
      {name: "user 7"},
      {name: "user 8"},
      {name: "user 9"}
    ]
    this.modalService.showModal$.subscribe(data => this.showModal = data)
  }

}
