import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Deal } from 'src/app/models/interfaces/deal-type';
import { AuthInterceptor } from 'src/app/services/auth-interceptor/auth-interceptor';

@Component({
  selector: 'app-dealtype-select',
  templateUrl: './dealtype-select.component.html',
  styleUrls: ['./dealtype-select.component.scss'],
  standalone: true,
  imports: [
    SelectButtonModule,
    FormsModule,
    HttpClientModule
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
        label: "Donate",
        type: "donate"
      },
      {
        label: "Request",
        type: "request"
      },
      {
        label: "Exchange",
        type: "exchange"
      }
    ];
    this.selectedDeal= this.deal[0]
  };
  changeDeal(ev: {ev: Event, value: {label: string, type: Deal}}): void {
    this.updateDealType.emit(ev)
  };

}
