import { Component, Input, OnInit } from '@angular/core';
import { IItemDB } from 'src/app/models/interfaces/items';

@Component({
  selector: 'app-board-preview-card',
  templateUrl: './board-preview-card.component.html',
  styleUrls: ['./board-preview-card.component.scss']
})
export class BoardPreviewCardComponent {

  @Input() item: IItemDB

  constructor() { }

}
