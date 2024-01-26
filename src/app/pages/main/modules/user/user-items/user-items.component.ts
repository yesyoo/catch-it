import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  itemsSell: number[] = [];
  itemsBuy: number[] = []
  forSell: boolean = false
  types: string[] = ["Request", "Donate", "Exchange"]
  btn: string = this.types[1]

  showItemsUserForm: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // this.showModal = 'item-form'
    this.modalService.showModal$.subscribe(data => this.showItemsUserForm = data)
    for(let i = 0; i < 4; i++) { this.itemsSell.push(i) }
    for(let i = 0; i < 3; i++) { this.itemsBuy.push(i) }
  };
  addItem(): void {
    this.showItemsUserForm = true
  }
  preview(): void {
    this.btn = this.types[0]
  }
  next(): void {
    this.btn = this.types[2]

  }
}
