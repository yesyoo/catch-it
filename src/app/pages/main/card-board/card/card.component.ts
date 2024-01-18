import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: any

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  open(data: any): void {
    this.modalService.show('item-card')
  }

}
