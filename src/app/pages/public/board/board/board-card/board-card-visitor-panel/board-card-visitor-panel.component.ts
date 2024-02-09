import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board-card-visitor-panel',
  templateUrl: './board-card-visitor-panel.component.html',
  styleUrls: ['./board-card-visitor-panel.component.scss']
})
export class BoardCardVisitorPanelComponent implements OnInit {

  @Input() item: any

  constructor() { }

  ngOnInit(): void {
  };

  addBookmark() {
    console.log('add bookmark =>')
  };

  sendMessage() {
    console.log('send message =>')
  };

  report() {
    console.log('report =>')

  };

}
