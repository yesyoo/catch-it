import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() card: any
  @Input() category: any
  @Output() targetCard: any

  constructor() { }

  ngOnInit(): void {
  }

}
