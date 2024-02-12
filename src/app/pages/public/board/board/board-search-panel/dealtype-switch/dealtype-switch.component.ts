import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DealType } from 'src/app/interfaces/items';

@Component({
  selector: 'app-dealtype-switch',
  templateUrl: './dealtype-switch.component.html',
  styleUrls: ['./dealtype-switch.component.scss']
})
export class DealtypeSwitchComponent implements OnInit {

  @Output() type: EventEmitter<DealType> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  changeType(type: DealType) {
    this.type.emit(type)

  }

}
