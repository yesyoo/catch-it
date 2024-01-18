import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DealType } from 'src/app/interfaces/deal-type';

@Component({
  selector: 'app-dealtype-select',
  templateUrl: './dealtype-select.component.html',
  styleUrls: ['./dealtype-select.component.scss'],
  standalone: true,
  imports: [
    SelectButtonModule,
    FormsModule
  ]
})
export class DealtypeSelectComponent implements OnInit {
  deal: any[]
  selectedDeal: any
  @Output() updateDealType: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.deal = [
      {
        name: "Donate",
        value: "donate"
      },
      {
        name: "Request",
        value: "request"
      },
      {
        name: "Exchange",
        value: "exchange"
      }
    ];
    this.selectedDeal= this.deal[0]
  };
  changeDeal(ev: {ev: Event, value: {name: string, value: DealType}}): void {
    this.updateDealType.emit(ev.value.value)
  };

}
