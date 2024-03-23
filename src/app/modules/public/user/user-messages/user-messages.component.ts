import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.scss']
})
export class UserMessagesComponent implements OnInit {

  display: boolean;
  @Output() closeMessages: EventEmitter<any> = new EventEmitter()
  @Input() show: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.display = true
  }
  
}
