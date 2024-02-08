import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
  items: any[];

  constructor() { }

  ngOnInit(): void {
    const string = localStorage.getItem('items')
    if(string) {
      this.items = JSON.parse(string).reverse()
    }
    
  }

}
