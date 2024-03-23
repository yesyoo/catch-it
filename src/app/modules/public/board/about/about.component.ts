import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  display: boolean;
  @Output() closeAbout: EventEmitter<any> = new EventEmitter()
  @Input() show: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.display = true
  }
  onHide() {
    this.display = false
  }
}
  