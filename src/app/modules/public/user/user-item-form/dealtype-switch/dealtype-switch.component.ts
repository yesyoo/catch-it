import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Deal } from 'src/app/models/interfaces/deal-type';
import { DealType } from 'src/app/models/interfaces/items';

@Component({
  selector: 'app-dealtype-switch',
  templateUrl: './dealtype-switch.component.html',
  styleUrls: ['./dealtype-switch.component.scss']
})
export class DealtypeSwitchComponent implements OnInit {

  @Output() updateDealType: EventEmitter<DealType> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  changeType(type: Deal): void {
    this.updateDealType.emit(type)
  };

}
